/**
 * Loop 26 - Motor Interativo Parallax: Cross-Fade com Opacidade Nítida (Quiet Luxury)
 */
document.addEventListener('DOMContentLoaded', () => {
    const planetImage = document.querySelector('.planet-image');
    const intelligenceSection = document.querySelector('.intelligence');
    if (!planetImage) return;

    const terraSrc = "./img/it.png";
    const bitcoinSrc = "./img/bit.png"; 

    // Pré-carregamento da imagem para evitar lags na transição
    const imgCache = new Image();
    imgCache.src = bitcoinSrc;

    const isMobile = window.innerWidth <= 768;
    let ticking = false;
    let atualIsBitcoin = false;
    let emTransicao = false;

    function updateParallax() {
        const scrolled = window.scrollY;

        // 1. ANIMAÇÃO DO SCROLL (Apenas mover e girar)
        const translateY = scrolled * (isMobile ? 0.2 : 0.45); 
        const rotateDeg = scrolled * (isMobile ? 0.05 : 0.08); 
        const rotateX = isMobile ? 0 : Math.min(scrolled * 0.03, 15); 
        let baseScale = isMobile ? 1 : (1 + (scrolled * 0.0003));
        
        planetImage.style.transform = `translate3d(0, ${translateY}px, 0) rotateX(${rotateX}deg) rotate(${rotateDeg}deg) scale(${baseScale})`;

        // 2. DETECÇÃO DA SEÇÃO INTELLIGENCE COM TRANSIÇÃO EM CROSS-FADE SUAVE
        if (intelligenceSection) {
            const intelligenceTop = intelligenceSection.getBoundingClientRect().top;
            
            // Ponto de gatilho: Metade da tela
            if (intelligenceTop <= window.innerHeight * 0.5) {
                // Troca para o Bitcoin com suavidade
                if (!atualIsBitcoin && !emTransicao) {
                    emTransicao = true;
                    
                    // Fase 1: Desvanece a imagem atual (Terra)
                    planetImage.style.transition = 'opacity 0.2s ease-in-out';
                    planetImage.style.opacity = '0';

                    setTimeout(() => {
                        // Fase 2: Altera a origem da foto em total invisibilidade
                        planetImage.src = bitcoinSrc;
                        planetImage.alt = "Bitcoin";
                        atualIsBitcoin = true;
                        
                        // Fase 3: Faz o Bitcoin surgir na opacidade ideal (0.55 mobile / 0.95 desktop)
                        planetImage.style.opacity = isMobile ? '0.55' : '0.95'; 
                        
                        setTimeout(() => {
                            planetImage.style.transition = 'none';
                            emTransicao = false;
                        }, 200);
                    }, 200);
                }
            } else {
                // Troca de volta para a Terra com suavidade
                if (atualIsBitcoin && !emTransicao) {
                    emTransicao = true;
                    
                    // Fase 1: Desvanece a imagem atual (Bitcoin)
                    planetImage.style.transition = 'opacity 0.2s ease-in-out';
                    planetImage.style.opacity = '0';

                    setTimeout(() => {
                        // Fase 2: Altera de volta para a Terra em total invisibilidade
                        planetImage.src = terraSrc;
                        planetImage.alt = "Planeta Terra";
                        atualIsBitcoin = false;
                        
                        // Fase 3: Faz a Terra surgir na opacidade ideal
                        planetImage.style.opacity = isMobile ? '0.55' : '0.95';
                        
                        setTimeout(() => {
                            planetImage.style.transition = 'none';
                            emTransicao = false;
                        }, 200);
                    }, 200);
                }
            }
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });

    window.addEventListener('load', updateParallax);
});