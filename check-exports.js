const semanticRelease = require('semantic-release');
console.log('Exportaciones de semantic-release:');
console.log(Object.keys(semanticRelease).filter(key => !key.startsWith('_')));
