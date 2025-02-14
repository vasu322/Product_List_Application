// to create a closure and encapsulate the product data
const ProductApp = (function() {
    // Private product data
    let products = [
        {"code":382,"name":"Laptop","category":"Electronics","price":"$712.44","promotion":"BOGO","date_of_manufacture":"2023-05-07","date_of_purchase":"2024-09-23"},

        {"code":843,"name":"Phone","category":"Electronics","price":"$352.08","promotion":"3-FOR-2","date_of_manufacture":"2023-09-24","date_of_purchase":"2024-01-12"},

        {"code":367,"name":"T-Shirt","category":"Clothing","price":"$23.53","promotion":"4-FOR-2","date_of_manufacture":"2023-03-14","date_of_purchase":"2024-11-17"},
        
        {"code":720,"name":"Jeans","category":"Clothing","price":"$89.42","promotion":"BOGO","date_of_manufacture":"2022-11-07","date_of_purchase":"2023-12-25"},
        
        {"code":189,"name":"Novel","category":"Books","price":"$42.31","promotion":"3-FOR-2","date_of_manufacture":"2023-08-19","date_of_purchase":"2024-06-02"},
        
        {"code":514,"name":"Headphones","category":"Electronics","price":"$178.39","promotion":"4-FOR-2","date_of_manufacture":"2022-06-17","date_of_purchase":"2023-03-08"},
        
        {"code":927,"name":"Laptop","category":"Electronics","price":"$956.72","promotion":"BOGO","date_of_manufacture":"2022-12-03","date_of_purchase":"2024-07-19"},
        
        {"code":651,"name":"Phone","category":"Electronics","price":"$487.16","promotion":"3-FOR-2","date_of_manufacture":"2023-02-28","date_of_purchase":"2023-09-14"},
        
        {"code":295,"name":"T-Shirt","category":"Clothing","price":"$31.87","promotion":"4-FOR-2","date_of_manufacture":"2022-09-11","date_of_purchase":"2024-04-30"},
        
        {"code":836,"name":"Jeans","category":"Clothing","price":"$76.59","promotion":"BOGO","date_of_manufacture":"2023-07-25","date_of_purchase":"2024-02-08"}
    ];

    // Private methods
    const renderProducts = (productList) => {
        const tableBody = document.getElementById('productList');
        tableBody.innerHTML = '';
        productList.forEach(product => {
            const row = `<tr>
                <td>${product.code}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.price}</td>
                <td>${product.promotion}</td>
                <td>${product.date_of_manufacture}</td>
                <td>${product.date_of_purchase}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    };

    const filterProducts = () => {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const category = document.getElementById('categoryFilter').value;
        const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
        const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;

        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm);
            const matchesCategory = category === '' || product.category === category;
            const price = parseFloat(product.price.replace('$', ''));
            const matchesPrice = price >= minPrice && price <= maxPrice;
            return matchesSearch && matchesCategory && matchesPrice;
        });
    };

    // Public methods
    return {
        init: function() {
            renderProducts(products);
            this.setupEventListeners();
        },

        setupEventListeners: function() {
            document.getElementById('searchInput').addEventListener('input', () => {
                renderProducts(filterProducts());
            });

            document.getElementById('applyFilters').addEventListener('click', () => {
                renderProducts(filterProducts());
            });

            document.getElementById('resetFilters').addEventListener('click', () => {
                document.getElementById('searchInput').value = '';
                document.getElementById('categoryFilter').value = '';
                document.getElementById('minPrice').value = '';
                document.getElementById('maxPrice').value = '';
                renderProducts(products);
            });

            document.getElementById('mapProducts').addEventListener('click', () => {
                const mappedProducts = products.map(product => ({
                    name: product.name,
                    price: product.price
                }));
                const mappedList = mappedProducts.map(product => 
                    `<p>${product.name}: ${product.price}</p>`
                ).join('');
                document.getElementById('mappedProducts').innerHTML = mappedList;
            });

            document.getElementById('calculateTotal').addEventListener('click', () => {
                const total = products.reduce((sum, product) => {
                    return sum + parseFloat(product.price.replace('$', ''));
                }, 0);
                document.getElementById('totalCost').textContent = `Total Cost: $${total.toFixed(2)}`;
            });
        }
    };
})();

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    ProductApp.init();
});