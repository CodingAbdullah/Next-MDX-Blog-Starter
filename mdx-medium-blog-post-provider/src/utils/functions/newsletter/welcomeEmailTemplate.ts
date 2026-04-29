import type { WelcomeEmailContent } from "@/utils/types";

const escapeHtml = (value: string): string =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

// Builds the welcome email sent to a new newsletter subscriber.
const buildWelcomeEmail = (email: string): WelcomeEmailContent => {
    const subject = "MDX-Next.js-Starter-Kit Subscription";
    const safeEmail = escapeHtml(email);

    const text = [
        `Hello ${email},`,
        "",
        "Thanks for subscribing to this service via email. We are notifying you via email to let you know that we have received your subscription request on our end.",
        "",
        "Thank you once again.",
        "",
        "Note: This email was sent using the Resend email service.",
        "",
        "Regards,",
        "The Dev Team",
    ].join("\n");

    const html = `<!DOCTYPE html>
<html lang="en">
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #111; max-width: 560px; margin: 0 auto; padding: 24px;">
        <p>Hello ${safeEmail},</p>
        <p>Thanks for subscribing to this service via email. We are notifying you via email to let you know that we have received your subscription request on our end.</p>
        <p>Thank you once again.</p>
        <p style="color: #555; font-size: 14px;"><em>Note: This email was sent using the Resend email service.</em></p>
        <p style="margin-top: 24px;">Regards,<br />The Dev Team</p>
    </body>
</html>`;

    return { subject, html, text };
};

export default buildWelcomeEmail;
