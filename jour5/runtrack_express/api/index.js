const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`API lancée sur le port ${port}`);
});

// importer la database
const students = require('./students.json');

// GET /etudiants
app.get('/etudiants', (req, res) => {
    res.json(students);
});

// GET /etudiant/:id
app.get('/etudiant/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const etudiant = students.find(student => student.id === id);
    if (!etudiant) {
      res.status(404).send('Étudiant non trouvé');
    } else {
      res.json(etudiant);
    }
});

// POST /etudiant
app.use(express.json());

app.post('/etudiants', (req, res) => {
    const nouveauEtudiant = req.body;
    nouveauEtudiant.id = students.length + 1; // Donne un ID unique
    students.push(nouveauEtudiant);
    res.json(nouveauEtudiant);
});

// DELETE /etudiant/:id
app.delete('/etudiant/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(student => student.id === id);
    if (index === -1) {
      res.status(404).send('Étudiant non trouvé');
    } else {
      const etudiantSupprime = students.splice(index, 1)[0];
      res.json(etudiantSupprime);
    }
});

// middleware pour gérer les erreurs 404
app.use((req, res) => {
    res.status(404).json({ error: 'Ressource non trouvée' });
});

// gérer les erreurs lors de la lecture de du fichier students.json
const fs = require('fs');

let students;

try {
  const data = fs.readFileSync('./students.json', 'utf8');
  students = JSON.parse(data);
} catch (err) {
  console.error('Erreur lors de la lecture du fichier students.json :', err);
  students = [];
}