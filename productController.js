const Product = require('../models/product');

// Получить все товары
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении товаров' });
  }
};

// Добавить товар
exports.addProduct = async (req, res) => {
  const { name, description, category, subcategory, price, quantity, sellerId, sellerName } = req.body;
  try {
    const newProduct = new Product({
      name,
      description,
      category,
      subcategory,
      price,
      quantity,
      sellerId,
      sellerName
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при добавлении товара' });
  }
};
