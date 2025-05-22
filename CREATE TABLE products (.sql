CREATE DATABASE glovimplaye;

USE glovimplaye;

CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category VARCHAR(50),
  subcategory VARCHAR(50),
  productName VARCHAR(100),
  description TEXT,
  sellerName VARCHAR(50),
  price DECIMAL(10, 2),
  stock INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
