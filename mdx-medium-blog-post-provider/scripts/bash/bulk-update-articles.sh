#!/bin/bash
# Shell script to update selected articles in Supabase using article-manager.ts
# Script allows you to update article files based on article slugs captured from a Supabase fetch query

mdxRoot="../../src/markdown"

# List of slugs to exclude (prefix or exact match)
excludeSlugs=(
  # Add your article slugs here
)

# Get all .mdx files in the root of ../../src/markdown (no subfolders)
mdxFiles=()
while IFS= read -r -d '' file; do
  mdxFiles+=("$file")
done < <(find "$mdxRoot" -maxdepth 1 -type f -name "*.mdx" -print0)

for filePath in "${mdxFiles[@]}"; do
  slug=$(basename "$filePath" .mdx)

  # Skip if the slug matches any excluded slug (by prefix or exact)
  shouldSkip=false
  for exclude in "${excludeSlugs[@]}"; do
    if [[ "$slug" == "$exclude" || "$slug" == "$exclude"* ]]; then
      shouldSkip=true
      break
    fi
  done
  if $shouldSkip; then
    echo "Skipping excluded article: $slug"
    continue
  fi

  echo "Updating article: $slug from file: $filePath"
  npx tsx scripts/action-script/article-manager.ts update "$slug" "$slug"
done