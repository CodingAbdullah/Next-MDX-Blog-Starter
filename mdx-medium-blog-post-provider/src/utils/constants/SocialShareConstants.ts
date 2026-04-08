import type { PlatformConfig, SocialPlatform } from "@/utils/types/SocialShareButtonsType";

// Social share platform configuration
export const PLATFORM_CONFIG: Record<SocialPlatform, PlatformConfig> = {
    twitter: {
        label: 'X',
        buildUrl: (encodedUrl, encodedTitle) =>
            `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    linkedin: {
        label: 'LinkedIn',
        buildUrl: (encodedUrl) =>
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    reddit: {
        label: 'Reddit',
        buildUrl: (encodedUrl, encodedTitle) =>
            `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    },
};
