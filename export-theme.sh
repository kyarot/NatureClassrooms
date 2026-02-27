#!/bin/bash

# Clear existing zip
rm -f nature-classrooms-theme.zip

echo "-------------------------------------------"
echo "Creating clean Ghost theme ZIP..."
echo "-------------------------------------------"

# Create zip excluding node_modules and other non-theme files
zip -r nature-classrooms-theme.zip . -x "node_modules/*" "*.git*" "*.DS_Store*" "server.js" "export-theme.sh" ".ghostignore" "package-lock.json" "assets/files/*" "*.zip"

echo "-------------------------------------------"
echo "SUCCESS: nature-classrooms-theme.zip created!"
echo "You can now upload this file to Ghost Admin."
echo "-------------------------------------------"
