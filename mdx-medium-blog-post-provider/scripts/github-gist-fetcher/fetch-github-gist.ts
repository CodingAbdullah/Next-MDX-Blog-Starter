#!/usr/bin/env npx tsx

import fs from 'fs/promises';
import path from 'path';

/**
 * TypeScript script to fetch GitHub Gist content and export to text file
 * Usage: npx tsx scripts/fetch-gist.ts <gist-id>
 */

async function fetchGist(gistId: string): Promise<void> {
  try {
    console.log(`Fetching GitHub Gist: ${gistId}`);
    
    // Fetch gist metadata from GitHub API
    const response = await fetch(`https://api.github.com/gists/${gistId}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    // Get the first file from the gist
    const files = data.files;
    const firstFileKey = Object.keys(files)[0];
    
    if (!firstFileKey) {
      throw new Error('No files found in the gist');
    }
    
    const file = files[firstFileKey];
    const rawFileUrl = file.raw_url;
    
    console.log(`Fetching raw content from: ${rawFileUrl}`);
    
    // Fetch the raw file content
    const fileResponse = await fetch(rawFileUrl);
    const content = await fileResponse.text();

    if (!fileResponse.ok) {
      throw new Error(`Failed to fetch raw content: ${fileResponse.status} ${fileResponse.statusText}`);
    }

    // Create output path using gist ID
    const outputPath = path.join(__dirname, '..', '..', 'src', 'github_gists', `${gistId}.txt`);

    // Ensure directory exists
    const outputDir = path.dirname(outputPath);
    await fs.mkdir(outputDir, { recursive: true });

    // Write content to file
    await fs.writeFile(outputPath, content, 'utf8');
    
    console.log(`✅ Successfully exported gist content to: ${outputPath}`);    
  } 
  catch {
    console.error('❌ Error fetching GitHub Gist');
    process.exit(1);
  }
}

// Parse command line arguments
const gistId = process.argv[2];

if (!gistId) {
  console.error('Usage: npx tsx scripts/fetch-gist.ts <gist-id>');
  console.error('Example: npx tsx scripts/fetch-gist.ts abc123def456');
  process.exit(1);
}

// Run the fetch
fetchGist(gistId);