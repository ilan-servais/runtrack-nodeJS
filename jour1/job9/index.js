const fs = require('fs');

const filePath = 'data.txt';

const newContent = "Je manipule les fichiers avec un module node !";

fs.writeFile(filePath, newContent, 'utf-8', (err) => {
    if (err) {
        console.error("Une erreur s'est produite lors de l'écriture dans le fichier :", err);
        return;
    }
    
    console.log("Le contenu du fichier data.txt a été modifié avec succès !");
});
