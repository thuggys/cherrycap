import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createEntry = mutation({
  args: {
    email: v.string(),
    ipAddress: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    profession: v.string(),
    skills: v.string(),
    portfolioUrl: v.optional(v.string()),
    linkedinUrl: v.optional(v.string()),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("raffleEntries")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      throw new Error("Email already exists");
    }

    const ipExists = await ctx.db
      .query("raffleEntries")
      .withIndex("by_ip", (q) => q.eq("ipAddress", args.ipAddress))
      .first();

    if (ipExists) {
      throw new Error("IP already has an entry");
    }

    const entryId = await ctx.db.insert("raffleEntries", {
      email: args.email,
      ipAddress: args.ipAddress,
      firstName: args.firstName,
      lastName: args.lastName,
      profession: args.profession,
      skills: args.skills,
      portfolioUrl: args.portfolioUrl,
      linkedinUrl: args.linkedinUrl,
      bio: args.bio,
    });

    return { id: entryId };
  },
});

export const getAllEntries = query({
  handler: async (ctx) => {
    return await ctx.db.query("raffleEntries").collect();
  },
});

export const checkRateLimit = mutation({
  args: {
    ipAddress: v.string(),
  },
  handler: async (ctx, args) => {
    const MAX_ATTEMPTS = 10;
    const RATE_LIMIT_WINDOW = 3600000;

    const rateLimit = await ctx.db
      .query("rateLimits")
      .withIndex("by_ip", (q) => q.eq("ipAddress", args.ipAddress))
      .first();

    const now = Date.now();
    const oneHourAgo = now - RATE_LIMIT_WINDOW;

    let attempts = 1;
    let lastAttemptTime = now;

    if (rateLimit) {
      const lastAttempt = new Date(rateLimit.lastAttempt).getTime();
      if (lastAttempt > oneHourAgo) {
        attempts = rateLimit.attempts + 1;
        lastAttemptTime = lastAttempt;
      } else {
        attempts = 1;
        lastAttemptTime = now;
      }
    }

    if (attempts > MAX_ATTEMPTS) {
      const resetTime = new Date(lastAttemptTime + RATE_LIMIT_WINDOW);
      throw new Error(`Rate limited. Try again after ${resetTime.toISOString()}`);
    }

    if (rateLimit) {
      await ctx.db.patch(rateLimit._id, {
        attempts: attempts,
        lastAttempt: new Date().toISOString(),
      });
    } else {
      await ctx.db.insert("rateLimits", {
        ipAddress: args.ipAddress,
        attempts: 1,
        lastAttempt: new Date().toISOString(),
      });
    }

    return { allowed: true, remaining: MAX_ATTEMPTS - attempts };
  },
});

export const getStats = query({
  handler: async (ctx) => {
    const totalEntries = await ctx.db.query("raffleEntries").collect();
    const winners = await ctx.db.query("raffleWinners").collect();
    const pendingWinners = winners.filter((w) => w.status === "pending");

    return {
      totalEntries: totalEntries.length,
      totalWinners: winners.length,
      pendingWinners: pendingWinners.length,
    };
  },
});

export const markAsWinner = mutation({
  args: {
    entryId: v.id("raffleEntries"),
  },
  handler: async (ctx, args) => {
    const hostingExpires = new Date();
    hostingExpires.setMonth(hostingExpires.getMonth() + 3);

    const supportExpires = new Date();
    supportExpires.setMonth(supportExpires.getMonth() + 3);

    return await ctx.db.insert("raffleWinners", {
      entryId: args.entryId,
      status: "pending",
      hostingExpiresAt: hostingExpires.toISOString(),
      supportExpiresAt: supportExpires.toISOString(),
    });
  },
});

export const getWinners = query({
  handler: async (ctx) => {
    const winners = await ctx.db.query("raffleWinners").collect();
    const enriched = await Promise.all(
      winners.map(async (w) => {
        const entry = await ctx.db.get(w.entryId);
        return { 
          winnerId: w._id,
          ...entry,
          ...w,
          _id: w._id,
        };
      })
    );
    return enriched;
  },
});

export const updateWinnerStatus = mutation({
  args: {
    winnerId: v.id("raffleWinners"),
    status: v.string(),
    portfolioUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const update: any = { status: args.status };
    if (args.portfolioUrl) {
      update.portfolioUrl = args.portfolioUrl;
    }
    await ctx.db.patch(args.winnerId, update);
  },
});

export const createAdminSession = mutation({
  args: {
    email: v.string(),
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await ctx.db.insert("adminSessions", {
      email: args.email,
      token: args.token,
      expiresAt: expiresAt.toISOString(),
    });
  },
});

export const getAdminSession = query({
  args: {
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("adminSessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (!session) return null;

    const expiresAt = new Date(session.expiresAt);
    if (expiresAt < new Date()) {
      return null;
    }

    return { email: session.email };
  },
});

export const deleteAdminSession = mutation({
  args: {
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("adminSessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (session) {
      await ctx.db.delete(session._id);
    }
  },
});

export const deleteWinner = mutation({
  args: {
    winnerId: v.id("raffleWinners"),
  },
  handler: async (ctx, args) => {
    const winner = await ctx.db.get(args.winnerId);
    if (winner) {
      await ctx.db.delete(winner.entryId);
      await ctx.db.delete(args.winnerId);
    }
  },
});

export const getRandomWinner = query({
  handler: async (ctx) => {
    const winnerIds = (await ctx.db.query("raffleWinners").collect()).map(
      (w) => w.entryId
    );

    const allEntries = await ctx.db.query("raffleEntries").collect();
    const availableEntries = allEntries.filter(
      (e) => !winnerIds.includes(e._id)
    );

    if (availableEntries.length === 0) return null;

    const randomEntry =
      availableEntries[Math.floor(Math.random() * availableEntries.length)];
    return randomEntry;
  },
});
