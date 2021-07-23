// connect to the bootcampx database from within teachers.js
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
// pool.query('SELECT * FROM teachers;', (err, res) => {
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
  // .finally(() => {
  //   console.log("Finally connected!");
  // });

// Submit query to get the name of all teachers who performed an assistance request during a cohort
// Accept cohort name as CLI input (eg. node teachers.js MAY07)
const cohortName = process.argv[2] || "JUL02";
const values = [`%${cohortName}%`];
pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
ORDER BY teacher;
`, values)
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  })
})
.catch(err => {
  console.log('query error', err.stack);
});