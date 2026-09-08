
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    // Quando rolar mais de 50px para baixo (saindo do topo)
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
