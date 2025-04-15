// Este script lee el tag de la variable de entorno REACT_APP_TAG
// y lo guarda en un archivo que puede ser importado por la aplicación
const fs = require('fs');
const path = require('path');

// Obtener el tag de la variable de entorno
// Si no existe, intenta obtenerlo del comando git
let tag = process.env.REACT_APP_TAG;

if (!tag) {
  try {
    // Intenta obtener el último tag de git
    const { execSync } = require('child_process');
    tag = execSync('git describe --tags --abbrev=0').toString().trim();
    console.log(`Tag obtenido de git: ${tag}`);
  } catch (error) {
    console.log('No se pudo obtener el tag de git:', error.message);
    // Fallback a un valor por defecto
    tag = 'Desarrollo';
  }
} else {
  console.log(`Tag obtenido de variable de entorno: ${tag}`);
}

console.log(`Usando tag: ${tag}`);

// Crear un archivo con la información del tag
const tagContent = `export const APP_VERSION = "${tag}";\n`;
const tagPath = path.join(__dirname, '..', 'src', 'version.js');

try {
  // Asegurarse de que el directorio existe
  const srcDir = path.join(__dirname, '..', 'src');
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir, { recursive: true });
  }
  
  fs.writeFileSync(tagPath, tagContent);
  console.log(`Archivo de versión creado en: ${tagPath}`);
} catch (error) {
  console.error('Error al crear el archivo de versión:', error.message);
  process.exit(1);
}