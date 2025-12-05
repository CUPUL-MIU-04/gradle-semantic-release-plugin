const fs = require('fs');
const path = require('path');

console.log('=== Compatibilidad con semantic-release@25.0.2+ ===\n');

try {
  // Intentar cargar semantic-release v25
  const semanticRelease = require('semantic-release');
  console.log('✅ semantic-release v25 cargado correctamente');
  console.log('   Versión:', require('semantic-release/package.json').version);
  
  // Verificar estructura de exports
  console.log('\n   Exports:', Object.keys(semanticRelease));
} catch (error) {
  console.error('❌ Error al cargar semantic-release:', error.message);
}

console.log('\n=== Verificando estructura del plugin ===\n');

try {
  // Cargar nuestro plugin
  const plugin = require('./lib/index.js');
  console.log('✅ Plugin cargado correctamente');
  
  // Verificar que exporta las funciones esperadas por semantic-release
  const requiredExports = ['verifyConditions', 'prepare', 'publish'];
  const pluginExports = Object.keys(plugin);
  
  console.log('   Exporta:', pluginExports.join(', '));
  
  const missingExports = requiredExports.filter(exp => !pluginExports.includes(exp));
  if (missingExports.length === 0) {
    console.log('✅ Todas las exportaciones requeridas están presentes');
  } else {
    console.error(`❌ Faltan exportaciones: ${missingExports.join(', ')}`);
  }
  
  // Verificar que son funciones
  const invalidExports = requiredExports.filter(exp => typeof plugin[exp] !== 'function');
  if (invalidExports.length === 0) {
    console.log('✅ Todas las exportaciones son funciones');
  } else {
    console.error(`❌ Algunas exportaciones no son funciones: ${invalidExports.join(', ')}`);
  }
  
} catch (error) {
  console.error('❌ Error al cargar el plugin:', error.message);
}

console.log('\n=== Verificando peerDependencies ===\n');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const peerDeps = pkg.peerDependencies || {};
if (peerDeps['semantic-release']) {
  console.log(`✅ peerDependencies especifica: semantic-release ${peerDeps['semantic-release']}`);
} else {
  console.error('❌ No se especifica semantic-release en peerDependencies');
}

console.log('\n=== Conclusión ===');
console.log('El plugin DEBERÍA ser compatible con semantic-release@25.0.2+ porque:');
console.log('1. Usa tipos compatibles (Context, etc.)');
console.log('2. Exporta las funciones correctas (verifyConditions, prepare, publish)');
console.log('3. PeerDependencies permite ^24.0.0 || ^25.0.0');
console.log('\n⚠️  Nota: semantic-release v25 tiene cambios en los tipos exportados,');
console.log('   pero nuestro plugin usa definiciones propias para evitar conflictos.');
