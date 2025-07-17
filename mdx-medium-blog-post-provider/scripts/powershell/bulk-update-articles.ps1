# PowerShell script to update selected articles in Supabase using article-manager.ts
# Script allows you to update article files based on article slugs captured from a Supabase fetch query

# Get the directory where the script is located
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition

# Path to the markdown directory (one level above the script directory)
$markdownDir = Join-Path $scriptDir "..\..\src\markdown"
$markdownDir = Resolve-Path $markdownDir

# List of slugs to exclude (prefix or exact match)
$excludeSlugs = @(
    # Add your article slugs here
)

# Get all .mdx files in the root of src/markdown (no subfolders)
$mdxFiles = Get-ChildItem -Path $markdownDir -File -Filter *.mdx

foreach ($file in $mdxFiles) {
    $slug = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)

    # Skip if the slug matches any excluded slug (by prefix or exact)
    $shouldSkip = $false
    foreach ($exclude in $excludeSlugs) {
        if ($slug -eq $exclude -or $slug.StartsWith($exclude)) {
            $shouldSkip = $true
            break
        }
    }
    if ($shouldSkip) {
        Write-Host "Skipping excluded article: $slug"
        continue
    }

    $filePath = $file.FullName
    Write-Host "Updating article: $slug from file: $filePath"
    npx tsx scripts/action-script/article-manager.ts update $slug $slug
}