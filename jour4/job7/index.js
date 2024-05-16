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
  year_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Year'}
});

const Student = mongoose.model('Student', studentSchema);

// les 3 étudiants
const bob = new Student({ lastname: 'LeBricoleur', firstname: 'Bob', students_number: 145, year_id: null });
const john = new Student({ lastname: 'Doe', firstname: 'John', students_number: 237, year_id: null });
const marine = new Student({ lastname: 'Dupont', firstname: 'Marine', students_number: 317, year_id: null });

Promise.all([bob.save(), john.save(), marine.save()])
  .then(savedStudents => {
    console.log('Étudiants insérés :', savedStudents);
  })
  .catch(err => console.error(err));

// Schéma year
const yearSchema = new mongoose.Schema({
  year: {
    type: String,
    enum: ['Bachelor 1', 'Bachelor 2', 'Bachelor 3']
  }
});

const Year = mongoose.model('Year', yearSchema);

// cursus à chaque étudiant
const bachelor1 = new Year({ year: 'Bachelor 1' });
const bachelor2 = new Year({ year: 'Bachelor 2' });
const bachelor3 = new Year({ year: 'Bachelor 3' });

bob.year_id = new Year({ year: 'Bachelor 1' });
john.year_id = new Year({ year: 'Bachelor 2' });
marine.year_id = new Year({ year: 'Bachelor 3' });

Promise.all([bob.save(), john.save(), marine.save()])
  .then(savedStudents => {
    console.log('Étudiants insérés :', savedStudents);
  })
  .catch(err => console.error(err));

// étudiants avec leur année
Year.insertMany([bachelor1, bachelor2, bachelor3])
  .then(years => {
    console.log('Années insérées :', years);
    return Promise.all([
      bob.save(),
      john.save(),
      marine.save(),
      Student.findByIdAndUpdate(bob._id, { year_id: years[0]._id }),
      Student.findByIdAndUpdate(john._id, { year_id: years[1]._id }),
      Student.findByIdAndUpdate(marine._id, { year_id: years[2]._id })
    ]);
  })
  .then(() => Student.find().populate('year_id'))
  .then(students => {
    console.log('Etudiants avec leur année :');
    students.forEach(student => {
      console.log(`${student.firstname} ${student.lastname} (${student.students_number}) - ${student.year_id.year}`);
    });
  })
  .catch(err => console.error(err));

// filtrer les étudiants par numéro d'étudiant
const filterByNumber = numberToFilter => {
  Student.find({ students_number: { $gt: numberToFilter } })
    .then(students => {
      console.log(`Etudiants avec un numéro supérieur à ${numberToFilter} :`);
      students.forEach(student => {
        console.log(`${student.firstname} ${student.lastname} (${student.students_number})`);
      });
    })
    .catch(err => console.error(err));
};

// appel de la fonction filterByNumber avec un numéro d'étudiant de 200
filterByNumber(200);

// récupérer un étudiant par nom de famille
const findByLastname = lastname => {
  Student.findOne({ lastname })
    .populate('year_id')
    .then(student => {
      console.log(`Étudiant avec le nom ${lastname} :`);
      console.log(`${student.firstname} ${student.lastname} (${student.students_number}) - ${student.year_id.year}`);
    })
    .catch(err => console.error(err));
};

// appel de la fonction findByLastname avec le nom de famille 'Doe'
findByLastname('Doe');
