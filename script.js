'use strict';

/* PERSONALIZE AQUI: cole o link normal da playlist entre as aspas.
   Exemplo de formato: https://open.spotify.com/playlist/ID_DA_SUA_PLAYLIST
   Também aceita links de embed e links com parâmetros ?si=... . */
const SPOTIFY_PLAYLIST_URL = 'https://open.spotify.com/playlist/74by9ct703Y4ifAiPKT0JI?si=29937bdb6e28462f&pt=84b6d3b3f169aa6782a54ab7fd937e04';

(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const toast = document.getElementById('secret-toast');
  let toastTimer;

  // O mesmo aviso acessível atende aos três bilhetes escondidos.
  function showNote(message) {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('is-visible');
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 4500);
  }
  document.querySelectorAll('[data-secret]').forEach(button => {
    button.addEventListener('click', () => showNote(button.dataset.secret));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') toast.classList.remove('is-visible');
  });

  // O fallback é parte do layout, evitando ícones quebrados ou saltos de tamanho.
  document.querySelectorAll('.photo-well img').forEach(img => {
    const frame = img.closest('.photo-well');
    const update = () => frame.classList.toggle('is-loaded', img.naturalWidth > 0);
    img.addEventListener('load', update);
    img.addEventListener('error', () => frame.classList.remove('is-loaded'));
    if (img.complete) update();
  });

  // Metadados apenas, sem reprodução automática. Um vídeo pausa os outros.
  const videos = [...document.querySelectorAll('video')];
  videos.forEach(video => {
    const frame = video.closest('.video-well');
    const ready = () => frame.classList.add('is-ready');
    const missing = () => frame.classList.remove('is-ready');
    video.addEventListener('loadedmetadata', ready);
    video.addEventListener('error', missing);
    video.querySelector('source')?.addEventListener('error', missing);
    video.addEventListener('play', () => {
      videos.forEach(other => { if (other !== video) other.pause(); });
    });
    if (video.readyState >= 1) ready();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) videos.forEach(video => video.pause());
  });

  // Só aceita uma playlist HTTPS do Spotify; não injeta HTML vindo do link.
  function playlistId(value) {
    try {
      const url = new URL(value.trim());
      if (url.protocol !== 'https:' || url.hostname !== 'open.spotify.com') return null;
      const match = url.pathname.match(/^\/(?:intl-[a-z-]+\/)?(?:embed\/)?playlist\/([A-Za-z0-9]{22})\/?$/);
      return match ? match[1] : null;
    } catch { return null; }
  }
  const id = playlistId(SPOTIFY_PLAYLIST_URL);
  const playlistLink = document.getElementById('spotify-link');
  if (id) {
    const embed = document.createElement('iframe');
    embed.title = 'A trilha sonora da gente — playlist no Spotify';
    embed.src = `https://open.spotify.com/embed/playlist/${id}?utm_source=generator&theme=0`;
    embed.loading = 'lazy';
    embed.allow = 'encrypted-media; fullscreen; picture-in-picture';
    embed.allowFullscreen = true;
    embed.referrerPolicy = 'strict-origin-when-cross-origin';
    document.getElementById('spotify-embed').append(embed);
    document.getElementById('spotify-placeholder').hidden = true;
    playlistLink.href = `https://open.spotify.com/playlist/${id}`;
    playlistLink.removeAttribute('aria-disabled');
  } else {
    const explain = event => {
      event.preventDefault();
      showNote('Nossa trilha sonora está quase aqui. ♫');
      document.getElementById('spotify-status').textContent = 'Cole o link da playlist no campo indicado no início de script.js.';
    };
    playlistLink.addEventListener('click', explain);
    playlistLink.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') explain(event);
    });
  }

  // Observers substituem eventos de scroll contínuos. Falha de JS não esconde a história.
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -15px 0px' });
    document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
    document.documentElement.classList.add('motion-ready');

    const ending = document.getElementById('final');
    const endingObserver = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      ending.classList.add('is-visible');
      if (!reducedMotion.matches) {
        const heartBox = ending.querySelector('.ending-hearts');
        // Cinco corações, uma única vez, removidos após a animação.
        [14, 31, 52, 73, 89].forEach((position, index) => {
          const heart = document.createElement('span');
          heart.className = 'floating-heart';
          heart.textContent = '♡';
          heart.style.left = `${position}%`;
          heart.style.animationDelay = `${index * .9}s`;
          heart.addEventListener('animationend', () => heart.remove(), { once: true });
          heartBox.append(heart);
        });
      }
      endingObserver.disconnect();
    }, { threshold: .25 });
    endingObserver.observe(ending);
  }
})();
