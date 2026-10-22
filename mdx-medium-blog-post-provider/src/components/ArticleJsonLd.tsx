import { buildArticleJsonLd, serializeJsonLd } from "@/utils/functions";
import type { ArticleJsonLdInputType } from "@/utils/types";

// Article JSON-LD custom component
// Emits schema.org BlogPosting structured data for Google rich results; server-rendered, ships no JS
export default function ArticleJsonLd(props: ArticleJsonLdInputType): React.JSX.Element {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildArticleJsonLd(props)) }}
        />
    );
}
