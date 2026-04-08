'use client';

import { Button } from '@/components/ui/button';
import type SocialShareButtonsType from '@/utils/types/SocialShareButtonsType';
import type { SocialPlatform } from '@/utils/types/SocialShareButtonsType';
import { PLATFORM_CONFIG } from '@/utils/constants/SocialShareConstants';

// Client Component — requires window APIs for share URL construction and popup
export default function SocialShareButtons({ articleTitle }: SocialShareButtonsType): React.JSX.Element {
    const handleShare = (platform: SocialPlatform): void => {
        const encodedUrl = encodeURIComponent(window.location.href);
        const encodedTitle = encodeURIComponent(articleTitle);
        const shareUrl = PLATFORM_CONFIG[platform].buildUrl(encodedUrl, encodedTitle);
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
            <span className="text-xs sm:text-sm text-green-400/70">Share:</span>
            {(Object.keys(PLATFORM_CONFIG) as SocialPlatform[]).map((platform) => (
                <Button
                    key={platform}
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare(platform)}
                    className="border-green-500/40 bg-green-900/20 text-green-300 hover:bg-green-800/40 hover:text-green-200 transition-colors text-xs px-3"
                    aria-label={`Share on ${PLATFORM_CONFIG[platform].label}`}
                >
                    {PLATFORM_CONFIG[platform].label}
                </Button>
            ))}
        </div>
    );
}
