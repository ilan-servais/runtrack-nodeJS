const express = require('express');
const app = express();
const port = 80;
const path = require('path');
const fs = require('fs');

// Configurer le moteur de rendu EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Route pour afficher la liste des étudiants
app.get('/students', (req, res) => {
  fs.readFile('../api/students.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier students.json :', err);
      res.status(500).send('Erreur interne du serveur');
      return;
    }

    const students = JSON.parse(data);
    res.render('students', { students });
  });
});

// Route pour gérer les URL inexistantes
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/views/404.html');
});