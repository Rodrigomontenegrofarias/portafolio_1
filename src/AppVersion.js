// AppVersion.js - Define la versión de la aplicación
import latestTag from './latestTag.txt';

// Define APP_VERSION globalmente para que esté disponible en todo el código
window.APP_VERSION = latestTag || process.env.REACT_APP_VERSION || 'Desarrollo';

// Para compatibilidad con el código existente, también lo definimos como una variable
// eslint-disable-next-line
var APP_VERSION = window.APP_VERSION;

console.log('Versión de la aplicación:', APP_VERSION);

export default APP_VERSION;