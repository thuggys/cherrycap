import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { sendWinnerNotification } from "@/lib/raffle";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { winnerId } = body;

    if (!winnerId) {
      return NextResponse.json(
        { error: "Winner ID required" },
        { status: 400 }
      );
    }

    const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    const winners = await client.query(api.raffle.getWinners);
    const winner = winners.find((w: { _id: string }) => w._id === winnerId);

    if (!winner) {
      return NextResponse.json(
        { error: "Winner not found" },
        { status: 404 }
      );
    }

    const result = await sendWinnerNotification(winner);

    if (result.success) {
      await client.mutation(api.raffle.updateWinnerStatus, {
        winnerId,
        status: "contacted",
      });
      return NextResponse.json({ success: true, message: "Notification sent" });
    } else {
      return NextResponse.json(
        { error: "Failed to send notification" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Notify winner error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
