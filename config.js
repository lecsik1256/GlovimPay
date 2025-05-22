const admin = require('firebase-admin');

const serviceAccount = require('./path-to-your-service-account-file.json'); // Скачайте файл сервисного аккаунта из Firebase.

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-database-name.firebaseio.com" // URL вашей базы данных.
});

module.exports = admin;
