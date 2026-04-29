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

// Pre-rendered welcome email content sent to a new subscriber.
export interface WelcomeEmailContent {
    subject: string;
    html: string;
    text: string;
}

// UI submission state for the NewsletterSignup component.
export type NewsletterSubmitStatus = "idle" | "submitting" | "success";

// Visual themes supported by the NewsletterSignup component.
//   - "matrix"  : glass-card with green accents, matches ArticleAuthorBio.
//   - "neutral" : white/black/silver shadcn card, matches the home page nav cards.
export type NewsletterSignupVariant = "matrix" | "neutral";

// Per-variant Tailwind class strings consumed by the NewsletterSignup component.
export interface NewsletterSignupVariantClassNames {
    container: string;
    iconBadge: string;
    iconBadgeIcon: string;
    heading: string;
    description: string;
    input: string;
    button: string;
    successIcon: string;
    successHeading: string;
    successBody: string;
}

// Props accepted by the NewsletterSignup component.
export default interface NewsletterSignupType {
    heading?: string;
    description?: string;
    className?: string;
    variant?: NewsletterSignupVariant;
}
