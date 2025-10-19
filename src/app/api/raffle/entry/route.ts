import { NextRequest, NextResponse } from "next/server";

async function callConvexMutation(functionPath: string, args: Record<string, unknown>) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/mutation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path: functionPath, args, format: "json" }),
  });
  
  const result = await response.json();
  
  if (result.status === "error") {
    throw new Error(result.error || "Convex mutation failed");
  }
  
  return result.value;
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  return "unknown";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const ipAddress = getClientIp(request);

    const { email, firstName, lastName, profession, skills, portfolioUrl, linkedinUrl, bio } = body;

    if (!email || !firstName || !lastName || !profession || !skills) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
      console.error("NEXT_PUBLIC_CONVEX_URL is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    try {
      await callConvexMutation("raffle:checkRateLimit", { ipAddress });
    } catch (error) {
      console.error("Rate limit check failed:", error);
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Rate limited" },
        { status: 429 }
      );
    }

    const now = new Date();
    const deadline = new Date(process.env.RAFFLE_DEADLINE || "2025-12-31T23:59:59");
    
    if (now > deadline) {
      return NextResponse.json(
        { error: `Raffle applications have closed. The deadline was ${deadline.toLocaleDateString()}.` },
        { status: 403 }
      );
    }

    try {
      const entry = await callConvexMutation("raffle:createEntry", {
        email,
        ipAddress,
        firstName,
        lastName,
        profession,
        skills,
        portfolioUrl: portfolioUrl || undefined,
        linkedinUrl: linkedinUrl || undefined,
        bio: bio || undefined,
      });

      return NextResponse.json(entry, { status: 201 });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      if (errorMessage.includes("Email already exists")) {
        return NextResponse.json(
          { error: "This email has already entered the raffle" },
          { status: 409 }
        );
      } else if (errorMessage.includes("IP already has an entry")) {
        return NextResponse.json(
          { error: "This device has already entered the raffle. Only one entry per device allowed." },
          { status: 409 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error("Raffle entry error:", error);
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
    console.error("NEXT_PUBLIC_CONVEX_URL:", process.env.NEXT_PUBLIC_CONVEX_URL);
    return NextResponse.json(
      { 
        error: "Failed to create raffle entry",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
