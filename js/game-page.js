import { loadGames, escapeHTML, coverMarkup, formatDifficulty, showError } from "./data.js";
import { isInLibrary, toggleLibrary, markRecent } from "./library.js";

const root = document.querySelector("#game-detail");

try {
  const games = await loadGames();
  const id = new URLSearchParams(location.search).get("id");
  const game = games.find(item => item.id === id);

  if (!game) {
    root.innerHTML = `<section class="error-state"><div class="empty-icon">?</div><h1>Jogo não encontrado</h1><p>Esse jogo não existe ou não está publicado.</p><a class="button primary" href="explorar.html">Voltar para explorar</a></section>`;
  } else {
    markRecent(game.id);
    document.title = `Hub Edu — ${game.nome}`;
    render(game);
  }
} catch {
  showError(root);
}

function render(game) {
  const objectives = game.objetivos?.length
    ? `<section class="detail-section"><span class="eyebrow">Objetivos</span><h2>O que você vai praticar</h2><ul class="detail-list">${game.objetivos.map(item => `<li>${escapeHTML(item)}</li>`).join("")}</ul></section>` : "";

  root.innerHTML = `
    <a class="back-link" href="explorar.html">← Voltar para explorar</a>
    <article class="game-detail">
      <div class="detail-cover" style="background-image:url('${encodeURI(game.capa)}')">
        <span class="cover-subject">${escapeHTML(game.materia)}</span>
      </div>
      <div class="detail-content">
        <span class="subject-pill">${escapeHTML(game.materia)}</span>
        <h1>${escapeHTML(game.nome)}</h1>
        <p class="lead">${escapeHTML(game.descricao)}</p>
        <div class="detail-meta">
          <span>${formatDifficulty(game.dificuldade)}</span>
          <span>${game.duracaoMin} min</span>
          <span>${escapeHTML(game.autor)}</span>
        </div>
        <div class="detail-actions">
          <a class="button primary large" href="${escapeHTML(game.url)}" target="_blank" rel="noopener noreferrer">Jogar ↗</a>
          <button class="button secondary large" id="save-button" type="button"></button>
        </div>
        <p class="external-note">O jogo será aberto em uma nova aba.</p>
      </div>
    </article>

    <section class="detail-section">
      <span class="eyebrow">Sobre o jogo</span>
      <h2>Conteúdos</h2>
      <div class="tag-list">${(game.conteudo || []).map(item => `<span>${escapeHTML(item)}</span>`).join("")}</div>
    </section>
    ${objectives}
  `;

  const button = document.querySelector("#save-button");
  const update = () => {
    const saved = isInLibrary(game.id);
    button.textContent = saved ? "✓ Na biblioteca" : "+ Adicionar à biblioteca";
    button.classList.toggle("saved", saved);
  };
  update();
  button.addEventListener("click", () => {
    toggleLibrary(game.id);
    update();
  });
}
