// Mostrar Nome do Usuário Logado
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    const userEmail = user.email;
    const userName = userEmail.substring(0, userEmail.indexOf("@"));
    const userNameElement = document.getElementById("user-name");
    userNameElement.textContent = userName;
  } else {
    // Redirecionar para a página de login se o usuário não estiver autenticado
    window.location.href = "/index.html";
  }
});
//============================

//===================
// Deslogar Usuário
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", () => {
  auth
    .signOut()
    .then(() => {
      // Usuário deslogado com sucesso
      window.location.href = "/index.html"; // Redireciona para a página de login
    })
    .catch((error) => {
      // Erro ao fazer logout
      console.error("Erro ao deslogar:", error);
    });
});
//===================
