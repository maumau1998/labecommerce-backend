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
VALUES ("p001", "Coca-cola", 11, "Bebida"),
("p002", "Banana", 8, "Fruta"),
("p003", "Birinight", 12, "Bebida"),
("p004", "Arroz", 25, "Produto"),
("p005", "feijão", 13, "Produto" );

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

-- Relações SQL I

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL UNIQUE NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

DROP Table purchases;

INSERT INTO purchases (id, total_price, paid, buyer_id)
VALUES ("p001", 11, 0, "u001"),
  ("p002", 8, 0, "u001" ),
  ("p003", 12, 0, "u002"),
  ("p004", 25, 0, "u002" ),
  ("p005", 13, 0, "u003");

SELECT * FROM purchases;

UPDATE purchases
SET paid = 1,
    delivered_at = DATETIME("now")
WHERE id = "p001";

SELECT * FROM users
INNER JOIN purchases
ON purchases.buyer_id = users.id;

-- Relações SQL II

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
 ("pu05", "p005", 1),
 ("pu05", "p001", 1),
 ("pu06", "p002", 1);

 SELECT * FROM purchases_products;

SELECT purchases.id AS purchasesId,
products.id AS productsId,
products.name,
purchases_products.quantity
FROM purchases_products
INNER JOIN purchases 
ON purchases_products.purchase_id = purchasesId
INNER JOIN products
ON purchases_products.product_id = productsId;
