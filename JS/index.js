//===================================
// Script para o formulário de login
//===================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Seleciona o formulário de login
const loginForm = document.getElementById("login-form");
const userEmailInput = document.getElementById("user");
const passwordInput = document.getElementById("password");

// Adiciona evento de submit ao formulário
loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita o envio padrão do formulário
  const email = userEmailInput.value.trim();
  const password = passwordInput.value.trim();

  // Validação básica dos campos
  if (!email || !password) {
    Swal.fire({
      icon: "error",
      title: "Campos obrigatórios",
      text: "Por favor, preencha todos os campos.",
    });
    return;
  }

  // Tenta fazer login com Firebase
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Login bem-sucedido
      const user = userCredential.user;
      Swal.fire({
        icon: "success",
        title: "Login bem-sucedido",
        text: `Bem-vindo, ${user.email}!`,
      }).then(() => {
        // Redireciona para a página principal ou dashboard
        window.location.href = "/pages/dashboard.html"; // Altere para a página desejada
      });
    })
    .catch((error) => {
      // Erro no login
      Swal.fire({
        icon: "error",
        title: "Erro no login",
        text: error.message,
      });
      console.error("Erro no login:", error);
    });
  loginForm.reset(); // Limpa os campos do formulário após a tentativa de login'
});
