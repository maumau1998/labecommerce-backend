-- Active: 1673873433403@@127.0.0.1@1521

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

SELECT * FROM users;

INSERT INTO users (id, name, email, password)
VALUES ("u001", "Kemilly", "kemilly@gmail.com", "kemilly123"),
("u002", "Cinara", "cinara@gmail.com", "cinara123"),
("u003", "Mariana", "mariana@gmail.com", "mariana123");

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