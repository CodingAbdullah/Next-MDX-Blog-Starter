#!/bin/bash

echo "Setting up MDX Medium Blog Post Provider project..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    cat > .env << EOL
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=<SUPABASE_URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<SUPABASE_ANON_KEY>
EOL
    echo "Created .env file. Please update the file with your Supabase credentials."
fi

echo "Project setup completed! You can now run 'npm run dev' to start the development server."