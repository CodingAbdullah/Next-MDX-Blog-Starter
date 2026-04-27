// Newsletter subscription types

export type SubscribeReason =
    | "already_subscribed"
    | "invalid_email"
    | "missing_configuration"
    | "server_error";

export type SubscribeResult =
    | { ok: true }
    | { ok: false; reason: SubscribeReason; message: string };

export interface SubscribeRequestBody {
    email: string;
}
