"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Tell us a bit more"),
  property: z.string().optional(),
});

type FormValues = z.infer<typeof Schema>;

export default function ContactForm({ property }: { property?: string }) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: { property },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setStatus("sending");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset({ property });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input placeholder="Your name" {...register("name")} />
        {errors.name && (
          <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>
      <div>
        <Input
          placeholder="Email address"
          type="email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Input placeholder="Phone (optional)" {...register("phone")} />
      </div>
      <div>
        <Textarea
          placeholder="I’m interested in this property…"
          rows={5}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-red-600 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* hidden property context */}
      <input type="hidden" value={property || ""} {...register("property")} />

      <Button
        type="submit"
        className="bg-charcoal text-ivory hover:bg-gold hover:text-charcoal transition"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send Inquiry"}
      </Button>

      {status === "success" && (
        <p className="text-green-700 text-sm">
          Thanks! We’ll get back to you shortly.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-700 text-sm">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
