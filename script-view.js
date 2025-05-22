document.addEventListener('DOMContentLoaded', async function() {
  const productId = window.location.pathname.split('/').pop(); // Извлекаем ID товара из URL

  const response = await fetch(`/api/products/${productId}`);
  const product = await response.json();

  document.getElementById('product-name').innerText = product.name;
  document.getElementById('product-description').innerText = product.description;
  document.getElementById('product-price').innerText = product.price;
  document.getElementById('product-seller').innerText = product.sellerName;
  document.getElementById('product-reviews').innerText = product.reviews; // Если есть отзывы

  // Реализация кнопки покупки
  document.getElementById('buy-button').addEventListener('click', function() {
      // Логика покупки
      alert('Вы купили товар!');
  });
});
