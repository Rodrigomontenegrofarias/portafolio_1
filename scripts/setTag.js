// scripts/setTag.js
const { execSync } = require('child_process');
const fs = require('fs');

// Obtener el último tag
const latestTag = execSync('git describe --tags `git rev-list --tags --max-count=1`').toString().trim();

// Crear contenido JS para exportar la versión
const content = `const version = '${latestTag}';\nexport default version;\n`;

// Escribir en src/version.js
fs.writeFileSync('src/version.js', content);

console.log('✔️ src/version.js creado con el tag:', latestTag);
