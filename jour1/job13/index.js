const http = require('http');
const fs = require('fs');
const path = require('path');

// Création du serveur
const server = http.createServer((req, res) => {
    let filePath = '';

    // Si l'URL est "/", renvoie le fichier index.html
    if (req.url === '/' || req.url === '/index.html') {
        filePath = path.join(__dirname, 'index.html');
    } 
    // Si l'URL est "/about", renvoie le fichier about.html
    else if (req.url === '/about' || req.url === '/about.html') {
        filePath = path.join(__dirname, 'about.html');
    } 
    // Si l'URL n'est ni "/", ni "/about", renvoie une erreur 404
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Page non trouvée');
        return;
    }

    // Lecture du fichier correspondant
    fs.readFile(filePath, (err, data) => {
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
