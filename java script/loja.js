const WHATSAPP_NUMBER = "5554996230237";

const palettes = [
    {
        id: "editorial",
        name: "Editorial",
        colors: ["#181410", "#71645b", "#d5c1af", "#f5f1eb"],
        text: "#ffffff"
    },
    {
        id: "ocean",
        name: "Oceano",
        colors: ["#102a43", "#23647a", "#76a8a5", "#eef4ef"],
        text: "#ffffff"
    },
    {
        id: "forest",
        name: "Floresta",
        colors: ["#17251c", "#3e5d47", "#a0a78d", "#ece8dc"],
        text: "#ffffff"
    },
    {
        id: "wine",
        name: "Vinho",
        colors: ["#32151d", "#783b49", "#cf9b99", "#f5e9e3"],
        text: "#ffffff"
    },
    {
        id: "solar",
        name: "Solar",
        colors: ["#49321f", "#c07639", "#e8bb69", "#fff3d5"],
        text: "#ffffff"
    },
    {
        id: "mono",
        name: "Monocromática",
        colors: ["#111111", "#555555", "#aaaaaa", "#f1f1f1"],
        text: "#ffffff"
    },
    {
        id: "lavender",
        name: "Lavanda",
        colors: ["#29243a", "#766a92", "#b9a8c8", "#f0eaf2"],
        text: "#ffffff"
    },
    {
        id: "minimal",
        name: "Minimal",
        colors: ["#ede8df", "#c8bdb0", "#8b7f73", "#302b27"],
        text: "#302b27"
    }
];

const state = {
    product: "virtual",
    productName: "Virtual Page",
    basePrice: 690,
    palette: palettes[0],
    ai: "none",
    aiName: "Sem IA",
    aiMonthly: 0,
    features: {
        public: false,
        dashboard: true,
        enterpriseAi: false,
        users: true
    }
};

const formatMoney = value => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 0
    }).format(value);
};

/* Paletas */

const paletteContainer = document.getElementById("paletteOptions");

if (paletteContainer) {
    palettes.forEach((palette, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = `palette ${index === 0 ? "selected" : ""}`;
        button.dataset.palette = palette.id;
        button.setAttribute(
            "aria-label",
            `Selecionar paleta ${palette.name}`
        );

        button.innerHTML = `
            <span class="swatches">
                ${palette.colors
                    .map(
                        color =>
                            `<span style="background:${color}"></span>`
                    )
                    .join("")}
            </span>

            <span class="palette-name">${palette.name}</span>
        `;

        button.addEventListener("click", () => {
            document.querySelectorAll(".palette").forEach(item => {
                item.classList.remove("selected");
            });

            button.classList.add("selected");
            state.palette = palette;

            updateUI();
        });

        paletteContainer.appendChild(button);
    });
}

/* Produtos */

document.querySelectorAll(".option-card").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".option-card").forEach(item => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        state.product = button.dataset.product;
        state.productName = button.dataset.name;
        state.basePrice = Number(button.dataset.price || 0);

        updateUI();
    });
});

/* Inteligência artificial */

document.querySelectorAll(".ai-option").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".ai-option").forEach(item => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        state.ai = button.dataset.ai;
        state.aiName = button.dataset.name;
        state.aiMonthly = Number(button.dataset.price || 0);

        updateUI();
    });
});

/* Recursos empresariais */

document.querySelectorAll(".switch").forEach(button => {
    button.addEventListener("click", () => {
        const feature = button.dataset.feature;
        const isActive = !button.classList.contains("active");

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));

        if (feature) {
            state.features[feature] = isActive;
        }

        updateUI();
    });
});

function getSelectedFeatures() {
    return [...document.querySelectorAll(".switch.active")].map(button => ({
        name: button.dataset.name || "Módulo",
        setup: Number(button.dataset.price || 0),
        monthly: Number(button.dataset.monthly || 0)
    }));
}

