"use client";

import { useState, type FormEvent } from "react";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import type {
    NewsletterSignupType,
    NewsletterSignupVariant,
    NewsletterSignupVariantClassNames,
    NewsletterSubmitStatus,
    SubscribeApiResponse,
} from "@/utils/types";

const VARIANT_CLASS_NAMES: Record<NewsletterSignupVariant, NewsletterSignupVariantClassNames> = {
    matrix: {
        container: "glass-card p-6 sm:p-8 mb-8 sm:mb-12",
        iconBadge: "border-green-500/30 bg-green-500/10",
        iconBadgeIcon: "text-green-300",
        heading: "matrix-glow text-green-300",
        description: "text-green-200/80",
        input: "border-green-500/30 bg-black/40 text-green-100 placeholder:text-green-200/40 focus-visible:ring-green-500/50",
        button: "bg-green-600 hover:bg-green-700 text-white border-none",
        successIcon: "text-green-400",
        successHeading: "matrix-glow text-green-300",
        successBody: "text-green-200/80",
    },
    neutral: {
        container: "rounded-xl border border-border bg-card p-6 sm:p-8 mb-8 sm:mb-12 shadow-sm",
        iconBadge: "border border-border bg-background",
        iconBadgeIcon: "text-foreground",
        heading: "text-foreground",
        description: "text-muted-foreground font-[family-name:var(--font-geist-mono)]",
        input: "",
        button: "",
        successIcon: "text-foreground",
        successHeading: "text-foreground",
        successBody: "text-muted-foreground font-[family-name:var(--font-geist-mono)]",
    },
};

const isClientValidEmail = (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
};

export default function NewsletterSignup({
    heading = "Subscribe to the newsletter",
    description = "Get new articles, code samples, and project updates delivered straight to your inbox.",
    className,
    variant = "matrix",
}: NewsletterSignupType): React.JSX.Element {
    const [email, setEmail] = useState<string>("");
    const [status, setStatus] = useState<NewsletterSubmitStatus>("idle");
    const styles = VARIANT_CLASS_NAMES[variant];

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

            const payload = (await response.json()) as SubscribeApiResponse;

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

    if (status === "success") {
        return (
            <div className={cn(styles.container, className)} aria-live="polite">
                <div className="flex flex-col items-center text-center gap-3">
                    <CheckCircle2 className={cn("h-8 w-8", styles.successIcon)} aria-hidden />
                    <h3 className={cn("text-lg sm:text-xl font-semibold", styles.successHeading)}>
                        Thanks for subscribing!
                    </h3>
                    <p className={cn("text-sm sm:text-base max-w-md", styles.successBody)}>
                        Check your inbox for a confirmation. You can unsubscribe any time.
                    </p>
                </div>
            </div>
        );
    }

    const isSubmitting = status === "submitting";

    return (
        <div className={cn(styles.container, className)}>
            <div className="flex flex-col gap-4 sm:gap-5">
                <div className="flex items-center gap-3">
                    <span
                        className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-lg",
                            styles.iconBadge
                        )}
                    >
                        <Mail className={cn("h-4 w-4", styles.iconBadgeIcon)} aria-hidden />
                    </span>
                    <h3 className={cn("text-lg sm:text-xl font-semibold", styles.heading)}>
                        {heading}
                    </h3>
                </div>
                <p className={cn("text-sm sm:text-base", styles.description)}>{description}</p>
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
                        className={cn("flex-1", styles.input)}
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={cn("w-full sm:w-auto", styles.button)}
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
