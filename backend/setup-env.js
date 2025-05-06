const fs = require('fs');
const path = require('path');

// Path to the .env.example file
const envExamplePath = path.join(__dirname, '.env.example');
// Path to the .env file
const envPath = path.join(__dirname, '.env');

// Check if .env file already exists
if (fs.existsSync(envPath)) {
  console.log('.env file already exists. Skipping creation.');
  process.exit(0);
}

// Read the .env.example file
const envExample = fs.readFileSync(envExamplePath, 'utf8');

// Generate a random JWT secret
const jwtSecret = require('crypto').randomBytes(32).toString('hex');

// Replace the JWT_SECRET placeholder with the generated secret
const envContent = envExample.replace(
  'JWT_SECRET=your_jwt_secret_key_change_in_production',
  `JWT_SECRET=${jwtSecret}`
);

// Write the .env file
fs.writeFileSync(envPath, envContent);

console.log('.env file created successfully with a random JWT secret.');