function getTotals() {
    let setup = state.basePrice;
    let monthly = 0;

    if (state.product === "landing") {
        monthly += state.aiMonthly;
    }

    if (state.product === "enterprise") {
        getSelectedFeatures().forEach(feature => {
            setup += feature.setup;
            monthly += feature.monthly;
        });
    }

    return { setup, monthly };
}

/* Atualização da interface */

function updateUI() {
    const isLanding = state.product === "landing";
    const isEnterprise = state.product === "enterprise";

    const aiSection = document.getElementById("aiSection");
    const enterpriseSection =
        document.getElementById("enterpriseSection");

    aiSection?.classList.toggle("active", isLanding);
    enterpriseSection?.classList.toggle("active", isEnterprise);

    const summaryProduct = document.getElementById("summaryProduct");
    const summaryPalette = document.getElementById("summaryPalette");
    const summaryAi = document.getElementById("summaryAi");
    const summaryAiRow = document.getElementById("summaryAiRow");
    const summaryFeatures =
        document.getElementById("summaryFeatures");
    const summaryFeaturesRow =
        document.getElementById("summaryFeaturesRow");

    if (summaryProduct) {
        summaryProduct.textContent = state.productName;
    }

    if (summaryPalette) {
        summaryPalette.textContent = state.palette.name;
    }

    if (summaryAiRow) {
        summaryAiRow.hidden = !isLanding;
    }

    if (summaryAi) {
        summaryAi.textContent = state.aiName;
    }

    const features = getSelectedFeatures();

    if (summaryFeaturesRow) {
        summaryFeaturesRow.hidden = !isEnterprise;
    }

    if (summaryFeatures) {
        summaryFeatures.textContent = features.length
            ? features.map(feature => feature.name).join(", ")
            : "Nenhum";
    }

    const totals = getTotals();
    const setupTotal = document.getElementById("setupTotal");
    const monthlyTotal = document.getElementById("monthlyTotal");

    if (setupTotal) {
        setupTotal.textContent = formatMoney(totals.setup);
    }

    if (monthlyTotal) {
        monthlyTotal.textContent = formatMoney(totals.monthly);
    }

    const preview = document.getElementById("preview");

    if (preview) {
        preview.style.setProperty(
            "--preview-primary",
            state.palette.colors[0]
        );

        preview.style.setProperty(
            "--preview-secondary",
            state.palette.colors[1]
        );

        preview.style.setProperty(
            "--preview-accent",
            state.palette.colors[2]
        );

        preview.style.setProperty(
            "--preview-text",
            state.palette.text
        );
    }

    const previewBrand = document.getElementById("previewBrand");

    if (previewBrand) {
        previewBrand.textContent = state.productName;
    }

    const previewContent = {
        virtual: {
            title: "Sua presença digital começa aqui.",
            text:
                "Uma apresentação direta, elegante e acessível para sua marca."
        },
        landing: {
            title: "Transforme visitas em oportunidades.",
            text:
                "Conteúdo estratégico, imagens inclusas e atendimento inteligente."
        },
        enterprise: {
            title: "Sua operação em um único sistema.",
            text:
                "Dashboard, usuários, automações e inteligência sob medida."
        }
    };

    const selectedContent = previewContent[state.product];
    const previewTitle = document.getElementById("previewTitle");
    const previewText = document.getElementById("previewText");

    if (previewTitle && selectedContent) {
        previewTitle.textContent = selectedContent.title;
    }

    if (previewText && selectedContent) {
        previewText.textContent = selectedContent.text;
    }
}

/* Envio pelo WhatsApp */

const submitButton = document.getElementById("submitButton");

