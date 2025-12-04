const path = require('path');
const fs = require('fs');
const { execa } = require('execa');

console.log('=== Prueba de integración del plugin ===');

const testProject = 'test-real-project';

async function testPlugin() {
  console.log(`1. Probando en proyecto: ${testProject}`);
  
  if (!fs.existsSync(testProject)) {
    console.error('❌ Proyecto de prueba no existe');
    return;
  }

  console.log('2. Ejecutando gradle --version...');
  try {
    const { stdout } = await execa('./gradlew', ['--version'], {
      cwd: testProject,
      stdio: 'pipe'
    });
    console.log('✅ Gradle funciona:', stdout.split('\n')[0]);
  } catch (error) {
    console.log('⚠️  Gradle no funciona, intentando instalar...');
    // En Termux, gradle no está instalado por defecto
    console.log('Ejecuta: pkg install gradle');
  }

  console.log('\n3. Verificando que el plugin puede ser requerido...');
  try {
    const plugin = require('./lib/index.js');
    console.log('✅ Plugin exporta:', {
      verifyConditions: typeof plugin.verifyConditions,
      prepare: typeof plugin.prepare,
      publish: typeof plugin.publish
    });
  } catch (error) {
    console.error('❌ Error al requerir el plugin:', error.message);
  }

  console.log('\n=== Prueba de integración completada ===');
}

testPlugin().catch(console.error);
