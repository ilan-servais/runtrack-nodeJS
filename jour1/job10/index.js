// Déclaration de la constante URL
const URL = "https://www.google.com&search=nodejs";

// Remplacer le nom d'hôte par "www.laplateforme.io"
let newURL = URL.replace("www.google.com", "www.laplateforme.io");

// Ajouter le paramètre "?lang=fr" à la nouvelle URL
newURL += "?lang=fr";

// Afficher le protocole de l'URL
const protocol = URL.split("://")[0];
console.log("Le protocole est", protocol);

// Afficher la nouvelle URL dans le terminal
console.log("Nouvelle URL :", newURL);
