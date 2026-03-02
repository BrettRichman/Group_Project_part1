// products.js

let products = [];

// Load JSON from file or localStorage
function loadProducts() {
    if (!localStorage.getItem('products')) {
        fetch('products.json')
            .then(response => response.json())
            .then(data => {
                products = data.products;
                localStorage.setItem('products', JSON.stringify(products));
                displayProducts();
            });
    } else {
        products = JSON.parse(localStorage.getItem('products'));
        displayProducts();
    }
}

// Display products in table
function displayProducts() {
    const tbody = document.querySelector('#productTable tbody');
    tbody.innerHTML = '';
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.itemId}</td>
            <td>${product.description}</td>
            <td>${product.category}</td>
            <td>${product.format}</td>
            <td>${product.price}</td>
            <td>${product.additional || ''}</td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="editProduct('${product.itemId}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct('${product.itemId}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Add or Update product
function addOrUpdateProduct(event) {
    event.preventDefault();
    const itemId = document.getElementById('itemId').value.trim();
    const description = document.getElementById('description').value.trim();
    const category = document.getElementById('category').value.trim();
    const format = document.getElementById('format').value.trim();
    const price = document.getElementById('price').value.trim();
    const additional = document.getElementById('additional').value.trim();

    if (!itemId || !description || !category || !format || !price) {
        alert("Please fill in all required fields.");
        return;
    }

    const existing = products.find(p => p.itemId === itemId);
    if (existing) {
        // Update
        existing.description = description;
        existing.category = category;
        existing.format = format;
        existing.price = price;
        existing.additional = additional;
        alert("Product updated!");
    } else {
        // Add new
        products.push({ itemId, description, category, format, price, additional });
        alert("Product added!");
    }

    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
    document.getElementById('productForm').reset();
}

// Edit product - populate form for editing
function editProduct(itemId) {
    const product = products.find(p => p.itemId === itemId);
    if (!product) return;
    document.getElementById('itemId').value = product.itemId;
    document.getElementById('description').value = product.description;
    document.getElementById('category').value = product.category;
    document.getElementById('format').value = product.format;
    document.getElementById('price').value = product.price;
    document.getElementById('additional').value = product.additional || '';
}

// Delete product
function deleteProduct(itemId) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    products = products.filter(p => p.itemId !== itemId);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}

// Search/filter with jQuery
$('#searchInput').on('keyup', function() {
    const value = $(this).val().toLowerCase();
    $('#productTable tbody tr').filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
});
