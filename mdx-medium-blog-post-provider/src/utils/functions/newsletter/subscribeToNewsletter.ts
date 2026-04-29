import { Resend } from "resend";
import { getResendClient } from "@/utils/functions/resend_client";
import buildWelcomeEmail from "./welcomeEmailTemplate";
import type { SubscribeResult } from "@/utils/types";

const WELCOME_EMAIL_FROM = "onboarding@resend.dev";

// Sends the welcome email to a newly subscribed address. Failures are logged
// but do not propagate so a transient email problem does not invalidate an
// otherwise-successful subscription.
const sendWelcomeEmail = async (resend: Resend, email: string): Promise<void> => {
    const { subject, html, text } = buildWelcomeEmail(email);

    const { error } = await resend.emails.send({
        from: WELCOME_EMAIL_FROM,
        to: email,
        subject,
        html,
        text,
    });

    if (error !== null) {
        console.error("[newsletter] Resend emails.send returned an error:", {
            name: error.name,
            statusCode: error.statusCode,
            message: error.message,
        });
    }
};

// Server-only function that adds a contact to the configured Resend Audience
// and sends a welcome email. Returns a typed discriminated union so route
// handlers and other callers must handle every outcome explicitly.
const subscribeToNewsletter = async (email: string): Promise<SubscribeResult> => {
    const audienceId: string | undefined = process.env.RESEND_AUDIENCE_ID;

    if (!audienceId || audienceId.trim() === "") {
        return {
            ok: false,
            reason: "missing_configuration",
            message: "Newsletter is not configured on the server.",
        };
    }

    try {
        const resend = getResendClient();
        const { error } = await resend.contacts.create({
            email,
            audienceId,
            unsubscribed: false,
        });

        if (error === null) {
            try {
                await sendWelcomeEmail(resend, email);
            } catch (emailError) {
                console.error("[newsletter] sendWelcomeEmail threw an exception:", emailError);
            }
            return { ok: true };
        }

        console.error("[newsletter] Resend contacts.create returned an error:", {
            name: error.name,
            statusCode: error.statusCode,
            message: error.message,
        });

        // Resend reports duplicates with HTTP 409. Falling back to a message
        // sniff guards against minor SDK changes without leaking SDK details.
        if (
            error.statusCode === 409 ||
            error.message.toLowerCase().includes("already exists")
        ) {
            return {
                ok: false,
                reason: "already_subscribed",
                message: "This email is already subscribed.",
            };
        }

        if (error.name === "validation_error" || error.name === "invalid_parameter") {
            return {
                ok: false,
                reason: "invalid_email",
                message: "Please provide a valid email address.",
            };
        }

        return {
            ok: false,
            reason: "server_error",
            message: "Unable to subscribe at this time. Please try again later.",
        };
    } catch (caught) {
        console.error("[newsletter] subscribeToNewsletter threw an exception:", caught);
        return {
            ok: false,
            reason: "server_error",
            message: "Unable to subscribe at this time. Please try again later.",
        };
    }
};

export default subscribeToNewsletter;
