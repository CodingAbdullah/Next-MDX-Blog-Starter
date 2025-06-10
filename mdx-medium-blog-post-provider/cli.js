#!/usr/bin/env node

const execa = require('execa');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

// Script for setting up CLI command for setting up project
async function setup() {
  // Check if we are inside a project folder
  const cwd = process.cwd();
  const hasPackageJson = fs.existsSync(path.join(cwd, 'package.json'));

  if (hasPackageJson) {
    console.log('You already have a project setup here.');
    return;
  }

  // Ask user for confirmation to set up
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'install',
      message: 'Do you want to set up a Next.js blog app here?',
      default: true,
    },
  ]);

  if (!answers.install) {
    console.log('Aborted the installation.');
    return;
  }

  console.log('Setting up the project...');

  // Initialize npm and install dependencies
  try {
    // Initialize package.json
    await execa('npm', ['init', '-y']);

    // Install dependencies
    await execa('npm', ['install'], {
      stdio: 'inherit',
    });

    console.log('Next.js Blog setup completed!');
  } catch (error) {
    console.error('Error during setup:', error);
  }
}

setup();