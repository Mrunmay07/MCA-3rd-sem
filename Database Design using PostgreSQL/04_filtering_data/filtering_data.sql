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


SELECT * FROM actors
WHERE gender = 'F'
ORDER BY 
		date_of_birth DESC
LIMIT 10


SELECT * FROM movies_revenues
ORDER BY 
		revenues_domestic DESC NULLS LAST
LIMIT 5


-- OFFSET

SELECT * FROM movies
ORDER BY 
		movie_id
LIMIT 5 OFFSET 4



SELECT m.movie_name , r.revenues_domestic FROM movies_revenues r
INNER JOIN movies m ON m.movie_id = r.movie_id
ORDER BY 
		revenues_domestic DESC NULLS LAST
LIMIT 5 OFFSET 4



SELECT * FROM movies
FETCH FIRST 5 ROW ONLY


SELECT * FROM movies
ORDER BY 
		movie_length DESC
FETCH FIRST 5 ROW ONLY 

SELECT * FROM movies
ORDER BY 
		movie_length DESC
LIMIT 5









-- IN and NOT IN 
SELECT * FROM movies
WHERE 
	movie_lang = 'English'
	OR 
	movie_lang = 'Japanese'
	OR
	movie_lang = 'Chinese'


SELECT * FROM movies
WHERE 
	movie_lang IN ('English' , 'Japanese' , 'Chinese')


SELECT * FROM movies
WHERE 
	director_id <> 10
	AND
	director_id <> 13


SELECT * FROM movies
WHERE 
	director_id NOT IN (13 , 10)
ORDER BY director_id


SELECT * FROM actors
WHERE 
	date_of_birth BETWEEN '1991-01-01' AND '1995-12-31'
ORDER BY 
		actor_id





-- LIKE and ILIKE 
SELECT * FROM actors
WHERE 
	first_name LIKE 'C%'



SELECT * FROM actors
WHERE 
	last_name LIKE '%a'


SELECT * FROM actors
WHERE 
	first_name LIKE '_____'


SELECT * FROM actors
WHERE
	first_name ILIKE '_L%'

