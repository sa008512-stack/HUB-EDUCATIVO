const KEY = "hub_library";
const RECENT_KEY = "hub_recent";

export function getLibrary() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch { return []; }
}

export function isInLibrary(id) {
  return getLibrary().includes(id);
}

export function toggleLibrary(id) {
  const current = getLibrary();
  const next = current.includes(id) ? current.filter(item => item !== id) : [...current, id];
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("librarychange"));
  return next.includes(id);
}

export function getRecent() {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; }
  catch { return []; }
}

export function markRecent(id) {
  const next = [id, ...getRecent().filter(item => item !== id)].slice(0, 6);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}

export function bindLibraryButtons(root = document) {
  root.querySelectorAll("[data-library-toggle]").forEach(button => {
    const id = button.dataset.libraryToggle;
    const update = () => {
      const saved = isInLibrary(id);
      button.textContent = saved ? "✓ Na biblioteca" : "+ Biblioteca";
      button.classList.toggle("saved", saved);
      button.setAttribute("aria-label", saved ? "Remover da biblioteca" : "Adicionar à biblioteca");
    };
    update();
    button.onclick = event => {
      event.preventDefault();
      toggleLibrary(id);
      update();
    };
  });
}
