-- Active: 1673873433403@@127.0.0.1@1521

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

SELECT * FROM users;

INSERT INTO users (id, email, password)
VALUES ("u001", "kemilly@gmail.com", "kemilly123"),
("u002", "cinara@gmail.com", "cinara123"),
("u003", "mariana@gmail.com", "mariana123");

DROP TABLE users;

CREATE TABLE products (
   id TEXT PRIMARY KEY UNIQUE NOT NULL,
   name TEXT NOT NULL,
   price REAL NOT NULL,
   category TEXT NOT NULL
);

SELECT * FROM products;

INSERT INTO products (id, name, price, category)
VALUES ("p001", "Coca-cola", 10, "Bebida"),
("p002", "Banana", 8, "Fruta"),
("p003", "Birinight", 10, "Bebida"),
("p004", "Arroz", 25, "Produto"),
("p005", "feijão", 10, "Produto" );

DROP TABLE products;

--Aprofundamento SQL

SELECT * FROM users;

SELECT * FROM products;

SELECT * FROM products
WHERE name = "Birinight";

INSERT INTO users (id, email, password)
VALUES ("u004", "newUser@gmail.com", "newUser123");

INSERT INTO products (id, name, price, category)
VALUES ("p006", "Picanha", 65, "Produto");

SELECT * FROM products
WHERE id = "p006";

SELECT * FROM users
WHERE id = "u002";

DELETE FROM users
WHERE id = "u001";

DELETE FROM products
WHERE id = "p006";

UPDATE users
SET 
     email = "matheus@gmail.com",
     password = "matheus123"

WHERE id = "u003";

UPDATE products
SET
     name = "Abacaxi",
     price = 5,
     category = "Fruta"

WHERE id = "p005";

SELECT * FROM users
ORDER BY email ASC;

SELECT * FROM products
ORDER BY price ASC
LIMIT 20 OFFSET 0;

SELECT * FROM products
WHERE
       price >= 300
       AND price <= 1000

ORDER BY price ASC;