-- Quering Data 

SELECT * FROM movies


SELECT movie_name AS mn , movie_length AS ml , age_certificate AS ac FROM movies


SELECT * FROM movies
ORDER BY 
		release_date DESC



SELECT first_name , last_name AS surname FROM actors
ORDER BY 
		2 DESC

-- Yes , you can use alias in ORDER BY clause




CREATE TABLE demo_sorting(
	num INT
)

INSERT INTO demo_sorting
	(num)
VALUES
	(1),
	(2),
	(NULL),
	(3),
	(NULL)

SELECT * FROM demo_sorting
ORDER BY 
	    num NULLS FIRST



-- Alias
-- ORDER BY ASC DESC -> column_name , alias , column_number
-- NULLS -> NULLS FIRST , NULLS LAST


SELECT * FROM movies_revenues
ORDER BY 
		4 NULLS FIRST





SELECT DISTINCT movie_lang FROM movies

