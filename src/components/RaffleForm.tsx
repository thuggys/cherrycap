"use client";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Confetti } from "@/components/ui/confetti";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import confetti from "canvas-confetti";

const raffleSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  profession: z.string().min(2, "Profession required"),
  skills: z.string().min(10, "Please describe your skills"),
  portfolioUrl: z.string().url().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  bio: z.string().max(500, "Bio must be under 500 characters").optional(),
});

type RaffleFormData = z.infer<typeof raffleSchema>;

export function RaffleForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const confettiRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RaffleFormData>({
    resolver: zodResolver(raffleSchema),
  });

  const onSubmit = async (data: RaffleFormData) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/raffle/entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit entry");
      }

      setMessage({
        type: "success",
        text: "You're in the raffle! Good luck! 🎉",
      });

      await confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      reset();
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="John"
            {...register("firstName")}
            className={errors.firstName ? "border-red-500" : ""}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            {...register("lastName")}
            className={errors.lastName ? "border-red-500" : ""}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          {...register("email")}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="profession">What&apos;s your profession/field?</Label>
        <Input
          id="profession"
          placeholder="e.g., Software Engineer, Designer, Marketer"
          {...register("profession")}
          className={errors.profession ? "border-red-500" : ""}
        />
        {errors.profession && (
          <p className="text-red-500 text-xs mt-1">{errors.profession.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="skills">Tell us about your skills</Label>
        <Textarea
          id="skills"
          placeholder="Describe your key skills, experience, and what makes you unique..."
          {...register("skills")}
          rows={4}
          className={errors.skills ? "border-red-500" : ""}
        />
        {errors.skills && (
          <p className="text-red-500 text-xs mt-1">{errors.skills.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="portfolioUrl">Portfolio URL (optional)</Label>
          <Input
            id="portfolioUrl"
            type="url"
            placeholder="https://yourportfolio.com"
            {...register("portfolioUrl")}
            className={errors.portfolioUrl ? "border-red-500" : ""}
          />
          {errors.portfolioUrl && (
            <p className="text-red-500 text-xs mt-1">{errors.portfolioUrl.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="linkedinUrl">LinkedIn URL (optional)</Label>
          <Input
            id="linkedinUrl"
            type="url"
            placeholder="https://linkedin.com/in/yourprofile"
            {...register("linkedinUrl")}
            className={errors.linkedinUrl ? "border-red-500" : ""}
          />
          {errors.linkedinUrl && (
            <p className="text-red-500 text-xs mt-1">{errors.linkedinUrl.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="bio">Short bio (optional)</Label>
        <Textarea
          id="bio"
          placeholder="A brief bio about yourself..."
          {...register("bio")}
          rows={3}
          className={errors.bio ? "border-red-500" : ""}
        />
        {errors.bio && (
          <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>
        )}
      </div>

      {message && (
        <div
          className={`p-3 rounded text-sm ${
            message.type === "success"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
          }`}
        >
          {message.text}
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center">
        By submitting, you agree we&apos;ll use your info only for the raffle and to contact you if you win. 
        We won&apos;t share or sell your data.
      </p>

      <div className="flex justify-center">
        <InteractiveHoverButton type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm">
          {isSubmitting ? "Submitting..." : "Enter the Raffle"}
        </InteractiveHoverButton>
      </div>
    </form>
  );
}
