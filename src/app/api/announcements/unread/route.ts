import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) return NextResponse.json({ count: 0 });

  const seen = await prisma.announcementSeen.findUnique({ where: { userId } });
  const count = await prisma.announcement.count({
    where: seen ? { createdAt: { gt: seen.seenAt } } : undefined,
  });

  return NextResponse.json({ count });
}
