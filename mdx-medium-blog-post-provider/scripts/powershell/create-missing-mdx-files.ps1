# PowerShell script to create .mdx files for each slug in src/markdown, skipping files that already exist

# List of slugs (excluding those that already exist)
$slugs = @(
  # Add article slugs here
)

# Path to the markdown directory
$markdownDir = "src/markdown"

# Ensure the directory exists
if (-not (Test-Path $markdownDir)) {
    New-Item -ItemType Directory -Path $markdownDir | Out-Null
}

# Create each .mdx file
foreach ($slug in $slugs) {
    $filePath = Join-Path $markdownDir "$slug.mdx"
    if (-not (Test-Path $filePath)) {
        New-Item -ItemType File -Path $filePath | Out-Null
    }
}

Write-Host "All missing .mdx files created in $markdownDir"