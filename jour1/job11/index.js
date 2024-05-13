const http = require('http');

// Création du serveur
const server = http.createServer((req, res) => {
    // Définition de l'en-tête de la réponse HTTP
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    // Envoi de la réponse au client
    res.end('Hello World !\n');
});

// Écoute du serveur sur le port 8888
server.listen(8888);

console.log('Le serveur est en cours d\'écoute sur le port 8888...');
