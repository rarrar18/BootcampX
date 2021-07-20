-- Get all cohorts with 18 or more students, order by smallest to greatest total
SELECT cohorts.name as cohort_name, count(students.*) as student_count
FROM cohorts
JOIN students ON cohorts.id = cohort_id
GROUP BY cohort_name
HAVING count(students.*) >= 18
ORDER BY student_count;