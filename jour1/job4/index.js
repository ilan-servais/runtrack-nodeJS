const fs = require('fs');
const path = require('path');

// Chemin de jour1
const jour1Path = path.join(__dirname, '..');

// Utilisation de readdirSync() pour avoir la liste des fichiers et dossiers dans jour1
const directories = fs.readdirSync(jour1Path, { withFileTypes: true })
    .filter(item => item.isDirectory())
    .map(item => item.name);

// Affichage des dossiers dans la console
console.log("Contenu du répertoire courant :");
directories.forEach(directory => {
    console.log(directory);
});
