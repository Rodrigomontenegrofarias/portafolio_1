// scripts/setTag.js
const fs = require('fs');

// Intentar obtener el tag de la variable de entorno primero
let tag = process.env.REACT_APP_TAG;

// Si no está disponible, intentar obtenerlo con git (para desarrollo local)
if (!tag) {
  try {
    const { execSync } = require('child_process');
    tag = execSync('git describe --tags --abbrev=0').toString().trim();
  } catch (error) {
    console.log('No se pudo obtener el tag de git, usando "development"');
    tag = 'development';
  }
}

console.log(`Usando tag: ${tag}`);

// Escribir el tag en un archivo para que React pueda leerlo
fs.writeFileSync('src/latestTag.txt', tag);
