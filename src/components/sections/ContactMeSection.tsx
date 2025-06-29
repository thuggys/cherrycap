"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Forward, Mail, MailCheck, UserRound } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { sendMail } from "@/lib/mailConfiguration";
const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required and must be at least 2 characters.",
  }),
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email("Please enter a valid email address."),
  message: z.string().min(2, {
    message: "Message is required and must be at least 2 characters.",
  }),
});
function ContactMeSection() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const sent = await sendMail({
      email: data.email,
      name: data.name,
      message: data.message,
    });
    if (sent) {
      setSubmitted(true);
      form.reset();
    }
  }
  return (
    <section className="relative h-fit border-x full-line-bottom px-11">
      <div
        className={cn(
          "absolute top-0 left-0 flex h-full w-8 border-r border-edge",
          "before:absolute before:inset-0 before:-z-1",
          "before:bg-[repeating-linear-gradient(45deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)]",
          "before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56"
        )}
      />
      <div
        className={cn(
          "absolute top-0 right-0 flex h-full w-8 border-l border-edge",
          "before:absolute before:inset-0 before:-z-1",
          "before:bg-[repeating-linear-gradient(45deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)]",
          "before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56"
        )}
      />
      {submitted ? (
        <div className="w-full flex py-4 items-center justify-center">
          <div className="h-fit w-fit flex items-center justify-center gap-4">
            <div
              className="flex size-12 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground  "
              aria-hidden="true"
            >
              <MailCheck size={40} />
            </div>
            <div className="flex flex-col items-start gap-1.5">
              <h2 className="font-medium font-mono text-lg">
                Thanks for reaching out
              </h2>
              <p className="text-muted-foreground text-sm">
                Stay tuned, i will try to reply as soon as possible.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full flex items-center justify-center gap-2">
            <h2 className="relative  text-2xl font-semibold py-4 font-mono">
              Contact Me
            </h2>
          </div>
          <div className="relative flex flex-col pb-4 items-center justify-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" w-full md:w-2/3 space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="peer ps-9 pe-9 font-mono"
                            placeholder="Md Taqui Imam"
                            type="text"
                            {...field}
                          />
                          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                            <UserRound size={16} />
                          </div>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="peer ps-9 pe-9 font-mono"
                            placeholder="mdtaqui.jhar@gmail.com"
                            type="text"
                            {...field}
                          />
                          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                            <Mail size={16} />
                          </div>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Textarea
                            className="peer font-mono"
                            placeholder="Your message ..."
                            {...field}
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting} >
                  {
                    form.formState.isSubmitting ? "Sending":<>
                  Send <Forward />
                    </>
                  }
                </Button>
              </form>
            </Form>
          </div>
        </>
      )}
    </section>
  );
}

export default ContactMeSection;
