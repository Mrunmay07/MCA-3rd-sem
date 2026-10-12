CREATE TABLE persons(
	person_id SERIAL PRIMARY KEY,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(50) NOT NULL
)

SELECT * FROM persons

-- Add columns in existing table
ALTER TABLE persons
ADD COLUMN age INT NOT NULL;

-- Add multiple columns in existing table
ALTER TABLE persons
ADD COLUMN email VARCHAR(50) UNIQUE,
ADD COLUMN nationality VARCHAR(50) NOT NULL


-- Rename Table
ALTER TABLE users
RENAME TO persons

-- Rename Column
ALTER TABLE persons
RENAME COLUMN age TO age_certificate

SELECT * FROM persons


-- Drop a column 
ALTER TABLE persons
DROP COLUMN nationality

-- Change data type of column
ALTER TABLE persons
ALTER COLUMN age_certificate TYPE VARCHAR(20)

-- Add constraint in a existing column 
ALTER TABLE persons 
ADD COLUMN erp VARCHAR(50)


SELECT * FROM persons

ALTER TABLE persons
ADD CONSTRAINT erp_unique UNIQUE (erp)


ALTER TABLE persons
ADD COLUMN is_enable VARCHAR(5)

SELECT * FROM persons

ALTER TABLE persons 
ALTER COLUMN is_enable SET DEFAULT 'Y'