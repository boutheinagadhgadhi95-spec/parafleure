// fetch produits depuis products.json
fetch('data/products.json')
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById('products-container');
    if(!container) return;

    products.forEach(p => {
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>Prix : ${p.price} TND</p>
        <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Ajouter au panier</button>
      `;
      container.appendChild(div);
    });
  });

// Panier
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id, name, price){
  cart.push({id,name,price});
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(name + " ajouté au panier !");
  displayCart();
}

// Afficher panier
function displayCart(){
  const container = document.getElementById('cart-container');
  if(!container) return;
  container.innerHTML = "";
  let total = 0;
  cart.forEach((item,index)=>{
    total += item.price;
    const div = document.createElement('div');
    div.innerHTML = `${item.name} - ${item.price} TND <button onclick="removeFromCart(${index})">Supprimer</button>`;
    container.appendChild(div);
  });
  const totalDiv = document.createElement('div');
  totalDiv.innerHTML = `<strong>Total: ${total} TND</strong>`;
  container.appendChild(totalDiv);
}

// Supprimer produit du panier
function removeFromCart(index){
  cart.splice(index,1);
  localStorage.setItem('cart',JSON.stringify(cart));
  displayCart();
}

// Affichage automatique si page panier
window.onload = displayCart;
