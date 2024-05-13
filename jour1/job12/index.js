const http = require('http');
const fs = require('fs');
const path = require('path');

// Création du serveur
const server = http.createServer((req, res) => {
    // Récupérer le chemin du fichier index.html
    const indexPath = path.join(__dirname, 'index.html');

    // Lecture du fichier index.html
    fs.readFile(indexPath, (err, data) => {
        if (err) {
            // En cas d'erreur de lecture du fichier
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Erreur interne du serveur');
            return;
        }

        // Envoi de la réponse avec le contenu HTML
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});

// Écoute du serveur sur le port 8888
server.listen(8888);

console.log('Le serveur est en cours d\'écoute sur le port 8888...');
