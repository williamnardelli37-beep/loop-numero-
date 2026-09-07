const EVENTO = {
    nome:        "Loop Summit 2026",
    descricao:   "O maior evento de tecnologia e design do ecossistema Loop.",
    local:       "Online — Loop Platform",
    inicio:      "20260910T190000",
    fim:         "20260910T220000",
    dataDisplay: "10 de Setembro, 2026",
    horario:     "19h00 (BRT)",
    youtubeId:   "2d828HcKLUk",
};

document.addEventListener("DOMContentLoaded", () => {

    // — Preenche textos —
    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    setText("evento-nome",         EVENTO.nome);
    setText("evento-descricao",    EVENTO.descricao);
    setText("evento-local",        EVENTO.local);
    setText("evento-horario",      EVENTO.horario);
    setText("evento-data-display", EVENTO.dataDisplay);

    // — YouTube —
    const iframe = document.getElementById("evento-youtube");
    if (iframe && EVENTO.youtubeId !== "SEU_VIDEO_ID") {
        iframe.src = `https://www.youtube.com/embed/${EVENTO.youtubeId}?rel=0&modestbranding=1`;
    }

    // ===================================================
    //  Google Calendar — abre direto no navegador
    //  funciona no iPhone, Android, Mac, Windows
    // ===================================================
    function urlGoogle() {
        const enc = (s) => encodeURIComponent(s);
        return (
            "https://calendar.google.com/calendar/render?action=TEMPLATE" +
            `&text=${enc(EVENTO.nome)}` +
            `&dates=${EVENTO.inicio}/${EVENTO.fim}` +
            `&details=${enc(EVENTO.descricao)}` +
            `&location=${enc(EVENTO.local)}`
        );
    }

    // ===================================================
    //  Apple Calendar
    //  — iPhone/iPad/Mac: abre direto no app nativo
    //    via protocolo webcal + data URI do .ics
    //  — Um único clique, sem "salvar arquivo"
    // ===================================================
    function abrirApple() {
        const ics = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Loop 26//Loop Evento//PT",
            "CALSCALE:GREGORIAN",
            "METHOD:PUBLISH",
            "BEGIN:VEVENT",
            `DTSTART:${EVENTO.inicio}`,
            `DTEND:${EVENTO.fim}`,
            `SUMMARY:${EVENTO.nome}`,
            `DESCRIPTION:${EVENTO.descricao}`,
            `LOCATION:${EVENTO.local}`,
            `UID:loop-${Date.now()}@loop26`,
            "STATUS:CONFIRMED",
            "END:VEVENT",
            "END:VCALENDAR",
        ].join("\r\n");

        // data URI com mime text/calendar
        // iOS e macOS abrem direto no Calendar.app
        const dataUri =
            "data:text/calendar;charset=utf-8," + encodeURIComponent(ics);

        window.location.href = dataUri;
    }

    // ===================================================
    //  Confirmação visual
    // ===================================================
    function mostrarConfirmacao() {
        const msg = document.getElementById("confirmacao-msg");
        if (!msg) return;
        msg.classList.add("show");
        setTimeout(() => msg.classList.remove("show"), 4000);
    }

    // ===================================================
    //  Listeners
    // ===================================================
    document.getElementById("btn-google-cal")?.addEventListener("click", () => {
        window.open(urlGoogle(), "_blank", "noopener,noreferrer");
        mostrarConfirmacao();
    });

    document.getElementById("btn-apple-cal")?.addEventListener("click", () => {
        abrirApple();
        mostrarConfirmacao();
    });

    // ===================================================
    //  Reveal scroll
    // ===================================================
    const revealEls = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );
        revealEls.forEach((el) => observer.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add("visible"));
    }

    // ===================================================
    //  Menu hambúrguer
    // ===================================================
    const toggle  = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (toggle && navMenu) {
        toggle.addEventListener("click", () => {
            toggle.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
        navMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                toggle.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }
});