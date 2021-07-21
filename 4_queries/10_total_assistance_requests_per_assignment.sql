-- List each assignment with the total number of assistance requests with it
-- total_requests represents a tally of every instance of an assistance_request
-- In this case, assistance_requests === assistance_requests.* === assistance_requests.id
SELECT assignments.id, name, day, chapter, count(assistance_requests.*) as total_requests
FROM assistance_requests
JOIN assignments ON assignments.id = assignment_id
GROUP BY assignments.id
ORDER BY total_requests DESC;