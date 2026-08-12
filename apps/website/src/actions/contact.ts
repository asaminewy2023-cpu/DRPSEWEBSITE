"use server";

import { submitContactMessage } from "../lib/cms-data";

export async function submitContact(
  prevState: { success: boolean; error: string },
  formData: FormData,
): Promise<{ success: boolean; error: string }> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !subject || !message) {
    return { success: false, error: "All fields are required." };
  }

  if (!email.includes("@")) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const result = await submitContactMessage({ name, email, subject, message });
  if (!result.success) {
    return { success: false, error: result.error || "Failed to send message. Please try again later." };
  }
  return { success: true, error: "" };
}