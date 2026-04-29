import { Resend } from "resend";

// Server-only Resend client factory.
// Lazy-initialised so missing env vars surface as runtime errors on the API
// route rather than crashing the build.
const getResendClient = (): Resend => {
    const apiKey: string | undefined = process.env.RESEND_API_KEY;

    if (!apiKey || apiKey.trim() === "") {
        throw new Error("RESEND_API_KEY environment variable is not set");
    }

    return new Resend(apiKey);
};

export default getResendClient;
