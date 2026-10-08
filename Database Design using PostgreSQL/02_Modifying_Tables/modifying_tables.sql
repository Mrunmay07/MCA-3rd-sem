CREATE TABLE customers(
	customer_id SERIAL PRIMARY KEY,
	name VARCHAR(100),
	age INT
)


INSERT INTO customers
	(name , age)
VALUES 
	('Lokesh' , 24)
RETURNING *;

SELECT * FROM customers


UPDATE customers
SET name='Ansh'
WHERE customer_id = 3


DELETE FROM customers
WHERE customer_id = 




-- Upserts 
CREATE TABLE tags(
	id SERIAL PRIMARY KEY,
	tag TEXT UNIQUE,
	update_date TIMESTAMP DEFAULT NOW()
)


INSERT INTO tags
	(tag)
VALUES 
	('Ansh'),
	('Lokesh')


INSERT INTO tags
	(tag)
VALUES 
	('Ansh')
ON CONFLICT (tag)
DO 
	UPDATE SET 
	tag = EXCLUDED.tag,
	update_date = NOW()

	