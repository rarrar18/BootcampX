// connect to the bootcampx database from within teachers.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});
// Get the name of all teachers who performed an assistance request during a cohort
// DISTINCT ensures there are no repeats of the teachers' names in the results list
// Accept the cohort name as CLI input from the user (eg. node teachers.js MAY07)
pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${process.argv[2] || 'JUL02'}%'
ORDER BY teacher;
`)
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  })
})
.catch(err => {
  console.log('query error', err.stack);
});