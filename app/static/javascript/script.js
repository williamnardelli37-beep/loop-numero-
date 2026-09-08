/**
 * Loop 26 - Motor de Funcionamento Geral, Menus Mobile e Regras de Negócio
 * Versão Otimizada de Alta Performance (Ultra-Light Edition)
 */

let produtoSelecionado = "";
let precoSelecionado = "";

// ==========================================================================
// 1. MODAL DE CHECKOUT OUTBOUND WIDGET
// ==========================================================================
function abrirCheckout(nome, preco) {
    produtoSelecionado = nome;
    precoSelecionado = preco;
    document.getElementById('check-prod').innerText = nome;
    document.getElementById('checkout').style.display = 'flex'; // Alinhamento flexbox centralizado
}

// Fecha o modal de checkout limpo
function fecharCheckout() {
    document.getElementById('checkout').style.display = 'none';
}

// Formatação e disparo síncrono para a API externa do WhatsApp
function enviarPedido() {
    const nome = document.getElementById('c-nome').value.trim();
    const loja = document.getElementById('c-loja').value.trim();
    const logo = document.getElementById('c-logo').value;
    const dom = document.getElementById('c-com').value;

    if (!nome || !loja) {
        return alert("Por favor, preencha todos os campos obrigatórios!");
    }

    const msg = `*SOLICITAÇÃO DE PROJETO LOOP*%0A%0A` +
                `*Plano:* ${produtoSelecionado}%0A` +
                `*Preço Base:* R$ ${precoSelecionado}%0A%0A` +
                `*Cliente:* ${nome}%0A` +
                `*Negócio:* ${loja}%0A` +
                `*Tem Logo:* ${logo}%0A` +
                `*Domínio:* ${dom}`;

    window.open(`https://wa.me/5554993243670?text=${msg}`, '_blank');
}

// ==========================================================================
// 2. MOTOR DE CONSULTA REAL DE DISPONIBILIDADE DE DOMÍNIOS (RDAP)
// ==========================================================================
async function verificarDominio() {
    const nomeOriginal = document.getElementById('domain-input').value.trim();
    const tld = document.getElementById('tld-select').value;
    const resultDiv = document.getElementById('domain-result');
    const statusCard = document.getElementById('status-card');
    const statusText = document.getElementById('status-text');
    const btnReservar = document.getElementById('btn-reservar');

    const nome = nomeOriginal.toLowerCase().replace(/[^a-z0-9-]/g, '');

    if (nome.length < 3) {
        alert("Por favor, digite um nome válido (mínimo 3 caracteres).");
        return;
    }

    const dominioCompleto = nome + tld;

    resultDiv.style.display = 'block';
    statusText.innerHTML = `<i class="ph ph-circle-notch-bold" style="animation: spin 1s linear infinite;"></i> Consultando base de dados global para <strong>${dominioCompleto}</strong>...`;
    statusCard.style.background = "rgba(0, 0, 0, 0.02)";
    statusCard.style.border = "1px solid rgba(0, 0, 0, 0.05)";
    btnReservar.style.display = 'none';

    try {
        const url = `https://rdap.org/domain/${dominioCompleto}`;
        const response = await fetch(url);

        if (response.status === 404) {
            statusText.innerHTML = `<i class="ph ph-check-circle" style="color: green; font-size:16px;"></i> EXCELENTE! O domínio <strong>${dominioCompleto}</strong> está livre e disponível para registro!`;
            statusCard.style.background = "rgba(0, 255, 0, 0.04)";
            statusCard.style.border = "1px solid rgba(0, 128, 0, 0.15)";
            btnReservar.style.display = 'inline-block';
            btnReservar.onclick = function() {
                window.open(`https://wa.me/5554993243670?text=Olá! Verifiquei no site que o domínio *${dominioCompleto}* está disponível e gostaria de reservá-lo junto ao meu projeto.`, '_blank');
            };
        } 
        else if (response.ok) {
            statusText.innerHTML = `<i class="ph ph-x-circle" style="color: red; font-size:16px;"></i> INDISPONÍVEL! O domínio <strong>${dominioCompleto}</strong> já possui dono e está registrado.`;
            statusCard.style.background = "rgba(255, 0, 0, 0.04)";
            statusCard.style.border = "1px solid rgba(255, 0, 0, 0.15)";
            btnReservar.style.display = 'none';
        }
        else {
            throw new Error();
        }
    } catch (error) {
        statusText.innerHTML = `<i class="ph ph-warning" style="color: orange;"></i> Não foi possível validar a base agora. <br> <small>Tente novamente ou fale conosco para checarmos de forma manual.</small>`;
        btnReservar.style.display = 'inline-block';
        btnReservar.innerText = "Consultar via WhatsApp";
        btnReservar.onclick = function() {
            window.open(`https://wa.me/5554993243670?text=Olá! Tentei consultar o domínio *${dominioCompleto}* mas deu erro. Pode olhar para mim se está disponível?`, '_blank');
        };
    }
}

