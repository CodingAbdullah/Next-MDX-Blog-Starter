#!/bin/bash
# Bash script to create .mdx files for each slug in src/markdown, skipping files that already exist

# List of slugs (excluding those that already exist)
slugs=(
  # Add article slugs here
)

# Path to the markdown directory
markdownDir="src/markdown"

# Ensure the directory exists
if [ ! -d "$markdownDir" ]; then
    mkdir -p "$markdownDir"
fi

# Create each .mdx file
for slug in "${slugs[@]}"; do
    filePath="$markdownDir/$slug.mdx"
    if [ ! -f "$filePath" ]; then
        touch "$filePath"
    fi
done

echo "All missing .mdx files created in $markdownDir"
