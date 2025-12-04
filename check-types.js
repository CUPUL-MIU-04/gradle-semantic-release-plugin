// Verificar que podemos cargar semantic-release
try {
  const sr = require('semantic-release');
  console.log('✅ semantic-release cargado correctamente');
  console.log('Exportaciones:', Object.keys(sr).filter(k => !k.startsWith('_')));
} catch (error) {
  console.error('❌ Error al cargar semantic-release:', error.message);
}

// Verificar que nuestro plugin se puede cargar
try {
  const plugin = require('./lib/index.js');
  console.log('\n✅ Plugin cargado correctamente');
  console.log('Exporta:', {
    verifyConditions: typeof plugin.verifyConditions,
    prepare: typeof plugin.prepare,
    publish: typeof plugin.publish
  });
} catch (error) {
  console.error('\n❌ Error al cargar el plugin:', error.message);
  console.error('Stack:', error.stack);
}
