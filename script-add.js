document.getElementById('add-product-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;
  const subcategory = document.getElementById('subcategory').value;
  const price = document.getElementById('price').value;
  const quantity = document.getElementById('quantity').value;

  const product = { name, description, category, subcategory, price, quantity };

  // Отправка данных товара на сервер
  const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
  });

  const result = await response.json();
  if (result._id) {
      alert('Товар успешно добавлен!');
  } else {
      alert('Ошибка при добавлении товара');
  }
});
