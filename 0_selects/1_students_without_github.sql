-- Get a list of students that have not added a github username to their account yet
SELECT id, name, email, cohort_id
FROM students
WHERE github IS NULL
ORDER BY cohort_id;
-- Execute the query with the following command:
-- \i 0_selects/1_students_without_github.sql