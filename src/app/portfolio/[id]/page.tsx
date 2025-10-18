import { getRaffleWinners } from "@/lib/db";
import { PortfolioTemplate } from "@/components/PortfolioTemplate";
import { notFound } from "next/navigation";

export default function PortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);

  const winners = getRaffleWinners();
  const winner = winners.find((w) => w.id?.toString() === resolvedParams.id);

  if (!winner) {
    notFound();
  }

  return <PortfolioTemplate entry={winner} />;
}

import React from "react";
