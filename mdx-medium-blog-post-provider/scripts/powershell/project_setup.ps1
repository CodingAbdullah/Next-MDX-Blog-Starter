# project_setup.ps1
Write-Host "Setting up MDX Medium Blog Post Provider project..."

# Install dependencies
Write-Host "Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if (!(Test-Path ".env")) {
    @"
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=<SUPABASE_URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<SUPABASE_ANON_KEY>
"@ | Out-File -FilePath ".env"
    Write-Host "Created .env file. Please update the file with your Supabase credentials."
}

Write-Host "Project setup completed! You can now run 'npm run dev' to start the development server."