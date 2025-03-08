import { NextResponse } from "next/server"
import { prisma } from "@/prisma/prisma"

export async function GET() {
  try {
    const total = await prisma.user.count()
    const last24h = await prisma.user.count({
      where: { createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
    })
    const lastWeek = await prisma.user.count({
      where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    })
    const lastMonth = await prisma.user.count({
      where: { createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
    })
    const lastYear = await prisma.user.count({
      where: { createdAt: { gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) } },
    })

    return NextResponse.json({ total, last24h, lastWeek, lastMonth, lastYear })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user stats" }, { status: 500 })
  }
}