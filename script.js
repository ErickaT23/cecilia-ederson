document.addEventListener("DOMContentLoaded", function() {
    // ===== Referencias base =====
    var audio = document.getElementById("audioPlayer");
    var playPauseButton = document.getElementById("playPauseButton");
    var iconoPlayPause = document.getElementById("iconoPlayPause");
    var progressBar = document.getElementById("progress-bar");
    var currentTimeDisplay = document.getElementById("current-time");
    var durationTimeDisplay = document.getElementById("duration-time");
    
    var seal = document.getElementById("seal");
    const wishes = [];

    // ===== Sobre + música =====
    function openEnvelopeAndPlayMusic() {
        var envelopeTop = document.getElementById("envelope-top");
        var envelopeBottom = document.getElementById("envelope-bottom");
        var envelope = document.getElementById("envelope");
        var invitation = document.getElementById("invitation");

        if (envelopeTop) envelopeTop.style.transform = 'translateY(-100vh)';
        if (envelopeBottom) envelopeBottom.style.transform = 'translateY(100vh)';

        setTimeout(function() {
            if (envelope) envelope.classList.add('hidden');
            if (invitation) invitation.classList.remove('hidden');
        }, 1000);

        if (audio) {
            audio.play().then(function() {
                if (iconoPlayPause) {
                    iconoPlayPause.classList.remove("fa-play");
                    iconoPlayPause.classList.add("fa-pause");
                }
                updateProgress();
            }).catch(function(error) {
                console.log('Playback failed: ', error);
                if (iconoPlayPause) {
                    iconoPlayPause.classList.add("fa-play");
                    iconoPlayPause.classList.remove("fa-pause");
                }
            });
        }
    }

    if (seal) {
        seal.addEventListener("click", function() {
            openEnvelopeAndPlayMusic();
        });
    }

    // ===== Play / Pause =====
    function togglePlayPause() {
        if (!audio) return;
        if (audio.paused) {
            audio.play().then(function() {
                if (iconoPlayPause) {
                    iconoPlayPause.classList.remove("fa-play");
                    iconoPlayPause.classList.add("fa-pause");
                }
                updateProgress();
            }).catch(function(error) {
                console.log('Playback failed: ', error);
            });
        } else {
            audio.pause();
            if (iconoPlayPause) {
                iconoPlayPause.classList.add("fa-play");
                iconoPlayPause.classList.remove("fa-pause");
            }
        }
    }

    // ===== Progreso del audio =====
    function updateProgress() {
        if (!audio || !progressBar || !currentTimeDisplay || !durationTimeDisplay) return;

        audio.addEventListener("timeupdate", function() {
            var progress = (audio.currentTime / audio.duration) * 100;
            if (!isNaN(progress)) progressBar.value = progress;

            var currentMinutes = Math.floor(audio.currentTime / 60) || 0;
            var currentSeconds = Math.floor(audio.currentTime % 60) || 0;
            currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;

            if (!isNaN(audio.duration)) {
                var durationMinutes = Math.floor(audio.duration / 60) || 0;
                var durationSeconds = Math.floor(audio.duration % 60) || 0;
                durationTimeDisplay.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
            }
        });
    }

    if (progressBar && audio) {
        progressBar.addEventListener("input", function() {
            var newTime = (progressBar.value / 100) * audio.duration;
            if (!isNaN(newTime)) audio.currentTime = newTime;
        });
    }

    if (playPauseButton) {
        playPauseButton.addEventListener("click", function() {
            togglePlayPause();
        });
    }

    // ===== Countdown =====
    const targetDate = new Date('2025-10-11T00:00:00').getTime();
    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl)    daysEl.textContent    = days    < 10 ? '0' + days    : days;
        if (hoursEl)   hoursEl.textContent   = hours   < 10 ? '0' + hours   : hours;
        if (minutesEl) minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
        if (secondsEl) secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;

        if (distance < 0) {
            clearInterval(countdown);
            const cd = document.querySelector('.countdown');
            if (cd) cd.textContent = "Gracias por habernos acompañado en este día tan especial.";
        }
    }, 1000);

    // ===== Fade-in al hacer scroll (una sola vez) =====
    try {
        const elementsToFade = document.querySelectorAll('.fade-in-element');

        // Delay escalonado sutil
        elementsToFade.forEach((element, index) => {
            const delay = index * 0.05;
            element.style.transitionDelay = `${delay}s`;
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });

        elementsToFade.forEach(element => observer.observe(element));
    } catch (e) {
        // Fallback: muestra todo si el observer falla
        document.querySelectorAll('.fade-in-element').forEach(el => el.classList.add('visible'));
        console.error('Fallback fade-in:', e);
    }

    // ===== Mostrar invitación (ocultar welcome) =====
    const openBtn = document.getElementById('open-envelope-button');
    if (openBtn) {
        openBtn.addEventListener('click', function () {
            const welcome = document.getElementById('welcome-section');
            const envelope = document.getElementById('envelope');
            if (welcome) welcome.style.display = 'none';
            if (envelope) envelope.classList.remove('hidden');
        });
    }

    // ===== (Opcional) Buenos deseos: helpers básicos =====
    function toggleWishes() {
        const wishesDiv = document.getElementById('wishes');
        if (!wishesDiv) return;
        wishesDiv.classList.toggle('hidden');
        wishesDiv.innerHTML = wishes.map(wish => `<p><strong>${wish.name}:</strong> ${wish.message}</p>`).join('');
    }

    function toggleWishForm() {
        const form = document.getElementById('wish-form');
        if (form) form.classList.toggle('hidden');
    }

    function submitWish() {
        const nameEl = document.getElementById('wish-name');
        const msgEl  = document.getElementById('wish-message');
        if (!nameEl || !msgEl) return;

        const name = nameEl.value;
        const message = msgEl.value;

        if (name && message) {
            wishes.push({ name, message });
            nameEl.value = '';
            msgEl.value = '';
            toggleWishForm();
            toggleWishes();
        }
    }

    // Si necesitas estos en global (por onclick en HTML), descomenta:
    // window.toggleWishes = toggleWishes;
    // window.toggleWishForm = toggleWishForm;
    // window.submitWish = submitWish;
});

