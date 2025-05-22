// db.js
const mysql = require('mysql2');

// Создаём соединение
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',      // Ваш пароль
  database: 'myshop' // Имя БД
});

// Подключаемся
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

module.exports = connection;
