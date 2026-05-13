// Atualiza o relógio
function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("pt-BR");
  const dateStr = now.toLocaleDateString("pt-BR");
  document.getElementById("current-time").innerText = `${dateStr} | ${timeStr}`;
}
setInterval(updateClock, 1000);
updateClock();

// Atalhos de teclado (Exemplo)
window.addEventListener("keydown", (e) => {
  if (e.key === "F1") alert("Opção Dinheiro selecionada");
  if (e.key === "F2") alert("Opção Cartão selecionada");
  if (e.key === "F3") alert("Opção Pix selecionada");
  if (e.key === "F4") alert("Opção Pesquisar selecionada");
  if (e.key === "F5") alert("Opção Quantidade selecionada");
  if (e.key === "F8") alert("Opção Fechar Venda selecionada");
  if (e.key === "F9") alert("Opção Desconto selecionada");
  escapeDashboard(e);
});

function escapeDashboard(e) {
  if (e.key === "Escape") window.location.href = "/pages/dashboard.html";
}
