// Ambil semua tombol "Tambahkan ke Keranjang"
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Simpan data keranjang di localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fungsi untuk menambahkan item ke keranjang
function addToCart(name, price) {
    // Periksa apakah produk sudah ada di keranjang
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        // Jika produk sudah ada, tambahkan jumlahnya
        existingItem.quantity += 1;
    } else {
        // Jika produk belum ada, tambahkan produk baru
        cart.push({ name, price, quantity: 1 });
    }

    // Simpan kembali ke localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Tampilkan notifikasi
    alert(`${name} berhasil ditambahkan ke keranjang!`);
}

// Tambahkan event listener ke setiap tombol
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'), 10);
        addToCart(name, price);
    });
});


// Ambil data keranjang dari localStorage
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

const cartTable = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

// Fungsi untuk memperbarui tampilan keranjang
function renderCart() {
    cartTable.innerHTML = '';
    let totalPrice = 0;

    if (cartItems.length === 0) {
        cartTable.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center;">Keranjang belanja Anda kosong.</td>
            </tr>
        `;
        totalPriceElement.textContent = '';
        return;
    }

    cartItems.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>Rp ${item.price.toLocaleString()}</td>
            <td>${item.quantity}</td>
            <td>Rp ${(item.price * item.quantity).toLocaleString()}</td>
            <td><button class="delete-button" data-index="${index}">Hapus</button></td>
        `;
        cartTable.appendChild(row);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Total Harga: Rp ${totalPrice.toLocaleString()}`;
}

// Fungsi untuk menghapus item dari keranjang
function deleteItem(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    renderCart();
}

// Tambahkan event listener untuk tombol hapus
cartTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-button')) {
        const index = e.target.getAttribute('data-index');
        deleteItem(index);
    }
});

// Render keranjang saat halaman dimuat
renderCart();





