import { getResendClient } from "@/utils/functions/resend_client";
import type { SubscribeResult } from "@/utils/types";

// Server-only function that adds a contact to the configured Resend Audience.
// Returns a typed discriminated union so route handlers and other callers must
// handle every outcome explicitly.
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
