const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read the content model
const contentModel = JSON.parse(fs.readFileSync(path.join(__dirname, '../contentful-model.json'), 'utf8'));

// Create a temporary migration file
const migrationFile = path.join(__dirname, '../migration.json');
fs.writeFileSync(migrationFile, JSON.stringify(contentModel, null, 2));

try {
  // Apply the migration
  console.log('Applying content model to Contentful...');
  execSync(`contentful space import --content-file ${migrationFile}`, { stdio: 'inherit' });
  console.log('Content model successfully applied!');
} catch (error) {
  console.error('Error applying content model:', error);
} finally {
  // Clean up the temporary file
  fs.unlinkSync(migrationFile);
} 