# PowerShell script to create .mdx files for each slug in src/markdowns
# Script allows you to create article files based on article slugs captured from a Supabase fetch query

# List of slugs (excluding those that already exist)
$slugs = @(
# Add article slugs here
)

# Get the directory where the script is located
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition

# Path to the markdown directory (one level above the script directory)
$markdownDir = Join-Path $scriptDir "..\..\src\markdown"
$markdownDir = Resolve-Path $markdownDir

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