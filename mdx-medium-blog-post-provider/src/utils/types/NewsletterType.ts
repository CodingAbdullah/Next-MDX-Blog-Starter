// Newsletter subscription types

// Reasons a newsletter subscription request can fail.
export type SubscribeReason =
    | "already_subscribed"
    | "invalid_email"
    | "missing_configuration"
    | "server_error";

// Server-internal result returned by the subscribeToNewsletter helper.
export type SubscribeResult =
    | { ok: true }
    | { ok: false; reason: SubscribeReason; message: string };

// JSON body accepted by POST /api/newsletter/subscribe.
export interface SubscribeRequestBody {
    email: string;
}

// JSON shape returned by POST /api/newsletter/subscribe to the client.
export interface SubscribeApiSuccessResponse {
    ok: true;
}

export interface SubscribeApiErrorResponse {
    ok: false;
    reason: SubscribeReason;
    message: string;
}

export type SubscribeApiResponse =
    | SubscribeApiSuccessResponse
    | SubscribeApiErrorResponse;

// UI submission state for the NewsletterSignup component.
export type NewsletterSubmitStatus = "idle" | "submitting" | "success";

// Props accepted by the NewsletterSignup component.
export default interface NewsletterSignupType {
    heading?: string;
    description?: string;
    className?: string;
}