if (submitButton) {
    submitButton.addEventListener("click", () => {
        const nameInput = document.getElementById("customerName");
        const companyInput =
            document.getElementById("customerCompany");
        const notesInput = document.getElementById("customerNotes");

        const customerName = nameInput?.value?.trim() || "";
        const customerCompany = companyInput?.value?.trim() || "";
        const customerNotes = notesInput?.value?.trim() || "";

        const totals = getTotals();
        const features = getSelectedFeatures();

        const lines = [
            "Olá! Gostaria de solicitar uma proposta.",
            "",
            "*DADOS DO CLIENTE*",
            `Nome: ${customerName || "Não informado"}`,
            `Empresa: ${customerCompany || "Não informada"}`,
            "",
            "*CONFIGURAÇÃO DO PROJETO*",
            `Produto: ${state.productName}`,
            `Paleta: ${state.palette.name}`
        ];

        if (state.product === "virtual") {
            lines.push("Imagens: inclusas");
        }

        if (state.product === "landing") {
            lines.push(
                `Inteligência artificial: ${state.aiName}`
            );
            lines.push("Imagens: inclusas");
        }

        if (state.product === "enterprise") {
            const accessType = state.features.public
                ? "Aberto ao público"
                : "Fechado para a empresa";

            lines.push(`Tipo de acesso: ${accessType}`);

            const modules = features.length
                ? features.map(feature => feature.name).join(", ")
                : "Nenhum módulo adicional";

            lines.push(`Módulos: ${modules}`);
        }

        lines.push(
            "",
            "*ESTIMATIVA*",
            `Implantação: ${formatMoney(totals.setup)}`,
            `Mensalidade: ${formatMoney(totals.monthly)}`
        );

        if (customerNotes) {
            lines.push(
                "",
                "*OBSERVAÇÕES*",
                customerNotes
            );
        }

        lines.push(
            "",
            "Podemos conversar sobre este projeto?"
        );

        const message = lines.join("\n");

        const whatsappURL =
            `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}` +
            `&text=${encodeURIComponent(message)}`;

        const newWindow = window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

        /* Fallback caso o navegador bloqueie a nova aba */
        if (!newWindow) {
            window.location.href = whatsappURL;
        }
    });
}

/* Modal do portfólio */

const portfolioModal = document.getElementById("portfolioModal");
const portfolioModalImage =
    document.getElementById("portfolioModalImage");
const portfolioModalTitle =
    document.getElementById("portfolioModalTitle");

let lastFocusedElement = null;

document.querySelectorAll(".portfolio-item").forEach(item => {
    item.addEventListener("click", () => {
        if (
            !portfolioModal ||
            !portfolioModalImage ||
            !portfolioModalTitle
        ) {
            return;
        }

        lastFocusedElement = item;

        /*
         * Usa data-image quando existir.
         * Caso contrário, utiliza a imagem interna do item.
         */
        const internalImage = item.querySelector("img");
        const image =
            item.dataset.image || internalImage?.getAttribute("src") || "";
        const title =
            item.dataset.title ||
            internalImage?.getAttribute("alt") ||
            "Projeto";

        portfolioModalImage.src = image;
        portfolioModalImage.alt = title;
        portfolioModalTitle.textContent = title;

        portfolioModal.hidden = false;
        document.body.classList.add("modal-open");

        portfolioModal.querySelector(".modal-close")?.focus();
    });
});

function closePortfolioModal() {
    if (!portfolioModal) {
        return;
    }

    portfolioModal.hidden = true;
    document.body.classList.remove("modal-open");

    if (portfolioModalImage) {
        portfolioModalImage.src = "";
        portfolioModalImage.alt = "";
    }

    if (portfolioModalTitle) {
        portfolioModalTitle.textContent = "";
    }

    lastFocusedElement?.focus();
}

document.querySelectorAll("[data-close-modal]").forEach(button => {
    button.addEventListener("click", closePortfolioModal);
});

document.addEventListener("keydown", event => {
    if (
        event.key === "Escape" &&
        portfolioModal &&
        !portfolioModal.hidden
    ) {
        closePortfolioModal();
    }
});

/* Inicialização */

updateUI();