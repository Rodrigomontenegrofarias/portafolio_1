// scripts/setTag.js
const fs = require('fs');
const path = require('path');

// Obtener la versión de la variable de entorno
let appVersion = process.env.REACT_APP_VERSION;

// Si no existe, intentar obtenerla del archivo .env
if (!appVersion) {
  try {
    const envFilePath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envFilePath)) {
      const envContent = fs.readFileSync(envFilePath, 'utf8');
      const versionMatch = envContent.match(/REACT_APP_VERSION=(.+)/);
      if (versionMatch && versionMatch[1]) {
        appVersion = versionMatch[1];
      }
    }
  } catch (error) {
    console.warn('Error al leer archivo .env:', error);
  }
}

// Si todavía no existe, intentar obtener desde package.json
if (!appVersion) {
  try {
    const packageJsonPath = path.resolve(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    appVersion = packageJson.version || 'v0.0.0';
  } catch (error) {
    console.warn('Error al leer package.json:', error);
    appVersion = 'v0.0.0';
  }
}

console.log(`Configurando versión de aplicación: ${appVersion}`);

// Crear archivo env.js en la carpeta public
const envJsPath = path.resolve(process.cwd(), 'public', 'env.js');
const envJsContent = `// Archivo generado automáticamente por setTag.js
window.APP_VERSION = "${appVersion}";
console.log("Versión de aplicación cargada:", window.APP_VERSION);
`;

// Escribir el archivo
fs.writeFileSync(envJsPath, envJsContent);
console.log(`Archivo env.js creado en: ${envJsPath}`);

// También crear un archivo latestTag.txt para tener la versión disponible de otra manera
try {
  const tagPath = path.resolve(process.cwd(), 'src', 'latestTag.txt');
  fs.writeFileSync(tagPath, appVersion);
  console.log(`Archivo latestTag.txt creado en: ${tagPath}`);
} catch (error) {
  console.error('Error al crear archivo latestTag.txt:', error);
}