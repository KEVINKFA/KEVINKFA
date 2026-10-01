import { perfil, numeros, etapas, servicos, trajetoria, formacao, perfilPessoal } from './dados.js';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const pad = (n) => String(n).padStart(2, '0');
const semMovimento = matchMedia('(prefers-reduced-motion: reduce)').matches;
const guardar = {
  ler(k) { try { return localStorage.getItem(k); } catch { return null; } },
  gravar(k, v) { try { localStorage.setItem(k, v); } catch { /* sem armazenamento */ } },
};

/* ---------- Tema ---------- */
const temaSalvo = guardar.ler('ka-tema');
if (temaSalvo) document.documentElement.dataset.theme = temaSalvo;
$('#tema').addEventListener('click', () => {
  const atual = document.documentElement.dataset.theme
    ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const novo = atual === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = novo;
  guardar.gravar('ka-tema', novo);
});

/* ---------- Campos simples ---------- */
$$('[data-campo]').forEach((el) => { el.textContent = perfil[el.dataset.campo]; });
$$('[data-link="linkedin"]').forEach((a) => { a.href = perfil.linkedin; });
$$('[data-link="email"]').forEach((a) => { a.href = `mailto:${perfil.email}`; a.textContent = perfil.email; });
const ano = new Date().getFullYear();
$('#ano').textContent = ano;
$('#ano-topo').textContent = ano;

/* ---------- Título de abertura ---------- */
const chamada = $('#chamada');
chamada.setAttribute('aria-label', perfil.chamada.join(' '));
chamada.innerHTML = perfil.chamada
  .map((l, i, todas) => {
    const texto = i === todas.length - 1 ? `<em>${esc(l)}</em>` : esc(l);
    return `<span class="linha" aria-hidden="true"><span style="--atraso:${0.1 + i * 0.09}s">${texto}</span></span>`;
  })
  .join('');
requestAnimationFrame(() => requestAnimationFrame(() => chamada.classList.add('pronto')));

/* ---------- Métrica: odômetro ---------- */
$('#numeros').innerHTML = numeros.map((n) => `<li><strong>${esc(n.valor)}</strong><span>${esc(n.texto)}</span></li>`).join('');
const valorFmt = perfil.faturado.toLocaleString('pt-BR');
const odometro = $('#odometro');
let ordem = 0;
odometro.innerHTML = [...valorFmt].map((c) => {
  if (!/\d/.test(c)) return `<span class="sep">${c}</span>`;
  const coluna = Array.from({ length: 20 }, (_, i) => `<span>${i % 10}</span>`).join('');
  return `<span class="digito" data-d="${c}"><span style="--atraso:${0.15 + ordem++ * 0.08}s">${coluna}</span></span>`;
}).join('');
function girarOdometro() {
  $$('.digito', odometro).forEach((d) => { d.firstElementChild.style.transform = `translateY(-${10 + Number(d.dataset.d)}em)`; });
  $('#regua').style.width = '100%';
}

/* ---------- Atuação: ciclo + serviços ---------- */
const C = 2 * Math.PI * 120;
const arco = $('#ciclo-arco');
arco.style.strokeDasharray = `${C}`;
arco.style.strokeDashoffset = `${C}`;
const posicoes = [
  { x: 160, y: 40, tx: 160, ty: 22, ancora: 'middle' },
  { x: 280, y: 160, tx: 294, ty: 164, ancora: 'start' },
  { x: 160, y: 280, tx: 160, ty: 306, ancora: 'middle' },
  { x: 40, y: 160, tx: 26, ty: 164, ancora: 'end' },
];
$('#ciclo-nos').innerHTML = etapas.map((e, i) => {
  const p = posicoes[i];
  return `<g class="ciclo__no" data-etapa="${e.id}"><circle cx="${p.x}" cy="${p.y}" r="5"/><text x="${p.tx}" y="${p.ty}" text-anchor="${p.ancora}">${esc(e.nome)}</text></g>`;
}).join('');
$('#ciclo-legenda').innerHTML = etapas.map((e) => `<li><span><strong>${esc(e.nome)}.</strong> ${esc(e.texto)}</span></li>`).join('');

const nomeEtapa = Object.fromEntries(etapas.map((e) => [e.id, e.nome]));
$('#servicos').innerHTML = servicos.map((s, i) => `
  <li class="servico revela" data-etapa="${s.etapa}" style="--atraso:${(i % 2) * 0.06}s">
    <span class="servico__n">${pad(i + 1)}</span>
    <div>
      <span class="servico__etapa">${esc(nomeEtapa[s.etapa])}</span>
      <h3>${esc(s.titulo)}</h3>
      <p>${esc(s.texto)}</p>
      <ul>${s.itens.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
    </div>
  </li>`).join('');

