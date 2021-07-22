// connect to the bootcampx database from within students.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx',
  port: 5432
})

// Connect to the database using a callback
// pool.connect((err) => {
//   if (err) return console.log(err);
// })

// Submit a query using a callback
// pool.query('SELECT * FROM students;', (err, res) => {
//   console.log('error: ', err);
//   console.log('res: ', res.rows);
// })

// Connect to the database using promises
pool.connect()
  .then(() => {
    console.log("Successful connection!");
  })
  .catch(e => {
    console.log('Connection error: ', e.message);
  })
  .finally(() => {
    console.log("Finally connected!");
  });

// Submit a query using promises
pool.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${process.argv[2]}%'
LIMIT ${process.argv[3] || 5};
`)
.then(res => {
  // console.log("rows: ", res.rows);
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
})
.catch(err => console.error('query error', err.stack));
// .catch(err => console.error('query error:', err.msg));