const fs = require('fs');
const path = require('path');

console.log('=== Verificación del plugin ===');

// Verificar estructura de lib
const libFiles = fs.readdirSync('lib');
console.log('Archivos en lib:', libFiles);

// Verificar que index.js existe
const indexExists = fs.existsSync('lib/index.js');
console.log('lib/index.js existe:', indexExists);

if (indexExists) {
  const content = fs.readFileSync('lib/index.js', 'utf8');
  console.log('Primeras líneas de lib/index.js:');
  console.log(content.split('\n').slice(0, 5).join('\n'));
}

// Verificar permisos de gradlew en tests
console.log('\n=== Verificando permisos de gradlew ===');
const testDir = 'test/project';
if (fs.existsSync(testDir)) {
  const projects = fs.readdirSync(testDir);
  projects.forEach(proj => {
    const gradlew = path.join(testDir, proj, 'gradlew');
    if (fs.existsSync(gradlew)) {
      const stat = fs.statSync(gradlew);
      console.log(`${proj}/gradlew: ${stat.mode.toString(8)}`);
    }
  });
}
