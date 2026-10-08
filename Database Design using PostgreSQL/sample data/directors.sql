
-- 1. Count how many directors in movies table 
SELECT * FROM movies
ORDER BY 
	director_id ASC
-- if we do this , there are directors which directed multiple movies 
-- we don't want to count the duplicate

-- 2. Use DISTICT in COUNT()
SELECT COUNT(DISTINCT director_id) FROM movies








-- COUNT() with WHERE clause
-- ########################

-- 2. Count how many movies are in English language ? 
SELECT COUNT(*) FROM movies
W