'use client';

import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Shield } from 'lucide-react';
import { toast } from 'sonner';
import CodeSandboxFeaturesSection from '../../components/CodeSandboxFeaturesSection';
import SandpackEditor from '../../components/SandpackEditor';

type Runtime = 'javascript' | 'typescript';

const JS_DEFAULT = `console.log('Hello, World!');

const greet = (name) => \`Hello, \${name}!\`;
console.log(greet('Developer'));

// Async example
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  await delay(500);
  console.log('Async execution complete');
})();`;

const TS_DEFAULT = `// TypeScript — fully typed in-browser execution
const greet = (name: string): string => \`Hello, \${name}!\`;
console.log(greet('Developer'));

interface User {
  id: number;
  name: string;
  role: 'admin' | 'viewer';
}

const user: User = { id: 1, name: 'Alice', role: 'admin' };
console.log('User:', JSON.stringify(user, null, 2));

function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

console.log(first([10, 20, 30]));
console.log(first(['alpha', 'beta', 'gamma']));`;

const JS_EXAMPLES: Record<string, { name: string; code: string }> = {
  fibonacci: {
    name: 'Fibonacci',
    code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

for (let i = 0; i < 10; i++) {
  console.log(\`fibonacci(\${i}) = \${fibonacci(i)}\`);
}`,
  },
  asyncAwait: {
    name: 'Async / Await',
    code: `const fetchData = () =>
  new Promise(resolve => setTimeout(() => resolve('Data fetched!'), 800));

async function main() {
  console.log('Fetching...');
  const result = await fetchData();
  console.log(result);
  console.log('Done');
}

main();`,
  },
  dataStructures: {
    name: 'Data Structures',
    code: `const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 },
];

const adults = users.filter(u => u.age > 25);
console.log('Over 25:', adults);

const names = users.map(u => u.name);
console.log('Names:', names);

const totalAge = users.reduce((sum, u) => sum + u.age, 0);
console.log('Total age:', totalAge);`,
  },
};

const TS_EXAMPLES: Record<string, { name: string; code: string }> = {
  interfaces: {
    name: 'Types & Interfaces',
    code: `interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

function formatProduct(p: Product): string {
  return \`[\${p.inStock ? 'IN STOCK' : 'OUT OF STOCK'}] \${p.name} — $\${p.price.toFixed(2)}\`;
}

const products: Product[] = [
  { id: 1, name: 'Keyboard', price: 79.99, inStock: true },
  { id: 2, name: 'Monitor', price: 399.00, inStock: false },
];

products.forEach(p => console.log(formatProduct(p)));`,
  },
  generics: {
    name: 'Generics',
    code: `function mapArray<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}

const doubled = mapArray([1, 2, 3, 4], n => n * 2);
console.log('Doubled:', doubled);

const lengths = mapArray(['hello', 'world', 'typescript'], s => s.length);
console.log('Lengths:', lengths);

const upper = mapArray(['alpha', 'beta', 'gamma'], s => s.toUpperCase());
console.log('Upper:', upper);`,
  },
  classes: {
    name: 'Classes & OOP',
    code: `abstract class Shape {
  abstract area(): number;
  toString(): string {
    return \`\${this.constructor.name}: area = \${this.area().toFixed(2)}\`;
  }
}

class Circle extends Shape {
  constructor(private radius: number) { super(); }
  area(): number { return Math.PI * this.radius ** 2; }
}

class Rectangle extends Shape {
  constructor(private w: number, private h: number) { super(); }
  area(): number { return this.w * this.h; }
}

const shapes: Shape[] = [new Circle(5), new Rectangle(4, 6)];
shapes.forEach(s => console.log(s.toString()));`,
  },
};

export default function CodeSandboxPage(): JSX.Element {
  const [runtime, setRuntime] = useState<Runtime>('javascript');
  const [sandpackKey, setSandpackKey] = useState<number>(0);
  const [sandpackCode, setSandpackCode] = useState<string>(JS_DEFAULT);

  const handleSetRuntime = (next: Runtime): void => {
    if (next === runtime) return;
    setRuntime(next);
    setSandpackCode(next === 'typescript' ? TS_DEFAULT : JS_DEFAULT);
    setSandpackKey(k => k + 1);
  };

  const loadExample = (name: string, code: string): void => {
    setSandpackCode(code);
    setSandpackKey(k => k + 1);
    toast.success(`${name} loaded`);
  };

  const examples = runtime === 'typescript' ? TS_EXAMPLES : JS_EXAMPLES;
  const template: 'vanilla' | 'vanilla-ts' = runtime === 'typescript' ? 'vanilla-ts' : 'vanilla';

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow px-3 sm:px-4">
        <div className="max-w-6xl mx-auto py-4 sm:py-6 md:py-8">

          {/* Hero */}
          <section className="py-4 sm:py-6 md:py-8 mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 matrix-glow">
              Code Sandbox
            </h1>
            <p className="text-lg sm:text-xl text-green-200/80 mb-4 code-font">
              Interactive JavaScript & TypeScript execution environment
            </p>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="text-sm text-green-400 font-medium code-font">
                Sandpack In-Browser Execution • No Server Required • Isolated Sandbox
              </span>
            </div>

            {/* Runtime selector */}
            <div className="flex items-center justify-center gap-3">
              <span className="text-sm text-green-200/70 code-font">Runtime:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSetRuntime('javascript')}
                className={`glass-card border-green-500/30 ${runtime === 'javascript' ? 'bg-green-500/20 text-green-100 border-green-400/50' : 'text-green-200'} hover:text-green-100 hover:bg-green-500/10`}
              >
                JavaScript
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSetRuntime('typescript')}
                className={`glass-card border-green-500/30 ${runtime === 'typescript' ? 'bg-green-500/20 text-green-100 border-green-400/50' : 'text-green-200'} hover:text-green-100 hover:bg-green-500/10`}
              >
                TypeScript
              </Button>
            </div>
          </section>

          {/* Quick Examples */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 matrix-glow text-center">Quick Examples</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {Object.entries(examples).map(([key, ex]) => (
                <Button
                  key={key}
                  variant="outline"
                  size="sm"
                  onClick={() => loadExample(ex.name, ex.code)}
                  className="glass-card border-green-500/30 text-green-200 hover:text-green-100 hover:bg-green-500/10"
                >
                  {ex.name}
                </Button>
              ))}
            </div>
          </section>

          {/* Sandpack editor */}
          <div className="mb-12">
            <SandpackEditor
              key={sandpackKey}
              initialCode={sandpackCode}
              template={template}
            />
          </div>

          <CodeSandboxFeaturesSection />
        </div>
      </main>
    </div>
  );
}
