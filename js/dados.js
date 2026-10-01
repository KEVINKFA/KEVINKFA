// Conteúdo do portfólio. Para editar textos, serviços e carreira, mexa só aqui.

export const perfil = {
  nome: 'Kevin Alves',
  cidade: 'São Paulo, SP',
  email: 'kevinalves180801@gmail.com',
  linkedin: 'https://www.linkedin.com/in/kevin-alves-a61907234/',
  faturado: 200000,
  // Palavras que giram no título: "Eu faço produto ___."
  verbos: ['vender', 'aparecer na busca', 'chegar no prazo', 'virar 5 estrelas', 'vender de novo'],
  resumo:
    'Vendedor de marketplace e estudante de Publicidade e Propaganda. Junto anúncio que convence, operação que não trava e atendimento que vira avaliação positiva.',
};

export const numeros = [
  { valor: 'R$ 200 mil', texto: 'faturados no Mercado Livre' },
  { valor: '2022', texto: 'começo na logística e no atendimento' },
  { valor: '2027', texto: 'formatura em Publicidade e Propaganda' },
];

// Faixa que corre abaixo do topo
export const faixa = [
  'Título que aparece na busca',
  'Foto que para o scroll',
  'Preço com margem',
  'Envio no prazo',
  'Resposta rápida',
  'Pós-venda que fideliza',
  'Reputação no verde',
];

// Cada serviço vira um "anúncio" na vitrine e pode ir para o carrinho de contato
export const servicos = [
  {
    id: 'anuncios',
    icone: '📸',
    selo: 'Mais pedido',
    titulo: 'Anúncios que vendem',
    texto: 'Título, fotos, descrição e ficha técnica tratados como peça publicitária, não como formulário.',
    itens: ['Título com as palavras que o cliente busca', 'Sequência de fotos que responde dúvidas', 'Descrição clara, com os benefícios na frente'],
    tags: ['Copywriting', 'SEO de marketplace', 'Fotos'],
  },
  {
    id: 'preco',
    icone: '💰',
    titulo: 'Preço e margem',
    texto: 'Antes de baixar o preço, conta feita: tarifa, frete, imposto e quanto sobra de verdade.',
    itens: ['Cálculo de tarifa e frete por anúncio', 'Promoções e kits sem queimar margem', 'Acompanhamento da concorrência'],
    tags: ['Precificação', 'Promoções'],
  },
  {
    id: 'logistica',
    icone: '📦',
    selo: 'Experiência real',
    titulo: 'Estoque e envio',
    texto: 'Dois anos de triagem, registro e postagem na Pitney Bowes: pacote conferido sai certo e no prazo.',
    itens: ['Conferência de estoque e inventário', 'Separação, embalagem e postagem', 'Relatórios de movimentação'],
    tags: ['Expedição', 'Inventário'],
  },
  {
    id: 'atendimento',
    icone: '💬',
    titulo: 'Atendimento e pós-venda',
    texto: 'Pergunta respondida rápido e problema resolvido antes de virar reclamação ou nota baixa.',
    itens: ['Respostas rápidas na pré-venda', 'Mediação de trocas e devoluções', 'Cuidado com a reputação da conta'],
    tags: ['Atendimento', 'Reputação'],
  },
  {
    id: 'metricas',
    icone: '📈',
    titulo: 'Divulgação e métricas',
    texto: 'Publicidade aplicada ao marketplace: visitas, conversão e campanhas olhando o que dá retorno.',
    itens: ['Leitura de visitas e conversão', 'Anúncios patrocinados', 'Campanhas para datas comerciais'],
    tags: ['Marketing', 'Product Ads'],
  },
  {
    id: 'operacao',
    icone: '🛠️',
    titulo: 'Operação sem travar',
    texto: 'Bagagem de TI: computador, impressora de etiqueta e planilha funcionando no dia de pico.',
    itens: ['Suporte a Windows e MacBook', 'Planilhas e Pacote Office', 'Equipamentos sempre prontos'],
    tags: ['Suporte de TI', 'Office'],
  },
];

// Carreira em formato de rastreio: do mais recente para o mais antigo
export const rastreio = [
  {
    status: 'Saiu para entrega',
    quando: 'Hoje',
    titulo: 'Vendedor no Mercado Livre',
    local: 'São Paulo, SP',
    texto: 'Operação própria de marketplace com R$ 200 mil faturados: anúncios, preço, envio e atendimento.',
    atual: true,
  },
  {
    status: 'Em trânsito',
    quando: '2024 – 2027',
    titulo: 'Publicidade e Propaganda',
    local: 'Estácio · São Caetano do Sul',
    texto: 'Graduação em andamento. Comunicação, criação e estratégia, aplicadas direto nos anúncios.',
  },
  {
    status: 'Objeto em transferência',
    quando: '2024 – 2025',
    titulo: 'Assistente de TI · SUBA',
    local: 'São Paulo, SP',
    texto: 'Suporte técnico e apoio à gestão de TI.',
    itens: [
      'Formatação, configuração, manutenção e upgrade de equipamentos Windows e MacBook',
      'Compra, troca e atualização de equipamentos da equipe',
      'Suporte de primeira linha aos colaboradores',
      'Organização e suporte técnico em reuniões e eventos internos',
    ],
  },
  {
    status: 'Objeto postado',
    quando: '2022 – 2024',
    titulo: 'Mensageiro · Pitney Bowes',
    local: 'São Paulo, SP',
    texto: 'Logística de correspondências e documentos, do recebimento à entrega.',
    itens: [
      'Recebimento, atendimento ao cliente, triagem, entrega e registro',
      'Tratativa e encaminhamento de documentos judiciais',
      'Conferência de estoque e controle de inventário',
      'Relatórios de movimentação e controle de postagens',
    ],
  },
  {
    status: 'Etiqueta gerada',
    quando: '2019',
    titulo: 'Ensino médio',
    local: 'E.E. Dr. Francisco Borges Vieira',
    texto: 'Concluído.',
  },
];

// Formação e certificados no "cupom"
export const cupom = [
  { item: 'Publicidade e Propaganda', origem: 'Estácio', quando: '2024–27', situacao: 'Cursando' },
  { item: 'Fundamentos de Marketing', origem: 'LinkedIn', quando: '2023', situacao: 'OK' },
  { item: 'Pacote Office Intermediário', origem: 'LinkedIn', quando: '', situacao: 'OK' },
  { item: 'Redes de Computadores', origem: 'Curso em Vídeo', quando: '2023', situacao: 'OK' },
  { item: 'Hardware', origem: 'Curso em Vídeo', quando: '2022', situacao: 'OK' },
  { item: 'PHP', origem: 'Curso em Vídeo', quando: '2022', situacao: 'OK' },
];

// "Ficha técnica" no estilo de página de produto
export const ficha = [
  ['Nome', 'Kevin Alves'],
  ['Local', 'São Paulo, SP'],
  ['Foco', 'Marketplace e Mercado Livre'],
  ['Base', 'Publicidade, logística e TI'],
  ['Perfil', 'Comunicativo, extrovertido e prestativo'],
  ['Ponto forte', 'Lidar com cliente e com equipe'],
  ['Ferramentas', 'Pacote Office, Windows e macOS'],
];

// Dicas que aparecem como notificação no canto da tela
export const dicas = [
  'Título bom começa pelo que o cliente digita na busca.',
  'A primeira foto decide o clique. As outras decidem a compra.',
  'Pergunta respondida em minutos vende mais que desconto.',
  'Preço baixo sem conta feita é prejuízo com frete grátis.',
  'Avaliação boa nasce no pacote bem embalado.',
];
