import { NextRequest, NextResponse } from "next/server";
import { incrementViewCount } from "@/utils/functions";

// Route Handler — increments the view count for a given article slug and returns the new count.
// Called client-side by the ViewCounter component on SSG pages.
export async function POST(
    _req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> {
    const { slug } = await params;

    if (!slug || typeof slug !== "string" || slug.trim() === "") {
        return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    const count = await incrementViewCount(slug.trim());

    return NextResponse.json({ count });
}
