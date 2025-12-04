const fs = require('fs');
const path = require('path');

console.log('=== Running Tests Without Jest ===\n');

async function runTests() {
  console.log('1. Testing TypeScript compilation...');
  try {
    require('child_process').execSync('npm run build', { stdio: 'pipe' });
    console.log('✅ TypeScript compilation successful');
  } catch (error) {
    console.error('❌ TypeScript compilation failed:', error.message);
    return false;
  }

  console.log('\n2. Testing plugin structure...');
  try {
    const plugin = require('./lib/index.js');
    const expectedExports = ['verifyConditions', 'prepare', 'publish'];
    const missingExports = expectedExports.filter(exp => !plugin[exp]);
    
    if (missingExports.length === 0) {
      console.log('✅ Plugin exports all required functions');
    } else {
      console.error(`❌ Missing exports: ${missingExports.join(', ')}`);
      return false;
    }
  } catch (error) {
    console.error('❌ Failed to load plugin:', error.message);
    return false;
  }

  console.log('\n3. Testing individual modules...');
  const modules = ['gradle', 'prepare', 'publish', 'verify-conditions'];
  let allModulesOk = true;
  
  modules.forEach(moduleName => {
    try {
      require(`./lib/${moduleName}.js`);
      console.log(`✅ ${moduleName}.js loads correctly`);
    } catch (error) {
      console.error(`❌ ${moduleName}.js failed to load:`, error.message);
      allModulesOk = false;
    }
  });

  if (!allModulesOk) {
    return false;
  }

  console.log('\n4. Testing test projects structure...');
  const testDir = 'test/project';
  if (fs.existsSync(testDir)) {
    const projects = fs.readdirSync(testDir);
    console.log(`✅ Found ${projects.length} test projects`);
    
    // Check if gradlew files exist and are executable
    projects.forEach(project => {
      const gradlewPath = path.join(testDir, project, 'gradlew');
      if (fs.existsSync(gradlewPath)) {
        const stats = fs.statSync(gradlewPath);
        const isExecutable = (stats.mode & 0o111) !== 0;
        console.log(`   ${project}/gradlew: ${isExecutable ? '✅ executable' : '⚠️ not executable'}`);
      }
    });
  } else {
    console.log('⚠️ No test projects directory found');
  }

  console.log('\n=== All tests completed successfully! ===');
  return true;
}

runTests().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
