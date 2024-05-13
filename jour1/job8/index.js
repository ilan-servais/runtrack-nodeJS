const fs = require('fs');

const filePath = 'data.txt';

fs.readFile(filePath, 'utf-8', (err, content) => {
    if (err) {
        console.error("Une erreur s'est produite lors de la lecture du fichier :", err);
        return;
    }
    
    let everySecondLetter = "";
    for (let i = 0; i < content.length; i += 2) {
        everySecondLetter += content[i];
    }

    console.log("Lettres sur deux du fichier data.txt :");
    console.log(everySecondLetter);
});
