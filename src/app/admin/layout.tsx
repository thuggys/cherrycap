"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-x full-line-bottom relative">
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/" className="font-mono text-lg font-bold hover:opacity-75">
            CherryCapitalWeb Admin
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="font-mono text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
              ← Back to Site
            </Link>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="font-mono text-xs"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
