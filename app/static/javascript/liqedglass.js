/* ============================================================
   LIQUID GLASS ENGINE — Vogue Edition
   Reflexo especular + tilt 3D + menu + animação de entrada
============================================================ */
(() => {
    'use strict';

    // 1. Seletores que recebem o efeito líquido
    const GLASS_SELECTORS = [
        '.glass-preview-card',
        '.feature-card',
        '.bento-item',
        '.hub-glass-card',
        '.badge',
        '.btn'
    ].join(',');

    // 2. Injeta o brilho especular (::after) para todos os elementos glass
    const style = document.createElement('style');
    const selectors = GLASS_SELECTORS.split(',').map(s => s.trim());
    style.textContent = `
        ${GLASS_SELECTORS} {
            position: relative;
            overflow: hidden;
        }
        ${selectors.map(s => `${s}::after`).join(',')} {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(
                circle 200px at var(--x, 50%) var(--y, 50%),
                rgba(255,255,255,0.30),
                transparent 65%
            );
            opacity: 0;
            transition: opacity .4s ease;
            pointer-events: none;
            z-index: 1;
        }
        ${selectors.map(s => `${s}:hover::after`).join(',')} {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

    // 3. Reflexo que segue o cursor + tilt 3D
    const elements = document.querySelectorAll(GLASS_SELECTORS);

    elements.forEach((el) => {
        el.style.setProperty('--x', '50%');
        el.style.setProperty('--y', '50%');
        el.style.transformStyle = 'preserve-3d';

        const isSmall = el.classList.contains('btn') || el.classList.contains('badge');

        el.addEventListener('pointermove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            el.style.setProperty('--x', `${x}px`);
            el.style.setProperty('--y', `${y}px`);

            if (!isSmall) {
                const rotX = ((y / rect.height) - 0.5) * -6;
                const rotY = ((x / rect.width) - 0.5) * 6;
                el.style.transform =
                    `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
            }
        });

        el.addEventListener('pointerleave', () => {
            el.style.setProperty('--x', '50%');
            el.style.setProperty('--y', '50%');
            if (!isSmall) el.style.transform = '';
        });
    });

    // 4. Menu hambúrguer
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.nav-menu');
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
        });
        menu.querySelectorAll('a').forEach(link =>
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                menu.classList.remove('active');
            })
        );
    }

    // 5. Animação de entrada ao rolar (IntersectionObserver)
    const revealTargets = document.querySelectorAll(
        '.feature-card, .bento-item, .hub-glass-card, .glass-preview-card, .section-header'
    );

    revealTargets.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => observer.observe(el));

    // 6. Planeta com parallax leve seguindo o mouse (desktop)
    const planet = document.querySelector('.planet-image');
    if (planet && window.matchMedia('(min-width: 769px)').matches) {
        window.addEventListener('pointermove', (e) => {
            const px = (e.clientX / window.innerWidth - 0.5) * 20;
            const py = (e.clientY / window.innerHeight - 0.5) * 20;
            planet.style.transform = `translate(${px}px, ${py}px)`;
        });
    }
})();