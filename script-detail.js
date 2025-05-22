window.onload = function() {
    // Читаем выбранный товар из localStorage
    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    
    if (!product) {
      // Если вдруг нет товара, можно вывести сообщение или редирект
      document.getElementById('productDetail').innerHTML = '<p>Товар не найден.</p>';
      return;
    }
  
    // Заполняем поля
    document.getElementById('detailTitle').innerText = product.title;
    document.getElementById('detailDescription').innerText = product.description;
    document.getElementById('detailCategory').innerText = 'Категория: ' + product.category;
    document.getElementById('detailPrice').innerText = product.price + ' ₽';
  };

  
  