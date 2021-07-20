-- Total time that all students from a specific cohort have spent on all assignments
SELECT sum(assignment_submissions.duration) as total_duration
FROM students
JOIN cohorts ON cohort_id = cohorts.id
JOIN assignment_submissions ON students.id = student_id
WHERE cohorts.name = 'FEB12';