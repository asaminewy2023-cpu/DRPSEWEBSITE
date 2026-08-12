import { cookies } from "next/headers";
import { en } from "./locales/en";
import { am } from "./locales/am";

export type Lang = "en" | "am";
export type Translations = typeof en;

const all: Record<Lang, Translations> = { en, am };

export async function getT(): Promise<Translations> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value as Lang) || "en";
  return all[lang] || en;
}
