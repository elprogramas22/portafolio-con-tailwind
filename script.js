document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('header nav a');
  const overlay = document.getElementById('loading-overlay');
  const SHOW_MS = 1500; // duración en ms del cargando (ajusta si quieres)

  if (!overlay || links.length === 0) return;

  links.forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href') || '';
      // Solo manejar hashes internos (por ejemplo: #presentacion)
      if (!href.startsWith('#')) return;
      e.preventDefault();

      overlay.classList.remove('hidden');
      overlay.setAttribute('aria-hidden', 'false');

      setTimeout(() => {
        overlay.classList.add('hidden');
        overlay.setAttribute('aria-hidden', 'true');

        const id = href.slice(1);
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          history.pushState(null, '', href);
        } else {
          location.hash = href;
        }
      }, SHOW_MS);
    });
  });
});