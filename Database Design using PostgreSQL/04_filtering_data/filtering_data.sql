SELECT * FROM movies
WHERE movie_lang = 'English'


-- "" -> columns movie_lang m movie_name , 
-- '' -> data 

SELECT * FROM movies
WHERE (movie_lang = 'English'
		AND
	  age_certificate = '18')


SELECT * FROM movies
WHERE 
	(movie_lang = 'English'
	OR 
	movie_lang = 'Chinese')
	AND 
	age_certificate = '12'
ORDER by 
	    1 ASC



-- WHERE -> can't use alias in surname 
SELECT first_name , last_name AS surname FROM actors
WHERE 
	surname = 'Andrews'


-- 

SELECT * FROM movies
WHERE release_date > '2000-01-01'



SELECT * FROM movies
WHERE movie_lang <> 'English'


SELECT * FROM movies
ORDER BY
		movie_length DESC
LIMIT 5


SELECT * FROM directors
WHERE nationality = 'American'
ORDER BY 
		date_of_birth ASC
LIMIT 5