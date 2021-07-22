// connect to the bootcampx database from within students.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const name = process.argv[2];
const limit = process.argv[3];

pool.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${name}%'
LIMIT ${limit || 5};
`)
.then(res => {
  // console.log("response: ", res);
  // console.log("rows: ", res.rows);
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
})
.catch(err => console.error('query error', err.stack));
// .catch(err => console.error('query error:', err.msg));