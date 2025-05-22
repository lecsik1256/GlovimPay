document.getElementById('addProductForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;

    const productData = { title, price, description };

    try {
        const response = await fetch("http://localhost:5000/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById('message').innerHTML = "Товар успешно добавлен!";
            document.getElementById('addProductForm').reset();
        } else {
            document.getElementById('message').innerHTML = "Ошибка при добавлении товара: " + result.error;
        }
    } catch (error) {
        document.getElementById('message').innerHTML = "Ошибка при отправке данных на сервер";
    }
});