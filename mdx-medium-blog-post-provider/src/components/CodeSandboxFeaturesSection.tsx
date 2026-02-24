import { Copy, Play, Download, Shield } from "lucide-react";

export default function CodeSandboxFeaturesSection() {
    return (
        <section className="pb-8 sm:pb-12">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 matrix-glow text-center text-green-300">Sandbox Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="glass-card p-6 text-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                        <Shield className="h-6 w-6 text-green-400" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 matrix-glow text-green-300">Secure Sandbox</h4>
                    <p className="text-sm text-green-200/70 code-font">
                        Runs entirely in an isolated browser iframe — no code reaches the server
                    </p>
                </div>
                <div className="glass-card p-6 text-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                        <Play className="h-6 w-6 text-green-400" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 matrix-glow text-green-300">Instant Execution</h4>
                    <p className="text-sm text-green-200/70 code-font">
                        Sandpack bundles and runs JS/TS directly in the browser with zero cold start
                    </p>
                </div>
                <div className="glass-card p-6 text-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                        <Copy className="h-6 w-6 text-green-400" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 matrix-glow text-green-300">Easy Copy</h4>
                    <p className="text-sm text-green-200/70 code-font">
                        Copy code and download files with one click for sharing
                    </p>
                </div>
                <div className="glass-card p-6 text-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                        <Download className="h-6 w-6 text-green-400" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 matrix-glow text-green-300">JS & TypeScript</h4>
                    <p className="text-sm text-green-200/70 code-font">
                        Full TypeScript compiler support with inline type errors in the editor
                    </p>
                </div>
            </div>
        </section>
    );
}
