//============================
// Cadastro de Usuário - JavaScript

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
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

// Seleciona o formulário de cadastro
const cadastroForm = document.getElementById("cadastro-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

// Adiciona evento de submit ao formulário
cadastroForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita o envio padrão do formulário
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();
  // Validação básica dos campos
  if (!email || !password || !confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Campos obrigatórios",
      text: "Por favor, preencha todos os campos.",
    });
    return;
  }

  if (password !== confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Senhas não coincidem",
      text: "As senhas digitadas não coincidem.",
    });
    return;
  }
  // Tenta criar um novo usuário com Firebase
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Cadastro bem-sucedido
      const user = userCredential.user;
      Swal.fire({
        icon: "success",
        title: "Cadastro bem-sucedido",
        text: `Bem-vindo, ${user.email}!`,
      }).then(() => {
        // Redireciona para a página de login após o cadastro
        window.location.href = "index.html";
      });
    })
    .catch((error) => {
      // Lida com erros de cadastro
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire({
        icon: "error",
        title: "Erro de cadastro",
        text: errorMessage,
      });
    });
});
//============================
