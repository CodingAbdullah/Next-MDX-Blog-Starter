import type SandboxExampleType from "@/utils/types/SandboxExampleType";

// Default starter snippets loaded when the runtime is first selected
export const JS_DEFAULT = `console.log('Hello, World!');

const greet = (name) => \`Hello, \${name}!\`;
console.log(greet('Developer'));

// Async example
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  await delay(500);
  console.log('Async execution complete');
})();`;

export const TS_DEFAULT = `// TypeScript — fully typed in-browser execution
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

// Quick-load JavaScript examples
export const JS_EXAMPLES: Record<string, SandboxExampleType> = {
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

// Quick-load TypeScript examples
export const TS_EXAMPLES: Record<string, SandboxExampleType> = {
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
