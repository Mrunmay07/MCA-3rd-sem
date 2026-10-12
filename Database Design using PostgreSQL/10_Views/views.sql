SELECT movie_name , movie_length , movie_lang FROM movies
WHERE movie_lang = 'English'


CREATE VIEW movie_eng_view AS 
SELECT movie_name , movie_length , movie_lang FROM movies
WHERE movie_lang = 'English'


SELECT * FROM movie_eng_view