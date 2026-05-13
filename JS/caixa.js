import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const productListContainer = document.getElementById("product-list-container");
const cartItemsContainer = document.getElementById("cart-items-container");
const totalPriceElement = document.getElementById("total-price");
const btnFinishSale = document.getElementById("btn-finish-sale");

let cart = [];

// Simulação de produtos (Substitua por uma busca real no Firestore futuramente)
const mockProducts = [
  { id: "1", nome: "Ração Cão Adulto 15kg", preco: 155.0 },
  { id: "2", nome: "Ração Gato Castrado 1kg", preco: 38.5 },
  { id: "3", nome: "Sachê Pedigree Frango", preco: 4.5 },
  { id: "4", nome: "Coleira Anti-pulgas", preco: 89.9 },
  { id: "5", nome: "Brinquedo Osso de Borracha", preco: 15.0 },
  { id: "6", nome: "Shampoo Pet 500ml", preco: 25.0 },
];

// Função para renderizar produtos na tela
function renderProducts(products) {
  productListContainer.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
            <h4>${product.nome}</h4>
            <p style="color: var(--primary-color); font-weight: bold;">R$ ${product.preco.toFixed(2)}</p>
        `;
    card.onclick = () => addToCart(product);
    productListContainer.appendChild(card);
  });
}

// Função para adicionar item ao carrinho
function addToCart(product) {
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
}

// Atualiza a interface do carrinho e o total
function updateCartUI() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.preco * item.quantity;
    const itemDiv = document.createElement("div");
    itemDiv.style.display = "flex";
    itemDiv.style.justifyContent = "space-between";
    itemDiv.style.padding = "10px 0";
    itemDiv.style.borderBottom = "1px solid #eee";
    itemDiv.innerHTML = `
            <span>${item.nome} (x${item.quantity})</span>
            <strong>R$ ${(item.preco * item.quantity).toFixed(2)}</strong>
        `;
    cartItemsContainer.appendChild(itemDiv);
  });

  totalPriceElement.textContent = `R$ ${total.toFixed(2)}`;
}

btnFinishSale.onclick = () => {
  if (cart.length === 0)
    return Swal.fire("Aviso", "O carrinho está vazio!", "warning");
  Swal.fire("Sucesso!", "Venda finalizada com sucesso.", "success");
  cart = [];
  updateCartUI();
};

renderProducts(mockProducts);
updateCartUI();
//============================
