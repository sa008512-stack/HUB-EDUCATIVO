import { loadGames, cardMarkup, showError, escapeHTML, formatDifficulty } from "./data.js";
import { bindLibraryButtons, getRecent } from "./library.js";

const hero = document.querySelector("#hero");
const featured = document.querySelector("#featured-grid");
const recentSection = document.querySelector("#recent-section");
const recentGrid = document.querySelector("#recent-grid");
const subjectGrid = document.querySelector("#subject-grid");

try {
  const games = await loadGames();
  renderHero(games[0]);
  featured.innerHTML = games.map(cardMarkup).join("");
  bindLibraryButtons(featured);

  const recent = getRecent().map(id => games.find(game => game.id === id)).filter(Boolean);
  if (recent.length) {
    recentSection.hidden = false;
    recentGrid.innerHTML = recent.slice(0, 3).map(cardMarkup).join("");
    bindLibraryButtons(recentGrid);
  }

  const subjects = [...new Set(games.map(game => game.materia))];
  subjectGrid.innerHTML = subjects.map((subject, i) => `
    <a class="subject-card subject-${(i % 4) + 1}" href="pages/explorar.html?materia=${encodeURIComponent(subject)}">
      <span>${escapeHTML(subject)}</span><b>→</b>
    </a>`).join("");
} catch (error) {
  showError(featured);
}

function renderHero(game) {
  if (!game) return;
  hero.innerHTML = `
    <div class="hero-copy">
      <span class="eyebrow">Jogo em destaque · ${escapeHTML(game.materia)}</span>
      <h1>${escapeHTML(game.nome)}</h1>
      <p>${escapeHTML(game.descricao)}</p>
      <div class="hero-meta"><span>${formatDifficulty(game.dificuldade)}</span><span>${game.duracaoMin} min</span></div>
      <div class="hero-actions">
        <a class="button primary" href="pages/jogo.html?id=${encodeURIComponent(game.id)}">Ver jogo</a>
        <a class="button ghost" href="pages/explorar.html">Explorar catálogo</a>
      </div>
    </div>
    <a class="hero-art" href="pages/jogo.html?id=${encodeURIComponent(game.id)}" style="background-image:url('${encodeURI(game.capa)}')" aria-label="Abrir ${escapeHTML(game.nome)}"></a>`;
}
