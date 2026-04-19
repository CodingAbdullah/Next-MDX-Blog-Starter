#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const degit = require('degit');

// GitHub repository URL of the template (the repo you want to clone)
const repoUrl = 'https://github.com/CodingAbdullah/Next-MDX-Blog-Starter';

// Setup function for running script for project setup
async function setup() {
  const cwd = process.cwd();
  const hasPackageJson = fs.existsSync(path.join(cwd, 'package.json'));

  // Check if we're inside an existing project
  if (hasPackageJson) {
    console.log('You already have a project setup here.');
    return;
  }

  // Ask the user if they want to set up the blog
  // inquirer v9+ is ESM-only — use dynamic import and the @inquirer/prompts confirm helper
  const { confirm } = await import('@inquirer/prompts');
  const { execa } = await import('execa');
  const install = await confirm({
    message: 'Do you want to set up a Next.js MDX blog app here?',
    default: true,
  });

  if (!install) {
    console.log('Aborted the installation.');
    return;
  }

  console.log('Setting up the Next.js MDX blog app...');

  try {
    // Clone only the Next.js app subdirectory directly into cwd
    // so the user gets project files at the root without repo meta-files
    console.log('Cloning repository...');
    const emitter = degit(`${repoUrl}/mdx-medium-blog-post-provider`, { cache: false, force: true });
    await emitter.clone(cwd);

    // Install dependencies — app root is now cwd
    console.log('Installing dependencies...');
    await execa('npm', ['install'], {
      stdio: 'inherit',
      cwd,
    });

    console.log('Next.js MDX Blog setup completed!');
    console.log('');
    console.log('Before starting the app, configure your environment variables:');
    console.log('  cp .env.example .env.local');
    console.log('  # Fill in SUPABASE_URL, SUPABASE_ANON_KEY, ANTHROPIC_API_KEY, and others in .env.local');
    console.log('');
    console.log('Then start the development server:');
    console.log('  npm run dev');
  } 
  catch (error) {
    console.error('Error during setup:', error);
  }
}

// Run function
setup();