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

If you want, you can also run this project using the following command:
   ```bash
   npx create-next-mdx-blog-app .
   ```
This will instantly create and setup the starter kit project for you to work on.

## ![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white) Package

### Install via NPM

```bash
npm install create-next-mdx-blog-app
```

### Quick Start with NPX

```bash
npx create-next-mdx-blog-app .
```

### Package Information

- **Package Name**: `create-next-mdx-blog-app`
- **Version**: `1.0.5`
- **License**: MIT
- **Homepage**: [https://www.npmjs.com/package/create-next-mdx-blog-app](https://www.npmjs.com/package/create-next-mdx-blog-app/)

## 🛠️ Tools
### AI Tools
- **Cursor**: An AI-powered coding assistant that enhances productivity and code quality.
- **Loveable**: A design inspiration that emphasizes user-friendly interfaces and experiences.
- **Claude Sonnet 4**: A model that aids in development, providing intelligent suggestions and optimizations.

### Common NPM Libraries
- **mdx**: A markdown format that allows you to write JSX in your markdown files, enabling rich content.
- **Supabase**: An open-source Firebase alternative that provides a backend as a service, including database and authentication.
- **shadcn/ui**: A collection of UI components designed for building modern web applications.
- **lucide-react**: A set of customizable icons for React applications, enhancing visual appeal.
- **gray-matter**: A library for parsing front matter from markdown files, useful for managing metadata.
- **react**: A JavaScript library for building user interfaces, allowing for the creation of reusable UI components.
- **react-syntax-highlighter**: A library for syntax highlighting in React applications, making code snippets more readable.
- **tsx**: Run TypeScript code without worrying about configuration! Run the `article-manager.ts` for manually working with published articles.

## 🌐 Static/Dynamic Rendering with MDX
This project utilizes MDX for both static and dynamic rendering of blog posts. The two MDX files included in the project serve as examples of how to structure your content.

- **Static MDX**: Pre-rendered at build time (<b>route</b>: `/app/sample-blog-post-page`, <b>article content</b>: `/markdown/ArticleContent.mdx`).
- **Dynamic MDX**: Rendered on the server at request time (<b>route</b>: `/app/dynamic`, <b>article content</b>: `/markdown/DynamicArticleContent.mdx`).

### Article Metadata
`.mdx` files can contain useful information that can be thought of as metadata for the file itself. This is called frontmatter and it is stored at the top of the file using this `---` opening and closing syntax.

A helpful package known as `gray-matter` is used to format and separate frontmatter from the article content which is useful when fetching and rendering dynamic MDX content.

Dynamic MDX content is rendered with the help of the `next-mdx-remote` package and utilizing the `MDXRemote` custom component.

## 🖼️ MDX Components File
The `mdx-components.tsx` file located in the root, integrates styling for built-in HTML elements as well as optimizing built-in elements such as `<a>` and `<img>` using the built-in components provided by Next.js (`<Image>` and `<Link>`). 

For more details on what this file is and how it is utilized in a Next.js application, you can refer to the official docs <a href="https://nextjs.org/docs/app/api-reference/file-conventions/mdx-components">here</a>.

## 🧩 Custom React Components
Custom React components are created for enhanced functionality when working with MDX. The following are located in the `customMDXComponents` directory inside the `components` directory of the project.

### Syntax Highlighting
The project includes a custom `CodeBlock` component for syntax highlighting code blocks using the `react-syntax-highlighter` package. 

Default theme is set to the `vscDarkPlus` theme. Feel free to modify the theme and even add your own syntax highlighting library if you so choose.

You can read more about the library used in this project <a href="https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/">here.</a>


### GitHub Gists
For safety and ease of use, GitHub Gists can be integrated into MDX files to manage code snippets with its own custom component. 

Note that only GitHub Gists that are publicly available are supported. You can modify the component to integrate private Gists.

This custom component also utilizes the `react-syntax-highlighter` package for syntax highlighting the publicly accessible GitHub gists.

### MDX Images
The project comes with its own `MDXImage` component that utilizes the Next.js built-in `Image` component as well as the built-in `figure` and `figcaption` elements to integrate imaging and captions seamlessly.

## 🧩 Constants, Functions, & Types
In this project, you will find custom constants, functions, and types in the `/src/utils/` directory. Certain constants serve as placeholders in this demo application. 

While functions and data types are integral to the function of this web application, feel free to check them out.

## 🗄️ Supabase Database Setup
The project uses Supabase for database management. The `SupabaseClient` module is configured to interact with your Supabase instance. The instance is located in `/src/utils/functions/supabase_client`.

**Ensure that the policies of the Supabase database enable you to perform the desired CRUD actions against your tables. You can modify these in the Supabase console.**

### Environment Variables
Create a `.env` file in the root directory and add your Supabase secrets:

``
SUPABASE_URL=your_supabase_url
``

``
SUPABASE_ANON_KEY=your_supabase_anon_key
``

## 🌩️ AWS
This application utilizes the AWS S3 service for the storage of images. You can find the external URL used to access these objects in the `next.config.ts` file. Feel free to use another service or modify the URL to point to a S3 bucket of your own.

Images are used in the `.mdx` files and utilized via the custom `MDXImage` component covered earlier.

## 🐳 Docker
This application can be containerized using Docker. 

To build an image, utilize the Dockerfile located in the root location of the repository and run the following commands to run this web application in a standalone container (passing in the Supabase credentials as well):

``
docker build -t mdx-medium-blog .
``

``
docker run -e SUPABASE_URL=your_supabase_url \ -e SUPABASE_ANON_KEY=your_supabase_anon_key \ -p 3000:3000 mdx-medium-blog
``

## 🔄 CRUD Operations and Supabase Actions
Implementation of the CRUD operation functions is stored in the `/src/utils/functions/crud` directory. This includes functions for creating, reading, updating, and deleting articles in the Supabase database.

The `article-manager.ts` file utilizes these CRUD functions to successfully perform the desired actions.

## 📜 Scripts for Setting Up Project
The `/scripts` folder contains various scripts to help set up the project and database.

### Setup Scripts
- **SQL Scripts**: DDL and DML statements for initializing and populating the database.
- **Powershell Script**: Script for setting up project on Windows.
- **Bash Shell Script**: Script for setting up project on Linux, Mac, etc.

This project directly integrates Supabase in the front-end using React Server components which removes the need for custom back-end APIs.

## 🛠️ Compiling TypeScript and Testing Locally
The `article-manager.ts` file (located in `/scripts/action-script`) utilizes the `tsx` package to perform the different actions (CRUD operations) on articles stored locally.

You can use this handy script for testing MDX and article functionality locally.

The following codeblock highlights the different command prompts that can be used with this file:

    - Insert an Article into Supabase
    npx tsx article-manager.ts insert article-slug

    - Delete an Article from Supabase
    npx tsx article-manager.ts delete article-slug

    - Update an Article in Supabase
    npx tsx article-manager.ts update article-slug new-article-file

    - Fetch a Single Article from Supabase
    npx tsx article-manager.ts fetch article-slug

    - Fetch all Articles from Supabase
    npx tsx article-manager.ts fetchAll

The article slug is the name of the markdown file located in the `/src/markdown` directory minus the extension, `.mdx`.

The update statement takes in an additional parameter which is also the same thing (file name minus the `.mdx` extension located in the `/src/markdown` directory).

## 📊 Analytics
Integrated in this setup project is Vercel Analytics (`@vercel/analytics`) to track user interactions and performance metrics of the blog.

## ⚙️ Next.js Configuration
The `next.config.ts` file is set up for working with AWS S3 and includes MDX extensions for enhanced functionality. Feel free to modify and add your own custom links to access storage and setting up other configurations.

## 🔗 Useful Links
- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com/docs/)
- [Lee Robinson's Next.js + MDX Tutorial Video](https://www.youtube.com/watch?v=34bRv6cQezo&ab_channel=leerob)
- [MDX Playground](https://mdxjs.com/playground/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Supabase Documentation](https://supabase.com/docs)
- [Docker Documentation](https://docs.docker.com/)
- [React Syntax Highlighter Package](https://github.com/react-syntax-highlighter/react-syntax-highlighter)