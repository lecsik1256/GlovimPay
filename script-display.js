// script-display.js

// Пример данных о товарах
const products = [
    {
      id: 1,
      title: 'Аккаунт CS:GO 1',
      description: 'Описание аккаунта CS:GO 1',
      price: '1000₽',
      imageUrl: 'path/to/image1.jpg'
    },
    {
      id: 2,
      title: 'Аккаунт CS:GO 2',
      description: 'Описание аккаунта CS:GO 2',
      price: '1500₽',
      imageUrl: 'path/to/image2.jpg'
    }
    // Добавьте остальные товары
  ];
  
  // Функция для создания карточки товара
  function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');
  
    const img = document.createElement('img');
    img.src = product.imageUrl;
    img.alt = product.title;
    card.appendChild(img);
  
    const info = document.createElement('div');
    info.classList.add('product-info');
  
    const title = document.createElement('h2');
    title.textContent = product.title;
    info.appendChild(title);
  
    const description = document.createElement('p');
    description.textContent = product.description;
    info.appendChild(description);
  
    const price = document.createElement('div');
    price.classList.add('price');
    price.textContent = `Цена: ${product.price}`;
    info.appendChild(price);
  
    const button = document.createElement('button');
    button.class
    ::contentReference[oaicite:0]{index=0}
  