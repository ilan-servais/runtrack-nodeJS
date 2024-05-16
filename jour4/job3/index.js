const mongoose = require('mongoose');

// Connexion MongoDB
mongoose.connect('mongodb://localhost:27017/LaPlateforme', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

// Schéma Student
const studentSchema = new mongoose.Schema({
  id: Number,
  lastname: String,
  firstname: String,
  students_number: Number,
  year_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Year' }
});

const Student = mongoose.model('Student', studentSchema);

// les 3 étudiants
const bob = new Student({ id: 1, lastname: 'LeBricoleur', firstname: 'Bob', students_number: 145, year_id: null });
const john = new Student({ id: 2, lastname: 'Doe', firstname: 'John', students_number: 237, year_id: null });
const marine = new Student({ id: 3, lastname: 'Dupont', firstname: 'Marine', students_number: 317, year_id: null });

Promise.all([bob.save(), john.save(), marine.save()])
  .then(savedStudents => {
    console.log('Étudiants insérés :', savedStudents);
  })
  .catch(err => console.error(err));