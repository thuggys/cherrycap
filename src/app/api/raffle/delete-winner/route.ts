import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_token")?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    
    const session = await client.query(api.raffle.getAdminSession, {
      token,
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { winnerId } = body;

    if (!winnerId) {
      return NextResponse.json(
        { error: "Winner ID required" },
        { status: 400 }
      );
    }

    await client.mutation(api.raffle.deleteWinner, {
      winnerId,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete winner error:", error);
    return NextResponse.json(
      { error: "Failed to delete winner" },
      { status: 500 }
    );
  }
}
