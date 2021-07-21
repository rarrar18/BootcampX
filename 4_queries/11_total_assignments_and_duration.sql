-- Get each day with the total number of assignments and total duration of the assignments
-- In this case, * represents assignments, so count(*) tallies the number of assignments
SELECT day, count(*) as number_of_assignments, sum(duration) as duration
FROM assignments
GROUP BY day
ORDER BY day;