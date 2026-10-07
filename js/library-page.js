import { loadGames, cardMarkup, showError } from "./data.js";
import { bindLibraryButtons, getLibrary } from "./library.js";

const grid = document.querySelector("#library-grid");
const empty = document.querySelector("#library-empty");
const search = document.querySelector("#library-search");

let games = [];

try {
  games = await loadGames();
  render();
} catch {
  showError(grid);
  empty.hidden = true;
}

function render() {
  const ids = getLibrary();
  const term = search.value.trim().toLowerCase();
  const saved = ids.map(id => games.find(game => game.id === id)).filter(Boolean);
  const results = saved.filter(game => `${game.nome} ${game.materia} ${game.descricao}`.toLowerCase().includes(term));

  grid.innerHTML = results.map(cardMarkup).join("");
  grid.hidden = results.length === 0;
  empty.hidden = ids.length !== 0;
  if (ids.length !== 0 && results.length === 0) {
    empty.hidden = false;
    empty.innerHTML = `<div class="empty-icon">⌕</div><h2>Nenhum resultado</h2><p>Não encontramos esse jogo na sua biblioteca.</p>`;
  }
  bindLibraryButtons(grid);
}

search.addEventListener("input", render);
window.addEventListener("librarychange", render);
