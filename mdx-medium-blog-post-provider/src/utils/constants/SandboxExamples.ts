import type SandboxExampleType from "@/utils/types/SandboxExampleType";
import type SandboxHtmlExampleType from "@/utils/types/SandboxHtmlExampleType";

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

// Default starter files loaded when the HTML/CSS runtime is first selected
export const HTML_DEFAULT_FILES: Record<string, string> = {
    '/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Sandbox</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <main>
    <h1>Hello, World!</h1>
    <p>Edit <code>index.html</code> and <code>styles.css</code> to see live changes.</p>
    <button id="counter">Clicked 0 times</button>
  </main>
  <script>
    let count = 0;
    const button = document.getElementById('counter');
    button.addEventListener('click', () => {
      count += 1;
      button.textContent = \`Clicked \${count} times\`;
    });
  </script>
</body>
</html>
`,
    '/styles.css': `body {
  font-family: system-ui, sans-serif;
  background: #0d1117;
  color: #c9d1d9;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
}

main {
  text-align: center;
  padding: 2rem;
}

h1 {
  color: #58a6ff;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1.25rem;
  background: #238636;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background: #2ea043;
}
`,
};

// Quick-load HTML/CSS examples
export const HTML_EXAMPLES: Record<string, SandboxHtmlExampleType> = {
    responsiveCard: {
        name: 'Responsive Card',
        files: {
            '/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Card</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <article class="card">
    <div class="card-badge">New</div>
    <h2>Responsive Card</h2>
    <p>A simple card component built with flexbox and CSS custom properties.</p>
    <button class="card-button">Learn more</button>
  </article>
</body>
</html>
`,
            '/styles.css': `:root {
  --accent: #22c55e;
}

body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0b1220;
  font-family: system-ui, sans-serif;
}

.card {
  position: relative;
  max-width: 320px;
  padding: 1.5rem;
  border-radius: 12px;
  background: #111a2e;
  color: #e2e8f0;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
}

.card-badge {
  position: absolute;
  top: -10px;
  right: 1rem;
  background: var(--accent);
  color: #06280f;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
}

.card-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: transparent;
  color: var(--accent);
  border: 1px solid var(--accent);
  border-radius: 6px;
  cursor: pointer;
}

.card-button:hover {
  background: var(--accent);
  color: #06280f;
}
`,
        },
    },
    flexboxLayout: {
        name: 'Flexbox Layout',
        files: {
            '/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Flexbox</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <div class="row">
    <div class="box">1</div>
    <div class="box">2</div>
    <div class="box">3</div>
    <div class="box">4</div>
  </div>
</body>
</html>
`,
            '/styles.css': `body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0b1220;
}

.row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.box {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #22c55e;
  color: #06280f;
  font-weight: 700;
  font-size: 1.5rem;
  border-radius: 10px;
}
`,
        },
    },
    cssAnimation: {
        name: 'CSS Animation',
        files: {
            '/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Animation</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <div class="pulse"></div>
</body>
</html>
`,
            '/styles.css': `body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0b1220;
}

.pulse {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse 1.6s ease-in-out infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
}
`,
        },
    },
};

// Default starter snippet loaded when the Python runtime is first selected
export const PYTHON_DEFAULT = `print("Hello, World!")

def greet(name):
    return f"Hello, {name}!"

print(greet("Developer"))

# List comprehension example
squares = [n ** 2 for n in range(10)]
print("Squares:", squares)`;

// Quick-load Python examples
export const PYTHON_EXAMPLES: Record<string, SandboxExampleType> = {
    fibonacci: {
        name: 'Fibonacci',
        code: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

for i in range(10):
    print(f"fibonacci({i}) = {fibonacci(i)}")`,
    },
    dataStructures: {
        name: 'Data Structures',
        code: `users = [
    {"id": 1, "name": "Alice", "age": 25},
    {"id": 2, "name": "Bob", "age": 30},
    {"id": 3, "name": "Charlie", "age": 35},
]

adults = [u for u in users if u["age"] > 25]
print("Over 25:", adults)

names = [u["name"] for u in users]
print("Names:", names)

total_age = sum(u["age"] for u in users)
print("Total age:", total_age)`,
    },
    classes: {
        name: 'Classes & OOP',
        code: `from abc import ABC, abstractmethod
import math

class Shape(ABC):
    @abstractmethod
    def area(self):
        ...

    def __str__(self):
        return f"{type(self).__name__}: area = {self.area():.2f}"

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    def area(self):
        return math.pi * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w = w
        self.h = h
    def area(self):
        return self.w * self.h

shapes = [Circle(5), Rectangle(4, 6)]
for shape in shapes:
    print(shape)`,
    },
};

// Default starter snippet loaded when the SQL runtime is first selected
export const SQL_DEFAULT = `CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER
);

INSERT INTO users (id, name, age) VALUES
  (1, 'Alice', 25),
  (2, 'Bob', 30),
  (3, 'Charlie', 35);

SELECT * FROM users WHERE age > 25;`;

// Quick-load SQL examples (run against a fresh in-memory SQLite database each time)
export const SQL_EXAMPLES: Record<string, SandboxExampleType> = {
    joins: {
        name: 'Joins',
        code: `CREATE TABLE authors (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT, author_id INTEGER);

INSERT INTO authors (id, name) VALUES (1, 'Ursula K. Le Guin'), (2, 'Isaac Asimov');
INSERT INTO books (id, title, author_id) VALUES
  (1, 'The Left Hand of Darkness', 1),
  (2, 'Foundation', 2),
  (3, 'I, Robot', 2);

SELECT books.title, authors.name AS author
FROM books
JOIN authors ON authors.id = books.author_id
ORDER BY authors.name;`,
    },
    aggregation: {
        name: 'Aggregation',
        code: `CREATE TABLE orders (id INTEGER PRIMARY KEY, customer TEXT, amount REAL);

INSERT INTO orders (customer, amount) VALUES
  ('Alice', 120.50), ('Bob', 75.00), ('Alice', 40.25), ('Charlie', 200.00), ('Bob', 15.75);

SELECT customer, COUNT(*) AS orders, SUM(amount) AS total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC;`,
    },
    filtering: {
        name: 'Filtering & Sorting',
        code: `CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL, in_stock INTEGER);

INSERT INTO products (name, price, in_stock) VALUES
  ('Keyboard', 79.99, 1), ('Monitor', 399.00, 0), ('Mouse', 25.50, 1), ('Webcam', 59.99, 1);

SELECT name, price
FROM products
WHERE in_stock = 1 AND price < 100
ORDER BY price ASC;`,
    },
};
