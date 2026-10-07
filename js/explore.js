import { loadGames, cardMarkup, showError } from "./data.js";
import { bindLibraryButtons } from "./library.js";

const grid = document.querySelector("#catalog-grid");
const empty = document.querySelector("#empty-state");
const count = document.querySelector("#results-count");
const search = document.querySelector("#search-input");
const subject = document.querySelector("#subject-filter");
const difficulty = document.querySelector("#difficulty-filter");
const clear = document.querySelector("#clear-filters");

let games = [];

try {
  games = await loadGames();
  [...new Set(games.map(game => game.materia))].sort().forEach(value => {
    subject.insertAdjacentHTML("beforeend", `<option value="${escapeAttr(value)}">${value}</option>`);
  });

  const params = new URLSearchParams(location.search);
  const initialSubject = params.get("materia");
  if (initialSubject && [...subject.options].some(option => option.value === initialSubject)) {
    subject.value = initialSubject;
  }
  render();
} catch {
  showError(grid);
}

function render() {
  const term = search.value.trim().toLowerCase();
  const selectedSubject = subject.value;
  const selectedDifficulty = difficulty.value;

  const results = games.filter(game => {
    const searchable = [
      game.nome, game.descricao, game.materia, ...(game.conteudo || []), ...(game.tags || [])
    ].join(" ").toLowerCase();
    return (!term || searchable.includes(term))
      && (!selectedSubject || game.materia === selectedSubject)
      && (!selectedDifficulty || game.dificuldade === selectedDifficulty);
  });

  count.textContent = `${results.length} ${results.length === 1 ? "jogo" : "jogos"}`;
  grid.innerHTML = results.map(cardMarkup).join("");
  empty.hidden = results.length !== 0;
  grid.hidden = results.length === 0;
  bindLibraryButtons(grid);
}

[search, subject, difficulty].forEach(element => {
  element.addEventListener(element === search ? "input" : "change", render);
});

clear.addEventListener("click", () => {
  search.value = "";
  subject.value = "";
  difficulty.value = "";
  render();
});

function escapeAttr(value) {
  return String(value).replace(/"/g, "&quot;");
}
