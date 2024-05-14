const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

const routes = require('./routes');
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

module.exports = app;