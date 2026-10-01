// Conteúdo do portfólio. Para editar textos, serviços e carreira, mexa só aqui.

export const perfil = {
  nome: 'Kevin Alves',
  cargo: 'Operação e vendas em marketplace',
  cidade: 'São Paulo, SP',
  email: 'kevinalves180801@gmail.com',
  linkedin: 'https://www.linkedin.com/in/kevin-alves-a61907234/',
  faturado: 200000,
  // Título de abertura, uma linha por item. A última fica em destaque.
  chamada: ["Transformo anúncios em vendas,", "e vendas em clientes", "que voltam."],
  resumo:
    'Vendedor no Mercado Livre e estudante de Publicidade e Propaganda. Uno comunicação, logística e tecnologia para cuidar da operação inteira: do anúncio que aparece na busca até o pós-venda.',
};

export const numeros = [
  { valor: '2022', texto: 'Início na logística e no atendimento' },
  { valor: '3 áreas', texto: 'Publicidade, logística e TI' },
  { valor: '2027', texto: 'Formatura em Publicidade e Propaganda' },
];

// Etapas do ciclo da venda. Cada serviço aponta para uma delas.
export const etapas = [
  { id: 'visibilidade', nome: 'Visibilidade', texto: 'O cliente encontra o produto.' },
  { id: 'conversao', nome: 'Conversão', texto: 'A visita vira compra.' },
  { id: 'entrega', nome: 'Entrega', texto: 'O pedido chega certo e no prazo.' },
  { id: 'recompra', nome: 'Recompra', texto: 'O cliente avalia bem e volta.' },
];

export const servicos = [
  {
    etapa: 'visibilidade',
    titulo: 'Anúncios e posicionamento',
    texto: 'Título, fotos, descrição e ficha técnica pensados como peça publicitária, com as palavras que o cliente usa na busca.',
    itens: ['Títulos orientados à busca', 'Sequência de fotos que responde dúvidas', 'Descrições com os benefícios na frente'],
  },
  {
    etapa: 'visibilidade',
    titulo: 'Divulgação e métricas',
    texto: 'Leitura de visitas e conversão para decidir onde investir, com campanhas para datas comerciais.',
    itens: ['Acompanhamento de visitas e conversão', 'Anúncios patrocinados', 'Calendário de datas comerciais'],
  },
  {
    etapa: 'conversao',
    titulo: 'Preço e margem',
    texto: 'Tarifa, frete e imposto na conta antes de mexer no preço. Promoções e kits que vendem sem consumir a margem.',
    itens: ['Cálculo de custo por anúncio', 'Promoções e kits', 'Acompanhamento da concorrência'],
  },
  {
    etapa: 'entrega',
    titulo: 'Estoque e expedição',
    texto: 'Dois anos de logística na Pitney Bowes: triagem, registro, inventário e postagem com controle.',
    itens: ['Conferência de estoque e inventário', 'Separação, embalagem e postagem', 'Relatórios de movimentação'],
  },
  {
    etapa: 'entrega',
    titulo: 'Infraestrutura da operação',
    texto: 'Experiência em suporte de TI para manter computadores, impressoras e planilhas funcionando no dia de pico.',
    itens: ['Suporte a Windows e macOS', 'Pacote Office e planilhas', 'Equipamentos prontos para a operação'],
  },
  {
    etapa: 'recompra',
    titulo: 'Atendimento e reputação',
    texto: 'Perguntas respondidas rápido e problemas resolvidos antes de virar reclamação ou avaliação negativa.',
    itens: ['Respostas rápidas na pré-venda', 'Mediação de trocas e devoluções', 'Cuidado com a reputação da conta'],
  },
];

// Do mais recente para o mais antigo
export const trajetoria = [
  {
    periodo: 'Atual',
    titulo: 'Vendedor',
    empresa: 'Mercado Livre · operação própria',
    texto: 'R$ 200 mil faturados cuidando de anúncios, preço, envio e atendimento.',
  },
  {
    periodo: '2024 — 2025',
    titulo: 'Assistente de TI',
    empresa: 'SUBA',
    texto: 'Suporte técnico e apoio à gestão de TI.',
    itens: [
      'Formatação, configuração, manutenção e upgrade de equipamentos Windows e MacBook',
      'Compra, substituição e atualização de equipamentos da equipe',
      'Suporte de primeira linha aos colaboradores',
      'Organização e suporte técnico em reuniões e eventos internos',
    ],
  },
  {
    periodo: '2022 — 2024',
    titulo: 'Mensageiro',
    empresa: 'Pitney Bowes',
    texto: 'Logística de correspondências e documentos, do recebimento à entrega.',
    itens: [
      'Recebimento, atendimento ao cliente, triagem, entrega e registro',
      'Tratativa e encaminhamento de documentos judiciais',
      'Conferência de estoque e controle de inventário',
      'Relatórios de movimentação e controle de postagens',
    ],
  },
];

export const formacao = {
  curso: 'Publicidade e Propaganda',
  instituicao: 'Estácio · São Caetano do Sul',
  periodo: '2024 — 2027',
  situacao: 'Em andamento',
  certificados: [
    { nome: 'Fundamentos de Marketing', origem: 'LinkedIn', ano: '2023' },
    { nome: 'Pacote Office Intermediário', origem: 'LinkedIn', ano: '' },
    { nome: 'Redes de Computadores', origem: 'Curso em Vídeo', ano: '2023' },
    { nome: 'Hardware', origem: 'Curso em Vídeo', ano: '2022' },
    { nome: 'PHP', origem: 'Curso em Vídeo', ano: '2022' },
  ],
};

export const perfilPessoal = ['Comunicativo', 'Extrovertido', 'Prestativo', 'Facilidade com clientes e equipes'];
