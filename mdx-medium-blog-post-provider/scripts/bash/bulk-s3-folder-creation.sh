#!/bin/bash
# Shell script to create S3 "folders" for each missing article slug
# Script allows you to create folders for article sections as well as articles themselves

# AWS Credentials (replace with your actual keys or use your default profile)
AWS_ACCESS_KEY_ID="<AWS_ACCESS_KEY_ID goes here>"
AWS_SECRET_ACCESS_KEY="<AWS_SECRET_ACCESS_KEY goes here>"
AWS_REGION="<AWS_REGION goes here>" # e.g., us-east-1

# Your S3 Bucket Name
bucket="software-dot-blog-bucket"

# List of slugs (from missing-files.sh)
slugs=(
  # Add your article slugs here
)

# List of valid sections
sections=(
  # space separated slug strings to be added here, these are your article sections
)

for slug in "${slugs[@]}"; do
  # Skip if not in the expected format (e.g., DynamicArticleContent)
  if [[ ! $slug =~ ^([a-z\-]+)-([0-9]{3})- ]]; then
    continue
  fi

  section="${BASH_REMATCH[1]}"
  articleNum="${BASH_REMATCH[2]}"

  # Only process if section is valid
  if [[ " ${sections[@]} " =~ " ${section} " ]]; then
    folderName="${section}-article-${articleNum}"
    s3Prefix="${section}/${folderName}/"

    # Create the "folder" in S3 by uploading a zero-byte object with a trailing slash
    AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" \
    AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
    AWS_DEFAULT_REGION="$AWS_REGION" \
    aws s3api put-object --bucket "$bucket" --key "$s3Prefix"

    echo "Created S3 folder: $s3Prefix"
  fi
done

echo "All missing article folders created in S3."