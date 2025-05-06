const fs = require('fs');
const path = require('path');

// Source and destination directories
const srcDir = path.join(__dirname, 'src/mail/templates');
const destDir = path.join(__dirname, 'dist/mail/templates');

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log(`Created directory: ${destDir}`);
}

// Copy all files from source to destination
try {
  const files = fs.readdirSync(srcDir);
  
  files.forEach(file => {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    
    // Only copy files, not directories
    if (fs.statSync(srcPath).isFile()) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${srcPath} -> ${destPath}`);
    }
  });
  
  console.log('All template files copied successfully!');
} catch (err) {
  console.error('Error copying template files:', err);
  process.exit(1);
}
