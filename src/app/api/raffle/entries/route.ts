import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_token")?.value;
    
    console.log("Token from cookie:", token ? "exists" : "missing");
    
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized - No token" },
        { status: 401 }
      );
    }

    const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    
    const session = await client.query(api.raffle.getAdminSession, {
      token,
    });

    console.log("Session from Convex:", session);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid session" },
        { status: 401 }
      );
    }

    const [entries, stats] = await Promise.all([
      client.query(api.raffle.getAllEntries),
      client.query(api.raffle.getStats),
    ]);

    return NextResponse.json({
      entries,
      stats,
    });
  } catch (error) {
    console.error("Get entries error:", error);
    return NextResponse.json(
      { error: "Failed to fetch entries" },
      { status: 500 }
    );
  }
}
