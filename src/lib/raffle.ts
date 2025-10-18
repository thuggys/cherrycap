import nodemailer from "nodemailer";
import { RaffleWinner } from "./db";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendWinnerNotification(winner: RaffleWinner) {
  try {
    const portfolioUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/portfolio/${winner.id}`;

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: winner.email,
      subject: "🎉 You Won a Free Portfolio Website!",
      html: `
        <h1>Congratulations, ${winner.firstName}!</h1>
        <p>You've been selected as a winner in our raffle and have won a FREE custom portfolio website!</p>
        
        <h2>What You Won:</h2>
        <ul>
          <li>Custom-built portfolio website showcasing your ${winner.profession} skills</li>
          <li>Professional design optimized for your career</li>
          <li>Mobile-responsive and lightning-fast performance</li>
          <li>SEO optimization to help you rank in searches</li>
          <li><strong>3 months of free hosting and support</strong></li>
        </ul>

        <h2>Your Benefits Include:</h2>
        <ul>
          <li>Full design and development of your portfolio</li>
          <li>3 months of hosting (valued at ~$50/month)</li>
          <li>3 months of priority technical support</li>
          <li>Content updates and modifications</li>
          <li>SEO optimization for job search visibility</li>
        </ul>

        <h2>Your Benefits Include:</h2>
        <ul>
          <li>Full design and development of your portfolio</li>
          <li>Professional domain registration (your-name.com)</li>
          <li>3 months of hosting (valued at ~$50/month)</li>
          <li>3 months of priority technical support</li>
          <li>Content updates and modifications</li>
          <li>SEO optimization for job search visibility</li>
        </ul>

        <h2>Support Timeline:</h2>
        <p>Your hosting and support package is valid for <strong>3 months from project launch</strong>. After that, hosting continues at a discounted rate if you choose.</p>

        <h2>Next Steps:</h2>
        <p>We'd love to build an amazing portfolio for you! Reply to this email or contact us at:</p>
        <p><strong>Email:</strong> scott@cherrycapitalweb.com</p>
        <p><strong>Phone:</strong> (616) 260-9863</strong></p>

        <p>In the meantime, here's a preview of your portfolio: ${portfolioUrl}</p>

        <p>Looking forward to working with you!</p>
        <p>- Scott & the CherryCapitalWeb Team</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send winner notification:", error);
    return { success: false, error };
  }
}

export function generatePortfolioUrl(winnerId: number): string {
  return `${process.env.NEXT_PUBLIC_BASE_URL}/portfolio/${winnerId}`;
}

export function getWinnerStats(winners: RaffleWinner[]) {
  return {
    total: winners.length,
    pending: winners.filter((w) => w.status === "pending").length,
    completed: winners.filter((w) => w.status === "completed").length,
    inProgress: winners.filter((w) => w.status === "in_progress").length,
  };
}
