const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data.json');

// Charger les données à partir du fichier JSON
const loadData = () => {
  try {
    return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  } catch (err) {
    return [];
  }
};

// Enregistrer les données dans le fichier JSON
const saveData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

let tasks = loadData();

// GET /api/tasks
router.get('/tasks', (req, res, next) => {
  // Logique de récupération des tâches
  if (erreurDeLecture) {
    const err = new Error('Impossible de récupérer les tâches');
    err.statusCode = 500;
    return next(err);
  }
  res.json(tasks);
});

// POST /api/tasks
router.post('/tasks', (req, res, next) => {
  const { title, description } = req.body;
  if (!title || !description) {
    const err = new Error('Le titre et la description sont obligatoires');
    err.statusCode = 400;
    return next(err);
  }
  const newTask = { id: uuidv4(), title, description, status: 'todo' };
  tasks.push(newTask);
  saveData(tasks);
  res.status(201).json(newTask);
});

// PUT /api/tasks/:id
router.put('/tasks/:id', (req, res, next) => {
  const taskId = req.params.id;
  const { title, description, status } = req.body;
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    const err = new Error('Tâche non trouvée');
    err.statusCode = 404;
    return next(err);
  }

  tasks[taskIndex] = { ...tasks[taskIndex], title, description, status };
  saveData(tasks);
  res.json(tasks[taskIndex]);
});

// DELETE /api/tasks/:id
router.delete('/tasks/:id', (req, res, next) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    const err = new Error('Tâche non trouvée');
    err.statusCode = 404;
    return next(err);
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  saveData(tasks);
  res.json(deletedTask);
});

// Gestionnaire de route pour les erreurs 404
router.use((req, res, next) => {
  const err = new Error('Route non trouvée');
  err.statusCode = 404;
  next(err);
});

module.exports = router;