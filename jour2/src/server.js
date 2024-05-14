const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const routes = require('./routes');
app.use('/api', routes);

// Middleware global pour la gestion des erreurs
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Une erreur inattendue est survenue';
  res.status(statusCode).json({ error: message });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

module.exports = app;