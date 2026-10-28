"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createAnnouncement(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const content = String(formData.get("content") || "").trim();
  if (!title || !content) return;

  await prisma.announcement.create({
    data: { title, content },
  });

  redirect("/announcements");
}
