"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Entry {
  _id: string;
  _creationTime: number;
  email: string;
  firstName: string;
  lastName: string;
  profession: string;
  skills: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  bio?: string;
  ipAddress: string;
}

interface Winner extends Entry {
  winnerId: string;
  status: string;
  hostingExpiresAt: string;
  supportExpiresAt: string;
}

export default function RaffleAdminPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [stats, setStats] = useState({ totalEntries: 0, totalWinners: 0, pendingWinners: 0 });
  const [loading, setLoading] = useState(true);
  const [drawLoading, setDrawLoading] = useState(false);
  const [notifyLoading, setNotifyLoading] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"winners" | "entries">("winners");

  const fetchData = async () => {
    try {
      const response = await fetch("/api/raffle/entries", {
        credentials: "include",
      });
      
      if (!response.ok) {
        console.error("Failed to fetch entries:", response.status);
        throw new Error("Unauthorized");
      }
      
      const data = await response.json();
      setEntries(data.entries || []);
      setStats(data.stats || { totalEntries: 0, totalWinners: 0, pendingWinners: 0 });

      const winnersResponse = await fetch("/api/raffle/winner");
      const winnersData = await winnersResponse.json();
      setWinners(Array.isArray(winnersData) ? winnersData : []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setEntries([]);
      setWinners([]);
      setStats({ totalEntries: 0, totalWinners: 0, pendingWinners: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDrawWinner = async () => {
    setDrawLoading(true);
    try {
      const response = await fetch("/api/raffle/winner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "draw" }),
      });

      if (response.ok) {
        alert(`🎉 Winner drawn successfully!`);
        fetchData();
      } else {
        const error = await response.json();
        alert(error.error || "Error drawing winner - no entries available");
      }
    } catch (error) {
      console.error("Error drawing winner:", error);
      alert("Failed to draw winner");
    } finally {
      setDrawLoading(false);
    }
  };

  const handleNotifyWinner = async (winnerId: string) => {
    setNotifyLoading(winnerId);
    try {
      const response = await fetch("/api/raffle/notify-winner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ winnerId }),
      });

      if (response.ok) {
        alert("Winner notification sent!");
        fetchData();
      } else {
        alert("Error sending notification");
      }
    } finally {
      setNotifyLoading(null);
    }
  };

  const handleDeleteWinner = async (winnerId: string) => {
    if (!confirm("Are you sure you want to delete this winner? This cannot be undone.")) {
      return;
    }

    setDeleteLoading(winnerId);
    try {
      const response = await fetch("/api/raffle/delete-winner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ winnerId }),
      });

      if (response.ok) {
        alert("Winner deleted!");
        fetchData();
      } else {
        alert("Error deleting winner");
      }
    } catch (error) {
      console.error("Error deleting winner:", error);
      alert("Failed to delete winner");
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) return <div className="border-x full-line-bottom p-8 text-center font-mono">Loading...</div>;

  return (
    <div className="px-4 border-x full-line-bottom relative">
      <div className="py-8">
        <h2 className="pl-0 text-3xl font-semibold relative full-line-bottom">
          Raffle Dashboard
        </h2>

      </div>

      <div className="py-4 font-mono text-sm">
        <div className="grid grid-cols-4 gap-0 mb-8 border-x full-line-bottom">
          <div className="px-4 py-6 border-r full-line-bottom">
            <p className="text-slate-600 dark:text-slate-400 text-xs mb-2">Total Entries</p>
            <p className="text-3xl font-bold">{stats.totalEntries}</p>
          </div>
          <div className="px-4 py-6 border-r full-line-bottom">
            <p className="text-slate-600 dark:text-slate-400 text-xs mb-2">Total Winners</p>
            <p className="text-3xl font-bold">{stats.totalWinners}</p>
          </div>
          <div className="px-4 py-6 border-r full-line-bottom">
            <p className="text-slate-600 dark:text-slate-400 text-xs mb-2">Pending</p>
            <p className="text-3xl font-bold">{stats.pendingWinners}</p>
          </div>
          <div className="px-4 py-6 full-line-bottom">
            <p className="text-slate-600 dark:text-slate-400 text-xs mb-2">Available</p>
            <p className="text-3xl font-bold">{stats.totalEntries - stats.totalWinners}</p>
          </div>
        </div>

        <div className="px-4 py-4 border-x full-line-bottom flex gap-3">
          <Button
            onClick={handleDrawWinner}
            disabled={drawLoading || stats.totalWinners >= 1}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-sm"
          >
            {drawLoading ? "Drawing..." : stats.totalWinners >= 1 ? "✓ Winner Drawn" : "🎲 Draw Winner"}
          </Button>
          <Button
            onClick={fetchData}
            variant="outline"
            className="font-mono text-sm"
          >
            Refresh
          </Button>
        </div>

        <div className="flex border-b border-x full-line-bottom">
          <button
            onClick={() => setActiveTab("winners")}
            className={`flex-1 px-4 py-2 font-mono text-sm text-left border-r full-line-bottom ${
              activeTab === "winners"
                ? "bg-muted"
                : ""
            }`}
          >
            Winners ({winners.length})
          </button>
          <button
            onClick={() => setActiveTab("entries")}
            className={`flex-1 px-4 py-2 font-mono text-sm text-left ${
              activeTab === "entries"
                ? "bg-muted"
                : ""
            }`}
          >
            All Entries ({entries.length})
          </button>
        </div>

        {/* Winners Table */}
        {activeTab === "winners" && (
          <div className="border-x full-line-bottom overflow-x-auto">
            {winners.length > 0 ? (
              <table className="w-full text-sm font-mono">
                <thead className="border-b bg-muted">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs border-r full-line-bottom">Name</th>
                    <th className="px-4 py-2 text-left text-xs border-r full-line-bottom">Email</th>
                    <th className="px-4 py-2 text-left text-xs border-r full-line-bottom">Profession</th>
                    <th className="px-4 py-2 text-left text-xs border-r full-line-bottom">Status</th>
                    <th className="px-4 py-2 text-left text-xs border-r full-line-bottom">Support Expires</th>
                    <th className="px-4 py-2 text-left text-xs">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {winners.map((winner) => (
                    <tr key={winner._id} className="border-b hover:bg-muted/50">
                      <td className="px-4 py-2 text-xs border-r">
                        {winner.firstName} {winner.lastName}
                      </td>
                      <td className="px-4 py-2 text-xs border-r">{winner.email}</td>
                      <td className="px-4 py-2 text-xs border-r">{winner.profession}</td>
                      <td className="px-4 py-2 text-xs border-r">
                        <span className={`text-xs ${
                          winner.status === "pending"
                            ? "text-yellow-600 dark:text-yellow-400"
                            : winner.status === "completed"
                            ? "text-green-600 dark:text-green-400"
                            : "text-blue-600 dark:text-blue-400"
                        }`}>
                          {winner.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-xs border-r">
                        {winner.supportExpiresAt 
                          ? new Date(winner.supportExpiresAt).toLocaleDateString()
                          : 'N/A'}
                      </td>
                      <td className="px-4 py-2 flex gap-1">
                        <Button
                          onClick={() => handleNotifyWinner(winner._id)}
                          disabled={notifyLoading === winner._id}
                          size="sm"
                          variant="outline"
                          className="text-xs"
                        >
                          {notifyLoading === winner._id ? "Sending..." : "Email"}
                        </Button>
                        <Link href={`/portfolio/${winner._id}`} target="_blank">
                          <Button size="sm" variant="outline" className="text-xs">
                            View
                          </Button>
                        </Link>
                        <Button
                          onClick={() => handleDeleteWinner(winner._id)}
                          disabled={deleteLoading === winner._id}
                          size="sm"
                          variant="destructive"
                          className="text-xs"
                        >
                          {deleteLoading === winner._id ? "Deleting..." : "Delete"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center text-slate-600 dark:text-slate-400 font-mono text-sm">
                No winners yet. Draw your first winner!
              </div>
            )}
          </div>
        )}

        {/* Entries Table */}
        {activeTab === "entries" && (
          <div className="border-x full-line-bottom overflow-x-auto">
            <table className="w-full text-sm font-mono">
              <thead className="border-b bg-muted">
                <tr>
                  <th className="px-4 py-2 text-left text-xs border-r full-line-bottom">Name</th>
                  <th className="px-4 py-2 text-left text-xs border-r full-line-bottom">Email</th>
                  <th className="px-4 py-2 text-left text-xs border-r full-line-bottom">Profession</th>
                  <th className="px-4 py-2 text-left text-xs border-r full-line-bottom">LinkedIn</th>
                  <th className="px-4 py-2 text-left text-xs">Entered</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry._id} className="border-b hover:bg-muted/50">
                    <td className="px-4 py-2 text-xs border-r">
                      {entry.firstName} {entry.lastName}
                    </td>
                    <td className="px-4 py-2 text-xs border-r">
                      <a href={`mailto:${entry.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                        {entry.email}
                      </a>
                    </td>
                    <td className="px-4 py-2 text-xs border-r">{entry.profession}</td>
                    <td className="px-4 py-2 text-xs border-r">
                      {entry.linkedinUrl ? (
                        <a href={entry.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                          View →
                        </a>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-xs text-slate-600 dark:text-slate-400">
                      {entry._creationTime ? new Date(entry._creationTime).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
