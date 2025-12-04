const execa = require('execa');

async function test() {
  console.log('=== Probando execa ===');
  try {
    const result = await execa('echo', ['Hello execa v5']);
    console.log('✅ execa funciona:', result.stdout);
    return true;
  } catch (error) {
    console.error('❌ execa no funciona:', error.message);
    return false;
  }
}

test().then(success => {
  process.exit(success ? 0 : 1);
});
