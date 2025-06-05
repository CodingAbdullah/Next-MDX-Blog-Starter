import Image from "next/image";
import Link from "next/link";

// Home Page
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started with this <b>MDX Medium Blog Post Provider</b> starter template.{" "}
          </li>
          <li className="tracking-[-.01em]">
            Kickstart development using <b>Markdown, JSX, and Next.js</b> to create and publish Medium style blog posts.
          </li>
        </ol>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/sample-blog-post-page"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to Sample Blog Post →
        </Link>
        <br />
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/dynamic/first-dynamic-blog-post"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Go to Dynamic Blog Post →
        </Link>
      </footer>
    </div>
  );
}