let etapaAtual = -1;
let servicoAtual = null;
function ativarServico(el) {
  if (!el || el === servicoAtual) return;
  servicoAtual = el;
  $$('.servico').forEach((s) => s.classList.toggle('ativo', s === el));
  const i = etapas.findIndex((e) => e.id === el.dataset.etapa);
  if (i === etapaAtual) return;
  etapaAtual = i;
  arco.style.strokeDashoffset = `${C - C * (i / etapas.length) - (i === 0 ? 0.001 : 0)}`;
  $$('.ciclo__no').forEach((n, j) => {
    n.classList.toggle('ativo', j === i);
    n.classList.toggle('feito', j < i);
  });
  const centro = $('.ciclo__centro');
  $('#ciclo-passo').textContent = `Etapa ${i + 1} de ${etapas.length}`;
  $('#ciclo-nome').textContent = etapas[i].nome;
  $('#ciclo-texto').textContent = etapas[i].texto;
  centro.classList.remove('troca'); void centro.offsetWidth; centro.classList.add('troca');
}
$$('.servico').forEach((s) => s.addEventListener('pointerenter', () => ativarServico(s)));
ativarServico($('.servico'));

function servicoNoFoco() {
  const alvo = innerHeight * 0.45;
  let melhor = null, dist = Infinity;
  $$('.servico').forEach((s) => {
    const r = s.getBoundingClientRect();
    const d = Math.abs(r.top + r.height / 2 - alvo);
    if (d < dist) { dist = d; melhor = s; }
  });
  const lista = $('#servicos').getBoundingClientRect();
  if (lista.top < innerHeight && lista.bottom > 0) ativarServico(melhor);
}

/* ---------- Trajetória ---------- */
$('#lista-trajetoria').innerHTML = trajetoria.map((c, i) => `
  <li class="cargo revela${i === 0 ? ' atual' : ''}">
    <p class="cargo__periodo">${esc(c.periodo)}</p>
    <div>
      <h3>${esc(c.titulo)}</h3>
      <p class="cargo__empresa">${esc(c.empresa)}</p>
      <p class="cargo__texto">${esc(c.texto)}</p>
      ${c.itens ? `<ul class="cargo__itens" id="itens-${i}">${c.itens.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
    </div>
    ${c.itens
      ? `<button class="cargo__abrir" type="button" aria-expanded="false" aria-controls="itens-${i}">Atividades <i aria-hidden="true">+</i></button>`
      : `<span class="cargo__selo"><i class="ponto"></i>Em andamento</span>`}
  </li>`).join('');
$('#lista-trajetoria').addEventListener('click', (e) => {
  const b = e.target.closest('.cargo__abrir');
  if (!b) return;
  const aberto = b.closest('.cargo').classList.toggle('aberto');
  b.setAttribute('aria-expanded', aberto);
});

/* ---------- Formação ---------- */
$('#curso-situacao').textContent = `Graduação · ${formacao.situacao}`;
$('#curso-nome').textContent = formacao.curso;
$('#curso-inst').textContent = formacao.instituicao;
const [inicio, fim] = formacao.periodo.split('—').map((t) => Number(t.trim()));
$('#curso-periodo').innerHTML = `<span>${inicio}</span><span>${fim}</span>`;
const progresso = Math.min(1, Math.max(0, (Date.now() - new Date(inicio, 1, 1)) / (new Date(fim, 11, 31) - new Date(inicio, 1, 1))));
$('#perfil-pessoal').innerHTML = perfilPessoal.map((t) => `<li>${esc(t)}</li>`).join('');
$('#lista-certificados').innerHTML = formacao.certificados.map((c) => `
  <li class="revela"><strong>${esc(c.nome)}</strong><span class="origem">${esc(c.origem)}</span><span class="ano">${esc(c.ano)}</span></li>`).join('');

/* ---------- Copiar e-mail ---------- */
const aviso = $('#aviso');
let tAviso;
$('#copiar').addEventListener('click', async () => {
  let ok = true;
  try { await navigator.clipboard.writeText(perfil.email); } catch { ok = false; }
  aviso.textContent = ok ? 'E-mail copiado' : perfil.email;
  aviso.classList.add('ver');
  clearTimeout(tAviso);
  tAviso = setTimeout(() => aviso.classList.remove('ver'), 2200);
});

/* ---------- Rolagem: revelar, menu ativo, gatilhos ---------- */
let pendentes = $$('.revela');
let odometroGirou = false, cursoAnimou = false;
const links = $$('.menu a');
function aoRolar() {
  $('.topo').classList.toggle('rolou', scrollY > 8);
  pendentes = pendentes.filter((el) => {
    if (el.getBoundingClientRect().top > innerHeight * 0.9) return true;
    el.classList.add('visto');
    return false;
  });
  if (!odometroGirou && $('.metrica').getBoundingClientRect().top < innerHeight * 0.95) {
    odometroGirou = true;
    setTimeout(girarOdometro, semMovimento ? 0 : 350);
  }
  if (!cursoAnimou && $('.curso__barra').getBoundingClientRect().top < innerHeight * 0.9) {
    cursoAnimou = true;
    $('#curso-progresso').style.width = `${progresso * 100}%`;
  }
  let atual = '';
  $$('main section[id]').forEach((s) => { if (s.getBoundingClientRect().top < innerHeight * 0.4) atual = s.id; });
  links.forEach((a) => a.classList.toggle('ativo', a.getAttribute('href') === `#${atual}`));
  servicoNoFoco();
}
addEventListener('scroll', aoRolar, { passive: true });
addEventListener('resize', aoRolar);
aoRolar();
