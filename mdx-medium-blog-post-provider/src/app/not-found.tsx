import { Button } from "../components/ui/button";
import Link from "next/link";
import type { Metadata } from 'next';

// Generate metadata for the Not Found page
export const metadata: Metadata = {
  title: 'Page Not Found | Create Next MDX Blog App',
  description: 'The page you are looking for could not be found',
  robots: 'noindex, nofollow'
};

// Not Found page
export default function NotFoundPage() {
  return (
    <div className="bg-black min-h-screen flex flex-col">      
        <div className="flex-grow flex items-center justify-center px-4 hero-section">
            <div className="glass-card p-8 md:p-12 max-w-2xl w-full animate-fade-in text-center">          
                <h1 className="text-4xl md:text-5xl font-bold mb-6 matrix-glow leading-tight text-green-300">
                    404 - Page Not Found
                </h1>    
                <div style={{ paddingBottom: '2.5rem' }}>
                    <p className="text-xl text-green-200/80 mb-4">
                        The page you are looking for does not exist.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Link href="/">
                        <Button className="bg-green-500 hover:bg-green-600 text-white w-full md:w-auto">
                            Return to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
    );
};