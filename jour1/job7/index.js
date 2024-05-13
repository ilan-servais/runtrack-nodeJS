const fs = require('fs');

const filePath = 'data.txt';

// Lecture du contenu du fichier de manière asynchrone
fs.readFile(filePath, 'utf-8', (err, content) => {
    if (err) {
        console.error("Une erreur s'est produite lors de la lecture du fichier :", err);
        return;
    }
    
    console.log("Contenu du fichier data.txt :");
    console.log(content);
});
