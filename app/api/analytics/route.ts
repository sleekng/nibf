import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [
      totalAttendees,
      totalExhibitors,
      totalDonations,
      successfulDonations,
      pendingDonations,
      failedDonations,
      totalDonationAmount,
      recentDonations
    ] = await Promise.all([
      prisma.registration.count(),
      prisma.bookStand.count(),
      prisma.donationRecord.count(),
      prisma.donationRecord.count({
        where: { status: 'successful' }
      }),
      prisma.donationRecord.count({
        where: { status: 'pending' }
      }),
      prisma.donationRecord.count({
        where: { status: 'failed' }
      }),
      prisma.donationRecord.aggregate({
        where: { status: 'successful' },
        _sum: { amount: true }
      }),
      prisma.donationRecord.findMany({
        take: 5,
        orderBy: { created_at: 'desc' },
        include: {
          donor: true,
          items: {
            include: {
              book: true
            }
          }
        }
      })
    ]);

    return NextResponse.json({
      totalAttendees,
      totalExhibitors,
      donations: {
        total: totalDonations,
        successful: successfulDonations,
        pending: pendingDonations,
        failed: failedDonations,
        totalAmount: totalDonationAmount._sum.amount || 0,
        recent: recentDonations
      }
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}