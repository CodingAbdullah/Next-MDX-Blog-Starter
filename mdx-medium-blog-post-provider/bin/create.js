#!/usr/bin/env node
const { execa } = require('execa');
const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
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
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'install',
      message: 'Do you want to set up a Next.js MDX blog app here?',
      default: true,
    },
  ]);

  if (!answers.install) {
    console.log('Aborted the installation.');
    return;
  }

  console.log('Setting up the Next.js MDX blog app...');

  try {
    // Use degit to clone the repository into the current directory
    const emitter = degit(repoUrl, { cache: false, force: true });
    await emitter.clone(cwd);

    // If there's no package.json, initialize it first
    if (!hasPackageJson) {
      console.log('Initializing npm project...');
      await execa('npm', ['init', '-y'], { stdio: 'inherit' }); // Initialize package.json with default values
    }

    // Install dependencies
    console.log('Installing dependencies...');
    await execa('npm', ['install'], { stdio: 'inherit' });

    console.log('Next.js MDX Blog setup completed!');
    console.log('To start the app, run:');
    console.log('  npm run dev');
  } 
  catch (error) {
    console.error('Error during setup:', error);
  }
}

// Run function
setup();