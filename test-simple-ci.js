const fs = require('fs');
const path = require('path');

console.log('=== CI Test Suite ===\n');

const tests = [
  {
    name: 'TypeScript compilation',
    test: () => {
      return fs.existsSync('lib') && fs.readdirSync('lib').length > 0;
    }
  },
  {
    name: 'Plugin exports',
    test: () => {
      try {
        const plugin = require('./lib/index.js');
        const hasVerify = typeof plugin.verifyConditions === 'function';
        const hasPrepare = typeof plugin.prepare === 'function';
        const hasPublish = typeof plugin.publish === 'function';
        return hasVerify && hasPrepare && hasPublish;
      } catch (e) {
        console.error('Error loading plugin:', e.message);
        return false;
      }
    }
  },
  {
    name: 'Type definitions',
    test: () => {
      return fs.existsSync('lib/index.d.ts');
    }
  },
  {
    name: 'Package.json valid',
    test: () => {
      try {
        const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        return pkg.name === 'gradle-semantic-release-plugin' && pkg.version;
      } catch (e) {
        return false;
      }
    }
  }
];

let passed = 0;
let failed = 0;

tests.forEach((t, i) => {
  const result = t.test();
  console.log(`${i + 1}. ${t.name}: ${result ? '✅ PASS' : '❌ FAIL'}`);
  result ? passed++ : failed++;
});

console.log(`\n=== Results: ${passed}/${tests.length} passed ===`);
if (failed > 0) {
  console.error('❌ Some tests failed');
  process.exit(1);
} else {
  console.log('✅ All tests passed!');
  process.exit(0);
}
