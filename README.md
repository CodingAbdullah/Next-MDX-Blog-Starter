# 🌟 Next-MDX-Blog-Starter

## 📖 Introduction
This project is inspired by the elegant design and functionality of **Loveable**. It leverages the **Claude Sonnet 4** model for development, ensuring a robust and efficient coding experience. 

The goal of this repository is to serve as a comprehensive starter kit for working with static and dynamic content using MDX, React, and Next.js (more specifically the App Router).

## ⚙️ Project Setup

### Prerequisites
- **Node.js**: Ensure you have Node.js installed (version 15.x or later).
- **NPM**: Node Package Manager comes with Node.js.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/CodingAbdullah/Next-MDX-Blog-Starter.git
   cd mdx-medium-blog-post-provider
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🛠️ Tools
### AI Tools
- **Cursor**: An AI-powered coding assistant that enhances productivity and code quality.
- **Loveable**: A design inspiration that emphasizes user-friendly interfaces and experiences.
- **Claude Sonnet 4**: A model that aids in development, providing intelligent suggestions and optimizations.

### Common NPM Libraries
- **MDX**: A markdown format that allows you to write JSX in your markdown files, enabling rich content.
- **Supabase**: An open-source Firebase alternative that provides a backend as a service, including database and authentication.
- **Shadcn/ui**: A collection of UI components designed for building modern web applications.
- **Lucide-React**: A set of customizable icons for React applications, enhancing visual appeal.
- **gray-matter**: A library for parsing front matter from markdown files, useful for managing metadata.
- **React**: A JavaScript library for building user interfaces, allowing for the creation of reusable UI components.
- **React-Syntax-Highlighter**: A library for syntax highlighting in React applications, making code snippets more readable.
- **tsx**: Run TypeScript code without worrying about configuration! Run the `article-manager.ts` for manually working with published articles.

## 🌐 Static/Dynamic Rendering with MDX
This project utilizes MDX for both static and dynamic rendering of blog posts. The two MDX files included in the project serve as examples of how to structure your content.

- **Static MDX**: Pre-rendered at build time (<b>route</b>: `/app/sample-blog-post-page`, <b>article content</b>: `/markdown/ArticleContent.mdx`).
- **Dynamic MDX**: Rendered on the server at request time (<b>route</b>: `/app/dynamic`, <b>article content</b>: `/markdown/DynamicArticleContent.mdx`).

## 🖼️ MDX Components File
The `mdx-components.tsx` file located in the root, integrates styling for built-in HTML elements as well as optimizing built-in elements such as `<a>` and `<img>` using the built-in components provided by Next.js (`<Image>` and `<Link>`). 

For more details on what this file is and how it is utilized in a Next.js application, you can refer to the official docs here.

## 🧩 Custom React Components
Custom React components are created for enhanced functionality when working with MDX. The following are located in the `customMDXComponents` directory inside the `components` directory of the project.

### Syntax Highlighting
The project includes a custom `CodeBlock` component for syntax highlighting code blocks using the `react-syntax-highlighter` package. 

Default theme is set to the `vscDarkPlus` theme. Feel free to modify the theme and even add your own syntax highlighting library if you so choose.

You can read more about the library used in this project here.

### GitHub Gists
For safety and ease of use, GitHub Gists can be integrated into MDX files to manage code snippets with its own custom component. Feel free to modify it if you so choose.


## 🗄️ Supabase Database Setup
The project uses Supabase for database management. The `SupabaseClient` module is configured to interact with your Supabase instance. The instance is located in the `functions` directory inside the main `utils` directory in the project.

### Environment Variables
Create a `.env` file in the root directory and add your Supabase secrets:

``
SUPABASE_URL=your_supabase_url
``

``
SUPABASE_ANON_KEY=your_supabase_anon_key
``

## 🐳 Docker
This application can be containerized using Docker. 

To build an image, utilize the Dockerfile located in the root location of the repository and run the following commands to run this web application in a standalone container:

``
docker build -t mdx-medium-blog .
``

``
docker run -p 3000:3000 mdx-medium-blog
``

## 🔄 CRUD Operations and Supabase Actions
All CRUD operations are implemented in the `/utils/functions/crud` folder. This includes functions for creating, reading, updating, and deleting articles in the Supabase database.

The `article-manager.ts` file utilizes these CRUD functions to successfully perform the desired actions.

## 📜 Scripts for Setting Up Project
The `/scripts` folder contains various scripts to help set up the project and database.

### Setup Scripts
- **SQL Scripts**: DDL and DML statements for initializing and populating the database.
- **Powershell Script**: Script for setting up project on Windows.
- **Bash Shell Script**: Script for setting up project on Linux, Mac, etc.

This project directly integrates Supabase in the front-end using React Server components which removes the need for custom back-end APIs.

## 🛠️ Compiling TypeScript
The `article-manager.ts` file (located in `/scripts/action-script`) utilizes the `tsx` package to perform the different actions (CRUD operations) on articles stored locally.

The following codeblock highlights the different command prompts that can be used with this file:

    - Insert an Article into Supabase
    npx tsx article-manager.ts insert article-slug

    - Delete an Article into Supabase
    npx tsx article-manager.ts delete article-slug

    - Update an Article into Supabase
    npx tsx article-manager.ts update article-slug new-article-file

    - Fetch a Single Article into Supabase
    npx tsx article-manager.ts fetch article-slug

    - Fetch all Articles into Supabase
    npx tsx article-manager.ts fetchAll

The article slug is the name of the markdown file located in the `markdown` directory minus the extension, `.mdx`.

The update statement takes in an additional parameter which is also the same thing (file name minus the `.mdx` extension located in the `markdown` directory).

## 📊 Analytics
Integrated in this setup project is Vercel Analytics (`@vercel/analytics`) to track user interactions and performance metrics of your personal blog.

## ⚙️ Next.js Configuration
The `next.config.ts` file is set up for working with AWS S3 and includes MDX extensions for enhanced functionality. Feel free to modify and add your own custom links to access storage and setting up other configurations.

## 🔗 Useful Links
- [Next.js Documentation](https://nextjs.org/docs)
- [Lee Robinson's Next.js + MDX Tutorial Video](https://www.youtube.com/watch?v=34bRv6cQezo&ab_channel=leerob)
- [MDX Documentation](https://mdxjs.com/docs/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Supabase Documentation](https://supabase.com/docs)
- [Docker Documentation](https://docs.docker.com/)
- [React Syntax Highlighter Package](https://github.com/react-syntax-highlighter/react-syntax-highlighter)