# Quick setup on Windows (PowerShell)
if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
  Write-Error "pnpm is required. Install it first: npm i -g pnpm"
  exit 1
}

Write-Host "Installing workspace dependencies..."
pnpm install

Write-Host "Regenerating Payload types into packages/shared..."
pnpm types:cms

Write-Host "Applying Payload migrations..."
pnpm migrate:cms

Write-Host "Done. Run: pnpm dev"
Write-Host "  CMS:     http://localhost:3000/admin"
Write-Host "  Website: http://localhost:3001"