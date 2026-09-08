    // Define a data alvo: 10 de Maio de 2026 às 10:00:00
    const targetDate = new Date("May 16, 2026 14:00:00").getTime();

    const updateTimer = setInterval(() => {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            clearInterval(updateTimer);
            document.querySelector(".countdown-wrapper").innerHTML = "<h2 class='sub-text'>O evento começou!</h2>";
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = d.toString().padStart(2, '0');
        document.getElementById("hours").innerText = h.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = m.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = s.toString().padStart(2, '0');
    }, 1000);