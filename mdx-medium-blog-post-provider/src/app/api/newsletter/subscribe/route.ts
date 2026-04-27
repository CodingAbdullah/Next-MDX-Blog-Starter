import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { subscribeToNewsletter } from "@/utils/functions";
import type { SubscribeReason } from "@/utils/types";

// Resend's Node SDK relies on Node APIs, so this route runs in the Node
// runtime rather than the Edge runtime used by the chat route.
export const runtime = "nodejs";

const subscribeSchema = z.object({
    email: z.string().trim().email().max(254),
});

const reasonToStatus: Record<SubscribeReason, number> = {
    invalid_email: 400,
    already_subscribed: 409,
    missing_configuration: 500,
    server_error: 500,
};

// Route Handler — adds the submitted email to the configured Resend Audience.
// Called client-side by the NewsletterSignup component.
export async function POST(req: NextRequest): Promise<NextResponse> {
    let body: unknown;

    try {
        body = await req.json();
    } catch {
        return NextResponse.json(
            { ok: false, reason: "invalid_email", message: "Invalid request body." },
            { status: 400 }
        );
    }

    const parsed = subscribeSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            { ok: false, reason: "invalid_email", message: "Please provide a valid email address." },
            { status: 400 }
        );
    }

    const result = await subscribeToNewsletter(parsed.data.email);

    if (result.ok) {
        return NextResponse.json({ ok: true }, { status: 200 });
    }

    return NextResponse.json(
        { ok: false, reason: result.reason, message: result.message },
        { status: reasonToStatus[result.reason] }
    );
}
