import { PortfolioTemplate } from "@/components/PortfolioTemplate";
import { notFound } from "next/navigation";
import React from "react";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

export default async function PortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  
  const winners = await client.query(api.raffle.getWinners);
  const winner = winners.find((w: { _id: string }) => w._id === resolvedParams.id);

  if (!winner || !winner.firstName || !winner.lastName || !winner.profession || !winner.skills || !winner.email) {
    notFound();
  }

  return <PortfolioTemplate entry={{
    firstName: winner.firstName,
    lastName: winner.lastName,
    profession: winner.profession,
    skills: winner.skills,
    email: winner.email,
    bio: winner.bio,
    linkedinUrl: winner.linkedinUrl,
    portfolioUrl: winner.portfolioUrl,
  }} />;
}
