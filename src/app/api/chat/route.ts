import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailConfiguration";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  try {
    const mailSent = await sendMail({
      name,
      email,
      message,
    });

    if (mailSent) {
      return NextResponse.json(
        { message: "Email sent successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Failed to send email" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
