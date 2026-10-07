export async function loadGames() {
  const response = await fetch(getDataPath());
  if (!response.ok) throw new Error("Falha ao carregar catálogo");
  const data = await response.json();
  return (data.games || []).filter(game => game.status === "publicado");
}

export function getDataPath() {
  return window.location.pathname.includes("/pages/") ? "../data/games.json" : "data/games.json";
}

export function gamePath(id) {
  return `jogo.html?id=${encodeURIComponent(id)}`;
}

export function homeGamePath(id) {
  return `pages/jogo.html?id=${encodeURIComponent(id)}`;
}

export function formatDifficulty(value) {
  return { facil: "Fácil", medio: "Médio", dificil: "Difícil" }[value] || value;
}

export function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}

export function coverMarkup(game, compact = false) {
  return `<div class="game-cover ${compact ? "compact" : ""}" style="background-image:url('${encodeURI(game.capa)}')">
    <span class="cover-subject">${escapeHTML(game.materia)}</span>
  </div>`;
}

export function cardMarkup(game) {
  return `<article class="game-card">
    <a class="card-cover-link" href="${homeGamePath(game.id)}" aria-label="Abrir ${escapeHTML(game.nome)}">
      ${coverMarkup(game)}
    </a>
    <div class="card-body">
      <span class="subject-pill">${escapeHTML(game.materia)}</span>
      <h3><a href="${homeGamePath(game.id)}">${escapeHTML(game.nome)}</a></h3>
      <p>${escapeHTML(game.descricao)}</p>
      <div class="card-meta"><span>${formatDifficulty(game.dificuldade)}</span><span>${game.duracaoMin} min</span></div>
      <button class="library-toggle" data-library-toggle="${escapeHTML(game.id)}" type="button"></button>
    </div>
  </article>`;
}

export function showError(container, message = "Não foi possível carregar o catálogo.") {
  container.innerHTML = `<section class="error-state"><div class="empty-icon">!</div><h2>Algo deu errado</h2><p>${escapeHTML(message)}</p><button class="button secondary" onclick="location.reload()">Tentar novamente</button></section>`;
}
