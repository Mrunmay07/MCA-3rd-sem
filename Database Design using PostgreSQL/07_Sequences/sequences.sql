-- Sequences


CREATE SEQUENCE test_seq;


SELECT nextval('test_seq')

SELECT currval('test_seq')

SELECT setval('test_seq' , 100)


-- Alter value of sequence
ALTER SEQUENCE test_seq RESTART WITH 1

-- Rename sequence name 
ALTER SEQUENCE test_seq RENAME TO my_seq



CREATE SEQUENCE test_seq_2
INCREMENT 50
MAXVALUE 500
START WITH 50
CYCLE 

SELECT currval('test_seq_2')
SELECT nextval('test_seq_2')

-- add parameter or update parameter on existing sequence
ALTER SEQUENCE test_seq_2
MINVALUE 50

ALTER SEQUENCE test_seq_2
RESTART WITH 50


-- Delete a sequence 
DROP SEQUENCE my_seq





-- 

CREATE TABLE users(
	id INTEGER PRIMARY KEY,
	name VARCHAR(100) NOT NULL
)


CREATE SEQUENCE user_id_seq
START WITH 1
INCREMENT 2
MINVALUE 1
MAXVALUE 20
CYCLE 


ALTER TABLE users
ALTER COLUMN id 
SET DEFAULT nextval('user_id_seq')


INSERT INTO users
	(name)
VALUES
	('Akash'),
	('Lokesh'),
	('Aman')

SELECT * FROM users