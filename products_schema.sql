DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    item_id INT(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(31) NOT NULL,
    department_name VARCHAR(31) NOT NULL,
    price DECIMAL(8,2),
    stock_quantity INT(10),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Water Bottle', 'Sports & Outdoors', 34.99, 47);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Galaxy Watch', 'Sports & Outdoors', 296.81, 13);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Long Sleeve Shirt', 'Shirts', 37.97, 86);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Protein Powder', 'Meal Replacement', 19.33, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Slim Wallet', 'Wallets', 9.99, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Sharpie Marker', 'Office Supplies', 6.41, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Office Chair', 'Office Supplies', 349.00, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Toilet Paper', 'Home Supplies', 23.99, 47);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Nautica T-Shirt', 'Shirts', 24.99, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Dawn Dish Detergent', 'Home Supplies', 6.99, 19);