// ==========================================================================
// 3. MOTOR INTERATIVO PARALLAX OTIMIZADO COM ESCAPE MOBILE (CROSS-FADE)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const planetImage = document.querySelector('.planet-image');
    const intelligenceSection = document.querySelector('.intelligence');
    
    // Configuração e ativação do Menu Hamburguer Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fecha a gaveta quando um item de menu for clicado
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    if (!planetImage) return;

    const terraSrc = "./img/it.png";
    const bitcoinSrc = "./img/bit.png"; 

    // Bloqueia cálculos de movimento em telas mobile para salvar bateria e CPU
    const isMobile = window.innerWidth <= 768;
    let ticking = false;
    let atualIsBitcoin = false;
    let emTransicao = false;

    function updateParallax() {
        // Se for mobile, ignora o cálculo do movimento tridimensional na rolagem
        if (isMobile) {
            ticking = false;
            return; 
        }

        const scrolled = window.scrollY;

        // OTIMIZAÇÃO: Translação vertical sutil e rotação simples 2D pura (Processado direto na GPU)
        // O "rotateX" tridimensional que causava lentidão foi removido
        const translateY = scrolled * 0.25; 
        const rotateDeg = scrolled * 0.04; 
        
        planetImage.style.transform = `translate3d(0, ${translateY}px, 0) rotate(${rotateDeg}deg)`;

        // Detecção da seção Intelligence com Cross-Fade síncrono
        if (intelligenceSection) {
            const intelligenceTop = intelligenceSection.getBoundingClientRect().top;
            
            if (intelligenceTop <= window.innerHeight * 0.5) {
                if (!atualIsBitcoin && !emTransicao) {
                    emTransicao = true;
                    
                    planetImage.style.transition = 'opacity 0.2s ease-in-out';
                    planetImage.style.opacity = '0';

                    setTimeout(() => {
                        planetImage.src = bitcoinSrc;
                        planetImage.alt = "Bitcoin";
                        atualIsBitcoin = true;
                        planetImage.style.opacity = '0.95'; 
                        
                        setTimeout(() => {
                            planetImage.style.transition = 'none';
                            emTransicao = false;
                        }, 200);
                    }, 200);
                }
            } else {
                if (atualIsBitcoin && !emTransicao) {
                    emTransicao = true;
                    
                    planetImage.style.transition = 'opacity 0.2s ease-in-out';
                    planetImage.style.opacity = '0';

                    setTimeout(() => {
                        planetImage.src = terraSrc;
                        planetImage.alt = "Planeta Terra";
                        atualIsBitcoin = false;
                        planetImage.style.opacity = '0.95';
                        
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

    // Aplicação de Listener Passivo (Garante rolagem fluida e imediata no navegador)
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });

    window.addEventListener('load', updateParallax);
});

// Animação de rotação nativa CSS para o ícone de carregamento do buscador de domínios
if (!document.getElementById('spin-style-framework')) {
    const styleSheet = document.createElement("style");
    styleSheet.id = 'spin-style-framework';
    styleSheet.innerText = `@keyframes spin { to { transform: rotate(360deg); } }`;
    document.head.appendChild(styleSheet);
}