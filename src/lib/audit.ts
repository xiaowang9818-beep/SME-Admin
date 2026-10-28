import { prisma } from "@/lib/prisma";

export async function writeAudit(params: {
  action: string;
  entity: string;
  entityId?: string;
  userName?: string;
}) {
  try {
    await prisma.auditLog.create({
      data: {
        action: params.action,
        entity: params.entity,
        entityId: params.entityId || null,
        userName: params.userName || null,
      },
    });
  } catch {
    // 忽略写日志失败，不影响主流程
  }
}
