// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Модель товара
const Product = mongoose.model('Product', new mongoose.Schema({
  category: String,
  subcategory: String,
  name: String,
  description: String,
  encryptedData: String,
  price: Number,
  stock: Number,
  images: [{
    name: String,
    url: String,
    size: Number,
    type: String
  }],
  sellerId: mongoose.Schema.Types.ObjectId,
  status: { type: String, default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}));

// Middleware для проверки аутентификации
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// API для добавления товара
app.post('/api/products', authenticateToken, async (req, res) => {
  try {
    // Добавляем sellerId из аутентифицированного пользователя
    const productData = {
      ...req.body,
      sellerId: req.user.userId
    };
    
    const product = new Product(productData);
    await product.save();
    
    res.status(201).json({
      id: product._id,
      message: 'Товар успешно добавлен'
    });
    
  } catch (error) {
    console.error('Ошибка при добавлении товара:', error);
    res.status(500).json({ error: 'Ошибка при добавлении товара' });
  }
});

// API для проверки аутентификации
app.get('/api/auth/check', authenticateToken, (req, res) => {
  // Если middleware authenticateToken не вернул ошибку, значит токен валиден
  res.json({ 
    userId: req.user.userId,
    name: req.user.name,
    avatar: req.user.avatar 
  });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

