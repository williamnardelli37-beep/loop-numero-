// Banco de dados com os seus textos personalizados e profissionais
const respostas = {
  quem_sou: "<strong>William Nardelli</strong><br>Fundador e Diretor de Tecnologia na Loop 26.<br><br>Atuo no desenvolvimento de sistemas e soluções digitais de alta performance. Estou sempre à disposição para conectar com profissionais da área e empresas que buscam inovação tecnológica. Vamos conversar!",
  
  sobre: "<strong>Ecossistema de Desenvolvimento da Loop 26:</strong><br><br>" +
         "<strong>• Desenvolvimento Web:</strong> Criação de interfaces responsivas, otimizadas e semanticamente corretas, unindo design inteligente à lógica robusta em JavaScript para garantir uma excelente experiência ao usuário.<br><br>" +
         "<strong>• Desenvolvimento Desktop:</strong> Construção de softwares instaláveis, robustos e estáveis para computadores, com foco em gerenciamento de memória e compatibilidade entre sistemas operacionais.<br><br>" +
         "<strong>• Expansão Mobile:</strong> Estruturação estratégica para o desenvolvimento de aplicações móveis futuras, focadas em usabilidade e alta performance para Android e iOS.",
  
  cursos: "Aqui você pode explorar as minhas certificações, qualificações técnicas e a trajetória de aprendizado contínuo que aplicamos em nossos projetos."
};

// Função para abrir e fechar o chat ao clicar no Loader
function toggleChat() {
  const balao = document.getElementById('chatBalloon');
  // Ajuste para garantir o funcionamento correto independente do CSS inicial
  if (balao.style.display === 'flex') {
    balao.style.display = 'none';
  } else {
    balao.style.display = 'flex';
  }
}

// Função que altera o texto baseado no botão clicado
function responder(chave) {
  const textoChat = document.getElementById('chatText');
  if (respostas[chave]) {
    textoChat.innerHTML = respostas[chave];
  }
}

// Função exclusiva para o botão Portfólios redirecionar de página
function irParaPortfolio() {
  window.location.href = "https://www.instagram.com/william_nardelli1234/";
}