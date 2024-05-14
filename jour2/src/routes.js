const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data.json');

// Charger les données à partir du fichier JSON
const loadData = () => {
  try {
    return JSON.parse(fs.readFileSync('data.json', 'utf8'));
  } catch (err) {
    return [];
  }
};

// Enregistrer les données dans le fichier JSON
const saveData = (data) => {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
};

let tasks = loadData();

// GET /api/tasks
router.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /api/tasks
router.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  const newTask = { id: uuidv4(), title, description, status: 'todo' };
  tasks.push(newTask);
  saveData(tasks);
  res.status(201).json(newTask);
});

// PUT /api/tasks/:id
router.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { title, description, status } = req.body;
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], title, description, status };
    saveData(tasks);
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ error: 'Tâche non trouvée' });
  }
});

// DELETE /api/tasks/:id
router.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    saveData(tasks);
    res.json(deletedTask);
  } else {
    res.status(404).json({ error: 'Tâche non trouvée' });
  }
});

module.exports = router;