// Получаем ID из URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Загружаем товары из localStorage
let products = JSON.parse(localStorage.getItem("products")) || [];

// Преобразуем ID в число (если нужно)
const product = products.find(p => p.id == productId);

if (product) {
  document.getElementById("product-title").textContent = product.name;
  document.getElementById("product-description").textContent = product.description;
  document.getElementById("product-category").textContent = product.category;
  document.getElementById("product-stock").textContent = product.stock;
  document.getElementById("product-price").textContent = product.price + " ₽";
  document.getElementById("seller-name").textContent = product.sellerName;
  document.getElementById("contact-seller").href = product.sellerContact;
} else {
  document.body.innerHTML = "<h1>Товар не найден!</h1><a href='index.html'>Назад</a>";
}
