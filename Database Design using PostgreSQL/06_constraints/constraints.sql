CREATE TABLE t_products(
	product_id INT PRIMARY KEY,
	product_name VARCHAR(50) NOT NULL,
	supplier_id INT NOT NULL
)

CREATE TABLE t_suppliers(
	supplier_id INT PRIMARY KEY,
	supplier_name VARCHAR(100) NOT NULL
)

INSERT INTO t_products
	(product_id , product_name , supplier_id)
VALUES
	(1 , 'PENCIL' , 1),
	(2 , 'PEN' , 1),
	(3 , 'KEYBOARD' , 2)

INSERT INTO t_suppliers
	(supplier_id , supplier_name)
VALUES
	(1 , 'Supplier 1'),
	(2 , 'Supplier 2')

SELECT * FROM t_products
SELECT * FROM t_suppliers


INSERT INTO t_products
	(product_id , product_name , supplier_id)
VALUES
	(4 , 'MOUSE' , 100)



-- Foreign key 
DROP TABLE t_products


CREATE TABLE t_products(
	product_id INT PRIMARY KEY,
	product_name VARCHAR(50) NOT NULL,
	supplier_id INT REFERENCES t_suppliers (supplier_id)
)


INSERT INTO t_products
	(product_id , product_name , supplier_id)
VALUES
	(1 , 'PENCIL' , 1),
	(2 , 'PEN' , 1),
	(3 , 'KEYBOARD' , 2)


INSERT INTO t_products
	(product_id , product_name , supplier_id)
VALUES
	(4 , 'MOUSE' , 100)


-- Drop a constraint
ALTER TABLE t_products
DROP CONSTRAINT t_products_supplier_id_fkey;


