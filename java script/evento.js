const EVENTO = {
    nome:        "Loop Summit 2026",
    descricao:   "O maior evento de tecnologia e design do ecossistema Loop.",
    local:       "Online — Loop Platform",
    inicio:      "20260910T190000",
    fim:         "20260910T220000",
    dataDisplay: "10 de Setembro, 2026",
    horario:     "19h00 (BRT)",
    youtubeId:   "nz_gZE-70Mw",
};

document.addEventListener("DOMContentLoaded", () => {
    // Preenche os textos
    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    setText("evento-nome", EVENTO.nome);
    setText("evento-descricao", EVENTO.descricao);
    setText("evento-local", EVENTO.local);
    setText("evento-horario", EVENTO.horario);
    setText("evento-data-display", EVENTO.dataDisplay);

    // YouTube
    const iframe = document.getElementById("evento-youtube");

    if (iframe && EVENTO.youtubeId) {
        iframe.src =
            `https://www.youtube.com/embed/${EVENTO.youtubeId}` +
            "?rel=0&modestbranding=1";
    }

    // Google Calendar
    function urlGoogle() {
        const enc = (value) => encodeURIComponent(value);

        return (
            "https://calendar.google.com/calendar/render?action=TEMPLATE" +
            `&text=${enc(EVENTO.nome)}` +
            `&dates=${EVENTO.inicio}/${EVENTO.fim}` +
            `&details=${enc(EVENTO.descricao)}` +
            `&location=${enc(EVENTO.local)}`
        );
    }

    // Apple Calendar
    function abrirApple() {
        const escaparIcs = (value) =>
            String(value)
                .replace(/\\/g, "\\\\")
                .replace(/\r?\n/g, "\\n")
                .replace(/,/g, "\\,")
                .replace(/;/g, "\\;");

        const ics = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Loop 26//Loop Evento//PT-BR",
            "CALSCALE:GREGORIAN",
            "METHOD:PUBLISH",
            "BEGIN:VEVENT",
            `DTSTART:${EVENTO.inicio}`,
            `DTEND:${EVENTO.fim}`,
            `SUMMARY:${escaparIcs(EVENTO.nome)}`,
            `DESCRIPTION:${escaparIcs(EVENTO.descricao)}`,
            `LOCATION:${escaparIcs(EVENTO.local)}`,
            `UID:loop-summit-2026@loop26`,
            "STATUS:CONFIRMED",
            "END:VEVENT",
            "END:VCALENDAR",
        ].join("\r\n");

        const blob = new Blob([ics], {
            type: "text/calendar;charset=utf-8",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "evento-loop.ics";

        document.body.appendChild(link);
        link.click();
        link.remove();

        setTimeout(() => URL.revokeObjectURL(url), 10000);
    }

    // Confirmação visual
    function mostrarConfirmacao() {
        const msg = document.getElementById("confirmacao-msg");

        if (!msg) return;

        msg.classList.add("show");

        setTimeout(() => {
            msg.classList.remove("show");
        }, 4000);
    }

    // Listeners dos calendários
    document
        .getElementById("btn-google-cal")
        ?.addEventListener("click", () => {
            window.open(
                urlGoogle(),
                "_blank",
                "noopener,noreferrer"
            );

            mostrarConfirmacao();
        });

    document
        .getElementById("btn-apple-cal")
        ?.addEventListener("click", () => {
            abrirApple();
            mostrarConfirmacao();
        });

    // Reveal no scroll
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
            {
                threshold: 0.12,
            }
        );

        revealEls.forEach((el) => observer.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add("visible"));
    }

    // Menu hambúrguer
    const toggle = document.getElementById("menu-toggle");
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