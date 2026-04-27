"use client";

import { useState, type FormEvent } from "react";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import type { SubscribeReason } from "@/utils/types";

type SubmitStatus = "idle" | "submitting" | "success";

export interface NewsletterSignupProps {
    heading?: string;
    description?: string;
    className?: string;
}

interface ApiErrorResponse {
    ok: false;
    reason: SubscribeReason;
    message: string;
}

interface ApiSuccessResponse {
    ok: true;
}

type ApiResponse = ApiErrorResponse | ApiSuccessResponse;

const isClientValidEmail = (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
};

export default function NewsletterSignup({
    heading = "Subscribe to the newsletter",
    description = "Get new articles, code samples, and project updates delivered straight to your inbox.",
    className,
}: NewsletterSignupProps): React.JSX.Element {
    const [email, setEmail] = useState<string>("");
    const [status, setStatus] = useState<SubmitStatus>("idle");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        if (status === "submitting") {
            return;
        }

        if (!isClientValidEmail(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        setStatus("submitting");

        try {
            const response = await fetch("/api/newsletter/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim() }),
            });

            const payload = (await response.json()) as ApiResponse;

            if (response.ok && payload.ok) {
                setStatus("success");
                toast.success("You're subscribed. Welcome aboard!");
                return;
            }

            const message =
                "message" in payload && payload.message
                    ? payload.message
                    : "Unable to subscribe right now. Please try again.";
            toast.error(message);
            setStatus("idle");
        } catch {
            toast.error("Network error. Please check your connection and try again.");
            setStatus("idle");
        }
    };

    const containerClass = `glass-card p-6 sm:p-8 mb-8 sm:mb-12 ${className ?? ""}`.trim();

    if (status === "success") {
        return (
            <div className={containerClass} aria-live="polite">
                <div className="flex flex-col items-center text-center gap-3">
                    <CheckCircle2 className="h-8 w-8 text-green-400" aria-hidden />
                    <h3 className="text-lg sm:text-xl font-semibold matrix-glow text-green-300">
                        Thanks for subscribing!
                    </h3>
                    <p className="text-green-200/80 text-sm sm:text-base max-w-md">
                        Check your inbox for a confirmation. You can unsubscribe any time.
                    </p>
                </div>
            </div>
        );
    }

    const isSubmitting = status === "submitting";

    return (
        <div className={containerClass}>
            <div className="flex flex-col gap-4 sm:gap-5">
                <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-green-500/30 bg-green-500/10">
                        <Mail className="h-4 w-4 text-green-300" aria-hidden />
                    </span>
                    <h3 className="text-lg sm:text-xl font-semibold matrix-glow text-green-300">
                        {heading}
                    </h3>
                </div>
                <p className="text-green-200/80 text-sm sm:text-base">{description}</p>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-2"
                    noValidate
                >
                    <label htmlFor="newsletter-email" className="sr-only">
                        Email address
                    </label>
                    <Input
                        id="newsletter-email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        disabled={isSubmitting}
                        className="flex-1 border-green-500/30 bg-black/40 text-green-100 placeholder:text-green-200/40 focus-visible:ring-green-500/50"
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-green-600 hover:bg-green-700 text-white border-none w-full sm:w-auto"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                                <span>Subscribing...</span>
                            </>
                        ) : (
                            <span>Subscribe</span>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}
