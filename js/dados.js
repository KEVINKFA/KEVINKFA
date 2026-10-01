// Conteúdo do portfólio. Para editar textos, serviços e trajetória, mexa só aqui.

export const perfil = {
  nome: 'Kevin Alves',
  cargo: 'Marketing para marketplace',
  cidade: 'São Paulo, SP',
  email: 'kevinalves180801@gmail.com',
  linkedin: 'https://www.linkedin.com/in/kevin-alves-a61907234/',
  faturado: 200000,
  // Título de abertura, uma linha por item. A última fica em destaque.
  chamada: ['Transformo anúncios em vendas,', 'e vendas em clientes', 'que voltam.'],
  resumo:
    'Vendedor no Mercado Livre e estudante de Publicidade e Propaganda. Aplico marketing em cada ponto de contato da loja: do anúncio que aparece na busca à avaliação que traz o próximo cliente.',
};

export const numeros = [
  { valor: '2027', texto: 'Formatura em Publicidade e Propaganda' },
  { valor: '2023', texto: 'Certificação em Fundamentos de Marketing' },
];

// Jornada do cliente. Cada serviço aponta para uma etapa.
export const etapas = [
  { id: 'atracao', nome: 'Atração', texto: 'O cliente encontra o produto.' },
  { id: 'consideracao', nome: 'Consideração', texto: 'O anúncio convence.' },
  { id: 'conversao', nome: 'Conversão', texto: 'A visita vira pedido.' },
  { id: 'fidelizacao', nome: 'Fidelização', texto: 'O cliente avalia bem e volta.' },
];

export const servicos = [
  {
    etapa: 'atracao',
    titulo: 'SEO de marketplace',
    texto: 'Palavras-chave, categoria certa e ficha técnica completa para o algoritmo entregar o anúncio a quem está procurando.',
    itens: ['Pesquisa de palavras-chave', 'Títulos orientados à busca', 'Ficha técnica completa'],
  },
  {
    etapa: 'atracao',
    titulo: 'Mídia paga',
    texto: 'Anúncios patrocinados com orçamento por objetivo, acompanhando o retorno para escalar o que vende e cortar o que não vende.',
    itens: ['Campanhas por objetivo', 'Controle de ACOS e ROAS', 'Escala dos anúncios campeões'],
  },
  {
    etapa: 'consideracao',
    titulo: 'Copywriting de anúncio',
    texto: 'Descrição que antecipa dúvidas e vende benefício, não só característica. Texto de publicitário aplicado à página de produto.',
    itens: ['Benefícios na frente', 'Quebra de objeções', 'Tom de voz da marca'],
  },
  {
    etapa: 'consideracao',
    titulo: 'Fotografia e direção de arte',
    texto: 'Capa que se destaca na lista de resultados e sequência de fotos que conta a história do produto.',
    itens: ['Imagem de capa', 'Fotos de uso e de detalhe', 'Padrão visual da loja'],
  },
  {
    etapa: 'conversao',
    titulo: 'Ofertas e campanhas',
    texto: 'Kits, combos e calendário de datas comerciais, com preço pensado para converter sem consumir a margem.',
    itens: ['Kits e combos', 'Black Friday e datas comerciais', 'Cupons e promoções'],
  },
  {
    etapa: 'fidelizacao',
    titulo: 'Reputação e prova social',
    texto: 'Resposta rápida, pós-venda cuidadoso e avaliações que viram argumento de venda para o próximo cliente.',
    itens: ['Respostas na pré-venda', 'Pós-venda e mediação', 'Gestão de avaliações'],
  },
];

// Simulador de funil: valores ilustrativos que o visitante ajusta
export const simulador = {
  visitas: { min: 1000, max: 50000, passo: 500, valor: 10000 },
  conversao: { min: 0.5, max: 8, passo: 0.1, valor: 2 },
  ticket: { min: 30, max: 500, passo: 5, valor: 120 },
  alavancas: [
    { campo: 'visitas', rotulo: '+20% de visitas', origem: 'SEO e mídia paga', fator: 1.2 },
    { campo: 'conversao', rotulo: '+0,5 p.p. de conversão', origem: 'Copy, fotos e reputação', soma: 0.5 },
    { campo: 'ticket', rotulo: '+10% no ticket médio', origem: 'Kits e combos', fator: 1.1 },
  ],
};

export const metricas = [
  { sigla: 'CTR', nome: 'Taxa de cliques', formula: 'cliques ÷ impressões', texto: 'Mostra se a capa e o título chamam atenção na busca.' },
  { sigla: 'CR', nome: 'Taxa de conversão', formula: 'pedidos ÷ visitas', texto: 'Mostra se o anúncio convence quem chegou até ele.' },
  { sigla: 'TM', nome: 'Ticket médio', formula: 'faturamento ÷ pedidos', texto: 'Sobe com kits, combos e boas ofertas.' },
  { sigla: 'ACOS', nome: 'Custo de publicidade', formula: 'investimento ÷ vendas por anúncio', texto: 'Mede a eficiência da mídia paga.' },
  { sigla: 'REP', nome: 'Reputação', formula: 'avaliações + atendimento', texto: 'Sustenta todo o resto: sem ela, nada converte.' },
];

// Do mais recente para o mais antigo
export const trajetoria = [
  {
    periodo: 'Atual',
    titulo: 'Vendedor',
    origem: 'Mercado Livre · operação própria',
    texto: 'R$ 200 mil faturados cuidando do marketing da loja: anúncios, fotos, ofertas, campanhas e reputação.',
    selo: 'Em andamento',
  },
  {
    periodo: '2024 — 2027',
    titulo: 'Publicidade e Propaganda',
    origem: 'Estácio · São Caetano do Sul',
    texto: 'Graduação em comunicação, criação e estratégia, aplicada direto nos anúncios.',
    curso: { inicio: 2024, fim: 2027 },
  },
  {
    periodo: '2023',
    titulo: 'Fundamentos de Marketing',
    origem: 'LinkedIn · certificação',
    texto: 'Certificação concluída.',
  },
];

export const perfilPessoal = ['Comunicativo', 'Extrovertido', 'Prestativo', 'Facilidade com clientes e equipes'];
