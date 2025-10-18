import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

export async function GET() {
  try {
    const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    const winners = await client.query(api.raffle.getWinners);
    return NextResponse.json(winners);
  } catch (error) {
    console.error("Get winners error:", error);
    return NextResponse.json(
      { error: "Failed to fetch winners" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === "draw") {
      const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
      const winner = await client.query(api.raffle.getRandomWinner);
      
      if (!winner) {
        return NextResponse.json(
          { error: "No entries available" },
          { status: 404 }
        );
      }

      await client.mutation(api.raffle.markAsWinner, {
        entryId: winner._id,
      });
      
      return NextResponse.json({ 
        success: true,
        firstName: winner.firstName,
        lastName: winner.lastName,
        email: winner.email
      }, { status: 201 });
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Winner action error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process action" },
      { status: 500 }
    );
  }
}
