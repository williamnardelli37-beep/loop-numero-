/* ── CURSOR ── */
    const cursor     = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursorRing');
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top  = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .principle-card, .color-swatch, .q-dot').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorRing.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorRing.classList.remove('hover');
      });
    });

    /* ── SCROLL REVEAL ── */
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));

    /* ── QUOTES CAROUSEL ── */
    const quotes    = document.querySelectorAll('.quote');
    const dotsWrap  = document.getElementById('quoteDots');
    let current = 0;

    quotes.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'q-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });

    function goTo(index) {
      quotes[current].classList.remove('active');
      dotsWrap.children[current].classList.remove('active');
      current = index;
      quotes[current].classList.add('active');
      dotsWrap.children[current].classList.add('active');
    }

    setInterval(() => goTo((current + 1) % quotes.length), 4000);

    /* ── NAV SCROLL ── */
    window.addEventListener('scroll', () => {
      const nav = document.querySelector('nav');
      if (window.scrollY > 60) {
        nav.style.background = 'rgba(10,10,10,0.92)';
      } else {
        nav.style.background = 'rgba(10,10,10,0.7)';
      }
    });