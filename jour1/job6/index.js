const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.txt');

// Lecture du contenu du fichier de manière synchrone
const content = fs.readFileSync(filePath, 'utf-8');

console.log("Contenu du fichier data.txt :");
console.log(content);
