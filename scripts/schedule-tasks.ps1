# Registers Windows Scheduled Tasks for the Sevp platform (monitor + backup + dev).
# Usage (run as the user that will execute the tasks):
#   powershell -ExecutionPolicy Bypass -File scripts/schedule-tasks.ps1
#   powershell -ExecutionPolicy Bypass -File scripts/schedule-tasks.ps1 -Remove
#
# Registers:
#   - Sevp-Monitor : runs scripts/monitor.sh every 5 minutes.
#   - Sevp-Backup  : runs scripts/backup.sh nightly at 02:00.
#   - Sevp-Start   : starts the dev servers (pnpm run dev) at logon.
#
# Env overrides:
#   $env:SEVP_ROOT   project root (defaults to the parent of this script).
#   $env:SEVP_USER   user to run tasks as (defaults to the current user).
#   $env:SEVP_PASS   password for that user (omit for interactive / SYSTEM).

param(
  [switch]$Remove
)

$ErrorActionPreference = "Stop"

$root = if ($env:SEVP_ROOT) { $env:SEVP_ROOT } else { Split-Path -Parent $PSScriptRoot }
# Git Bash needs a POSIX-style path for script arguments.
$rootPosix = $root -replace "\\", "/" -replace "^([A-Za-z]):", "/$1"

$bash = (Get-Command bash -ErrorAction SilentlyContinue).Source
if (-not $bash) {
  Write-Error "bash not found on PATH (Git Bash required)."
  exit 1
}

$user = if ($env:SEVP_USER) { $env:SEVP_USER } else { "$env:USERDOMAIN\$env:USERNAME" }
$pass = if ($env:SEVP_PASS) { $env:SEVP_PASS } else { $null }

$monitorArgs = "$rootPosix/scripts/monitor.sh"
$backupArgs  = "$rootPosix/scripts/backup.sh"
$startArgs   = "/c `"cd /d `"$root`" && pnpm run dev`""

# Helper: ensure the ScheduledTasks module is available.
if (-not (Get-Module -ListAvailable -Name ScheduledTasks)) {
  Write-Error "ScheduledTasks module not available. Use Windows 10/11 or Server with Task Scheduler."
  exit 1
}
Import-Module ScheduledTasks

function New-SevpTask {
  param(
    [string]$Name,
    [string]$Execute,
    [string]$Argument,
    [string]$WorkingDir,
    [scriptblock]$TriggerBlock,
    [string]$RunLevel = "Limited"
  )

  $action = New-ScheduledTaskAction -Execute $Execute -Argument $Argument -WorkingDirectory $WorkingDir
  $settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -MultipleInstances IgnoreNew
  $trigger = & $TriggerBlock
  $principal = New-ScheduledTaskPrincipal -UserId $user -RunLevel $RunLevel
  $passArg = @{}
  if ($pass) { $passArg["Password"] = $pass }

  Register-ScheduledTask -TaskName "Sevp-$Name" `
    -Action $action `
    -Trigger $trigger `
    -Settings $settings `
    -Principal $principal `
    -Force @passArg | Out-Null
  Write-Host "[ok] Sevp-$Name registered"
}

if ($Remove) {
  foreach ($name in @("Sevp-Monitor", "Sevp-Backup", "Sevp-Start")) {
    Unregister-ScheduledTask -TaskName $name -Confirm:$false -ErrorAction SilentlyContinue
    Write-Host "[ok] removed $name"
  }
  exit 0
}

Write-Host "Registering Sevp scheduled tasks"
Write-Host "  root: $root"
Write-Host "  user: $user"
Write-Host "  bash: $bash"

# Monitor every 5 minutes, at lowest privilege (curl + log writes only).
New-SevpTask -Name "Monitor" `
  -Execute $bash -Argument $monitorArgs -WorkingDir $root `
  -TriggerBlock { New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Minutes 5) -RepetitionDuration ([TimeSpan]::MaxValue) }

# Backup nightly at 02:00.
New-SevpTask -Name "Backup" `
  -Execute $bash -Argument $backupArgs -WorkingDir $root `
  -TriggerBlock { New-ScheduledTaskTrigger -Daily -At 2:00AM }

# Dev servers at logon.
New-SevpTask -Name "Start" `
  -Execute "cmd.exe" -Argument $startArgs -WorkingDir $root `
  -TriggerBlock { New-ScheduledTaskTrigger -AtLogOn }

Write-Host ""
Write-Host "Verify with: Get-ScheduledTask -TaskName Sevp-*"
Write-Host "Run monitor once now: & $bash $monitorArgs"
