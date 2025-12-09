// 1. وظيفة لجلب سلة التسوق الحالية من localStorage
function getCart() {
    // يحاول جلب السلة، وإذا لم يجدها، يعيد مصفوفة فارغة
    const cart = localStorage.getItem('parafleure_cart');
    return cart ? JSON.parse(cart) : [];
}

// 2. وظيفة لحفظ سلة التسوق إلى localStorage
function saveCart(cart) {
    localStorage.setItem('parafleure_cart', JSON.stringify(cart));
}

// 3. وظيفة لإضافة منتج إلى السلة
function addItemToCart(name, price) {
    const cart = getCart();
    
    // تحويل السعر إلى رقم
    const itemPrice = parseFloat(price);

    // إضافة المنتج الجديد
    cart.push({ name: name, price: itemPrice });

    // حفظ السلة المحدثة
    saveCart(cart);

    alert(`${name} a été ajouté au panier !`);
    
    // تحديث رابط "Panier" في قائمة التنقل (اختياري)
    updateCartLinkTotal();
}

// 4. وظيفة لربط الأزرار عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    // تحديد كل أزرار "Ajouter au panier"
    const addButtons = document.querySelectorAll('.add-to-cart-btn');

    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            // جلب بيانات المنتج من خاصيات data-
            const name = button.getAttribute('data-name');
            const price = button.getAttribute('data-price');
            
            // استدعاء وظيفة الإضافة
            addItemToCart(name, price);
        });
    });
    
    // تحديث المجموع الظاهر في رابط "Panier"
    updateCartLinkTotal();
});

// 5. وظيفة لحساب المجموع الكلي (للاستخدام في أي صفحة)
function calculateTotal(cart) {
    return cart.reduce((total, item) => total + item.price, 0);
}

// 6. وظيفة تحديث المجموع في رابط "Panier" (في قائمة التنقل)
function updateCartLinkTotal() {
    const cart = getCart();
    const total = calculateTotal(cart);
    
    // ابحث عن رابط السلة (Panier) في قائمة التنقل
    const panierLink = document.querySelector('a[href="panier.html"]');

    if (panierLink) {
        // تحديث النص ليعرض المجموع الحالي
        panierLink.textContent = `Panier (${total.toFixed(2)} TND)`;
    }
}