// ===== GALERÍA: autoplay + flechas + crossfade sin parpadeo =====
(function initGallerySlider() {
    // 1) Lista de fotos (usa tus rutas reales)
    const photos = [
      "/images/foto-horizontal-1.jpg",
      "/images/foto-horizontal-2.jpg",
      "/images/foto-horizontal-3.jpg",
      "/images/foto-h4.jpg",
      "/images/foto-h5.jpg",
      "/images/foto-h6.jpg",
      "/images/foto-h7.jpg",
      "/images/foto-h8.jpg",
      "/images/foto-h10.jpg",
      "/images/foto-h11.jpg",
      "/images/foto-h12.jpg",
      "/images/foto-h14.jpg",
      "/images/foto-h15.jpg",
      "/images/foto-h16.jpg",
      "/images/foto-h17.jpg",
      "/images/foto-18.jpg",
      "/images/foto-anillo.jpg",
      "/images/foto-compromiso.jpg"
    ];
    if (!photos.length) return;

    // 2) Elementos
    const slideA  = document.getElementById("g-slide-a");
    const slideB  = document.getElementById("g-slide-b");
    const prevBtn = document.querySelector(".g-prev");
    const nextBtn = document.querySelector(".g-next");
    const dotsWrap = document.getElementById("g-dots");
    const slider  = document.querySelector(".gallery-slider");

    // Si no existe la sección de galería en el DOM, no hacemos nada
    if (!slideA || !slideB || !slider || !dotsWrap) return;

    // 3) Estado
    let curr = 0;
    let showingA = true; // qué capa está visible
    const AUTOPLAY_MS = 3500;
    let timer = null;
    let userInteracted = false;

    // 4) Helpers
    const preload = (src) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = reject;
        img.src = src;
        img.decoding = "async";
        img.fetchPriority = "low";
      });

    function setDots() {
      dotsWrap.innerHTML = "";
      photos.forEach((_, i) => {
        const b = document.createElement("button");
        b.className = i === curr ? "active" : "";
        b.addEventListener("click", () => {
          userInteracted = true;
          goTo(i);
          restartAutoplaySoon();
        });
        dotsWrap.appendChild(b);
      });
    }

    function updateDots() {
      const buttons = dotsWrap.querySelectorAll("button");
      buttons.forEach((btn, i) => btn.classList.toggle("active", i === curr));
    }

    async function crossfadeTo(nextIndex) {
      const nextSrc = photos[nextIndex];

      // Pre-carga antes de mostrar
      await preload(nextSrc);

      const nextEl = showingA ? slideB : slideA;
      nextEl.src = nextSrc;

      // Fuerza reflow para que la transición ocurra
      void nextEl.offsetWidth;

      // Alterna visibilidad
      nextEl.classList.add("active");
      (showingA ? slideA : slideB).classList.remove("active");

      showingA = !showingA;
      curr = nextIndex;
      updateDots();
    }

    function next() {
      const ni = (curr + 1) % photos.length;
      crossfadeTo(ni);
    }

    function prev() {
      const pi = (curr - 1 + photos.length) % photos.length;
      crossfadeTo(pi);
    }

    function goTo(index) {
      if (index === curr) return;
      crossfadeTo(index);
    }

    function startAutoplay() {
      stopAutoplay();
      timer = setInterval(next, AUTOPLAY_MS);
    }

    function stopAutoplay() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    function restartAutoplaySoon() {
      stopAutoplay();
      setTimeout(() => {
        // Si quieres que NO se reanude tras interacción, comenta la línea de abajo
        startAutoplay();
      }, 4000);
    }

    // 5) Inicializa primer frame (pre-carga 1° y 2° para evitar flash)
    (async function init() {
      await preload(photos[0]);
      slideA.src = photos[0];
      slideA.classList.add("active");
      showingA = true;

      // Pre-carga la siguiente para que el primer cambio sea suave
      const nextIdx = (curr + 1) % photos.length;
      preload(photos[nextIdx]).catch(() => {});

      setDots();
      startAutoplay();
    })();

    // 6) Eventos de flechas
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        userInteracted = true;
        next();
        restartAutoplaySoon();
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        userInteracted = true;
        prev();
        restartAutoplaySoon();
      });
    }

    // 7) Pausa al entrar con el mouse (desktop) y reanuda al salir
    slider.addEventListener("mouseenter", stopAutoplay);
    slider.addEventListener("mouseleave", restartAutoplaySoon);

    // 8) Swipe para móvil
    let startX = 0;
    slider.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      const dx = endX - startX;
      if (Math.abs(dx) > 40) {
        userInteracted = true;
        dx < 0 ? next() : prev();
        restartAutoplaySoon();
      }
    }, { passive: true });
})();
