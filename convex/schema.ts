import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  raffleEntries: defineTable({
    email: v.string(),
    ipAddress: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    profession: v.string(),
    skills: v.string(),
    portfolioUrl: v.optional(v.string()),
    linkedinUrl: v.optional(v.string()),
    bio: v.optional(v.string()),
  })
    .index("by_email", ["email"])
    .index("by_ip", ["ipAddress"]),

  raffleWinners: defineTable({
    entryId: v.id("raffleEntries"),
    status: v.string(),
    portfolioUrl: v.optional(v.string()),
    hostingExpiresAt: v.string(),
    supportExpiresAt: v.string(),
  })
    .index("by_entry", ["entryId"])
    .index("by_status", ["status"]),

  adminSessions: defineTable({
    email: v.string(),
    token: v.string(),
    expiresAt: v.string(),
  })
    .index("by_token", ["token"]),

  rateLimits: defineTable({
    ipAddress: v.string(),
    attempts: v.number(),
    lastAttempt: v.string(),
  })
    .index("by_ip", ["ipAddress"]),
});
