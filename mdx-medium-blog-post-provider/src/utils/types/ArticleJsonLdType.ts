// schema.org Person node used for the article author
export interface JsonLdPerson {
    "@type": "Person";
    name: string;
    url?: string;
    image?: string;
    description?: string;
}

// schema.org Organization node used for the article publisher
export interface JsonLdOrganization {
    "@type": "Organization";
    name: string;
    url: string;
}

// schema.org BlogPosting document emitted as JSON-LD for Google rich results
export interface ArticleJsonLd {
    "@context": "https://schema.org";
    "@type": "BlogPosting";
    headline: string;
    description: string;
    url: string;
    mainEntityOfPage: { "@type": "WebPage"; "@id": string };
    image?: string[];
    datePublished?: string;
    dateModified?: string;
    author: JsonLdPerson;
    publisher: JsonLdOrganization;
    keywords?: string;
    inLanguage: string;
}

// Input accepted by the JSON-LD builder, independent of where the article came from
export default interface ArticleJsonLdInputType {
    path: string;
    title: string;
    description: string;
    coverImageURL?: string;
    publishedAt?: string;
    modifiedAt?: string;
    authorName: string;
    authorDescription?: string;
    authorProfileImageURL?: string;
    tags?: string[];
}
