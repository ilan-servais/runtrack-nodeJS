const path = require('path');

const filePath = __filename;

// Récupérer le nom du fichier
const fileName = path.basename(filePath);
console.log("Nom du fichier :", fileName);

// Récupérer l'extension du fichier
const fileExtension = path.extname(filePath);
console.log("Extension du fichier :", fileExtension);

// Récupérer le répertoire parent du fichier
const parentDirectory = path.dirname(filePath);
console.log("Répertoire parent du fichier :", parentDirectory);
