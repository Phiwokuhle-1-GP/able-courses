import { env } from "cloudflare:workers";
import { notFound } from "next/navigation";
import { getChatGPTUser, requireChatGPTUser } from "./chatgpt-auth";

function matchesOwner(email: string | undefined) {
  return !!env.OWNER_EMAIL && !!email && email.toLowerCase() === env.OWNER_EMAIL.trim().toLowerCase();
}

export async function requireOwnerPage() {
  const user = await requireChatGPTUser("/owner");
  if (!matchesOwner(user.email)) notFound();
  return user;
}

export async function isOwnerRequest() {
  const user = await getChatGPTUser();
  return matchesOwner(user?.email);
}
