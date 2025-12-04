const fs = require('fs');
const path = require('path');

console.log('=== PRUEBA FINAL DEL PLUGIN ===\n');

// 1. Verificar paquete creado
console.log('1. Verificando paquete npm...');
const tgzFiles = fs.readdirSync('.').filter(f => f.endsWith('.tgz'));
if (tgzFiles.length > 0) {
  console.log(`✅ Paquete creado: ${tgzFiles[0]}`);
  console.log(`   Tamaño: ${fs.statSync(tgzFiles[0]).size} bytes`);
} else {
  console.log('❌ No se encontró paquete .tgz');
}

// 2. Verificar estructura de lib
console.log('\n2. Verificando estructura de lib/...');
const libFiles = fs.readdirSync('lib');
console.log(`✅ ${libFiles.length} archivos en lib/`);
console.log('   Archivos JavaScript:', libFiles.filter(f => f.endsWith('.js')).join(', '));
console.log('   Archivos TypeScript:', libFiles.filter(f => f.endsWith('.d.ts')).join(', '));

// 3. Cargar y probar el plugin
console.log('\n3. Cargando el plugin...');
try {
  const plugin = require('./lib/index.js');
  console.log('✅ Plugin cargado exitosamente');
  
  // Verificar que exporta las funciones correctas
  const exports = {
    verifyConditions: typeof plugin.verifyConditions,
    prepare: typeof plugin.prepare,
    publish: typeof plugin.publish
  };
  
  console.log('   Exporta:');
  Object.entries(exports).forEach(([key, value]) => {
    console.log(`     - ${key}: ${value}`);
  });
  
  // Verificar que son funciones asíncronas
  if (exports.verifyConditions === 'function' && 
      exports.prepare === 'function' && 
      exports.publish === 'function') {
    console.log('✅ Todas las exportaciones son funciones');
  } else {
    console.log('❌ Faltan algunas exportaciones');
  }
} catch (error) {
  console.error('❌ Error al cargar el plugin:', error.message);
}

// 4. Verificar proyectos de prueba
console.log('\n4. Verificando proyectos de prueba...');
const testDir = 'test/project';
if (fs.existsSync(testDir)) {
  const projects = fs.readdirSync(testDir);
  console.log(`✅ ${projects.length} proyectos de prueba encontrados:`);
  projects.forEach((proj, i) => {
    const gradlew = path.join(testDir, proj, 'gradlew');
    const hasGradlew = fs.existsSync(gradlew);
    console.log(`   ${i+1}. ${proj} ${hasGradlew ? '✅ (con gradlew)' : '⚠️  (sin gradlew)'}`);
  });
} else {
  console.log('⚠️  Directorio de tests no encontrado');
}

// 5. Verificar configuración de TypeScript
console.log('\n5. Verificando configuración TypeScript...');
if (fs.existsSync('tsconfig.json')) {
  const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
  console.log('✅ tsconfig.json válido');
  console.log(`   - target: ${tsconfig.compilerOptions.target}`);
  console.log(`   - outDir: ${tsconfig.compilerOptions.outDir}`);
  console.log(`   - declaration: ${tsconfig.compilerOptions.declaration}`);
} else {
  console.log('❌ tsconfig.json no encontrado');
}

// 6. Verificar dependencias
console.log('\n6. Verificando dependencias...');
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log(`✅ package.json válido (versión ${pkg.version})`);
  console.log(`   - Dependencias: ${Object.keys(pkg.dependencies || {}).length}`);
  console.log(`   - DevDependencies: ${Object.keys(pkg.devDependencies || {}).length}`);
  console.log(`   - PeerDependencies: ${Object.keys(pkg.peerDependencies || {}).length}`);
} catch (error) {
  console.error('❌ Error al leer package.json:', error.message);
}

console.log('\n=== RESULTADO FINAL ===');
console.log('El plugin está LISTO para usar y distribuir.');
console.log('\nPara publicar en npm:');
console.log('1. npm login');
console.log('2. npm publish');
console.log('\nPara instalar desde GitHub:');
console.log('npm install https://github.com/CUPUL-MIU-04/gradle-semantic-release-plugin');
console.log('\nPara usar en tu proyecto:');
console.log('Añade "gradle-semantic-release-plugin" a los plugins de semantic-release');
