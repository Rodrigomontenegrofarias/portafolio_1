// scripts/setTag.js
const fs = require('fs');
const path = require('path');

// Obtener la versión de la variable de entorno o package.json
let appVersion = process.env.REACT_APP_VERSION;

if (!appVersion) {
  try {
    // Usar la versión del package.json como respaldo
    const packageJson = require('../package.json');
    appVersion = packageJson.version || '0.1.0';
  } catch (error) {
    console.warn('Error al leer package.json:', error);
    appVersion = '0.1.0';
  }
}

console.log('Configurando versión de aplicación:', appVersion);

// Crear archivo latestTag.txt
const tagFilePath = path.join(__dirname, '../src/latestTag.txt');
fs.writeFileSync(tagFilePath, appVersion);
console.log('Archivo latestTag.txt creado en:', tagFilePath);

// También crear un archivo env.js para cargar la versión en runtime
const envJsPath = path.join(__dirname, '../public/env.js');
const envJsContent = `// Archivo generado por setTag.js
window.APP_VERSION = "${appVersion}";
console.log("Versión cargada:", window.APP_VERSION);
`;

fs.writeFileSync(envJsPath, envJsContent);
console.log('Archivo env.js creado en:', envJsPath);

// Crear AppVersion.js si no existe
const appVersionPath = path.join(__dirname, '../src/AppVersion.js');
if (!fs.existsSync(appVersionPath)) {
  const appVersionContent = `// AppVersion.js - Define la versión de la aplicación
import latestTag from './latestTag.txt';

// Define APP_VERSION globalmente para que esté disponible en todo el código
window.APP_VERSION = latestTag || process.env.REACT_APP_VERSION || 'Desarrollo';

// Para compatibilidad con el código existente, también lo definimos como una variable
// eslint-disable-next-line
var APP_VERSION = window.APP_VERSION;

console.log('Versión de la aplicación:', APP_VERSION);

export default APP_VERSION;
`;

  fs.writeFileSync(appVersionPath, appVersionContent);
  console.log('Archivo AppVersion.js creado en:', appVersionPath);
}