// Social Share Buttons types
export type SocialPlatform = 'twitter' | 'linkedin' | 'reddit';

// Social Platform configuration
export interface PlatformConfig {
    label: string;
    buildUrl: (encodedUrl: string, encodedTitle: string) => string;
}

// Social Share Button export
export default interface SocialShareButtonsType {
    articleTitle: string;
}
