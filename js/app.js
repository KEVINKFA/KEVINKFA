import { perfil, numeros, faixa, servicos, rastreio, cupom, ficha, dicas } from './dados.js';

const $ = (s, el = document) => el.querySelector(s);
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const semMovimento = matchMedia('(prefers-reduced-motion: reduce)').matches;
const guardar = {
  ler(k, padrao) { try { return JSON.parse(localStorage.getItem(k)) ?? padrao; } catch { return padrao; } },
  gravar(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sem armazenamento */ } },
};

/* ---------- Tema ---------- */
const tema = guardar.ler('ka-tema', null);
if (tema) document.documentElement.dataset.theme = tema;
$('#tema').addEventListener('click', () => {
  const escuroAgora = document.documentElement.dataset.theme
    ? document.documentElement.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;
  const novo = escuroAgora ? 'light' : 'dark';
  document.documentElement.dataset.theme = novo;
  guardar.gravar('ka-tema', novo);
});

/* ---------- Campos simples ---------- */
document.querySelectorAll('[data-campo]').forEach((el) => {
  const v = perfil[el.dataset.campo];
  el.textContent = v;
  if (el.dataset.campo === 'email') el.href = `mailto:${v}`;
});
$('#ano').textContent = new Date().getFullYear();
$('#link-linkedin').href = perfil.linkedin;

/* ---------- Palavra que gira ---------- */
const giro = $('#giro');
let iGiro = 0;
setInterval(() => {
  giro.classList.add('sai');
  setTimeout(() => {
    iGiro = (iGiro + 1) % perfil.verbos.length;
    giro.textContent = perfil.verbos[iGiro];
    giro.classList.remove('sai');
  }, 260);
}, 2400);

/* ---------- Painel de faturamento ---------- */
$('#numeros').innerHTML = numeros.map((n) => `<li><strong>${esc(n.valor)}</strong><span>${esc(n.texto)}</span></li>`).join('');
const marcos = [50000, 100000, 150000, 200000];
$('#marcos').innerHTML = marcos
  .map((m) => `<div class="marco" style="left:${(m / perfil.faturado) * 100 - (m === perfil.faturado ? 1 : 0)}%" data-v="${m}"><span>${m / 1000}k</span></div>`)
  .join('');
const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

function soltarMoedas() {
  const painel = $('.painel');
  for (let i = 0; i < 14; i++) {
    const m = document.createElement('span');
    m.className = 'moeda';
    m.textContent = '$';
    m.style.left = '70%';
    m.style.top = '30%';
    m.style.setProperty('--dx', `${(Math.random() - .5) * 320}px`);
    m.style.setProperty('--dy', `${-60 - Math.random() * 200}px`);
    m.style.setProperty('--rot', `${(Math.random() - .5) * 720}deg`);
    m.style.animationDelay = `${i * 25}ms`;
    painel.append(m);
    setTimeout(() => m.remove(), 1600);
  }
}

function contar() {
  const alvo = perfil.faturado;
  const duracao = semMovimento ? 1 : 2600;
  const t0 = performance.now();
  const valor = $('#contador'), barra = $('#trilha');
  const quadro = (t) => {
    const p = Math.min(1, (t - t0) / duracao);
    const e = 1 - Math.pow(1 - p, 4);
    const atual = alvo * e;
    valor.textContent = brl.format(Math.round(atual / 10) * 10);
    barra.style.width = `${e * 100}%`;
    document.querySelectorAll('.marco').forEach((m) => m.classList.toggle('ok', atual >= Number(m.dataset.v) - 1));
    if (p < 1) return requestAnimationFrame(quadro);
    valor.textContent = brl.format(alvo);
    $('#carimbo').classList.add('bateu');
    if (!semMovimento) soltarMoedas();
  };
  requestAnimationFrame(quadro);
}
setTimeout(contar, 500);
$('#contador').addEventListener('click', () => { $('#carimbo').classList.remove('bateu'); contar(); });

/* ---------- Faixa ---------- */
const itensFaixa = faixa.map((t) => `<span>${esc(t)}</span>`).join('');
$('#faixa').innerHTML = itensFaixa + itensFaixa;

/* ---------- Carrinho ---------- */
let carrinho = new Set(guardar.ler('ka-carrinho', []).filter((id) => servicos.some((s) => s.id === id)));

function atualizarCarrinho(pular = false) {
  const qtd = carrinho.size;
  $('#carrinho-qtd').textContent = qtd;
  $('#carrinho').setAttribute('aria-label', `Carrinho de contato: ${qtd} ${qtd === 1 ? 'item' : 'itens'}`);
  if (pular) {
    const c = $('#carrinho');
    c.classList.remove('pulou'); void c.offsetWidth; c.classList.add('pulou');
  }
  document.querySelectorAll('.anuncio').forEach((card) => {
    const dentro = carrinho.has(card.dataset.id);
    card.classList.toggle('no-carrinho', dentro);
    const b = $('.anuncio__btn', card);
    b.textContent = dentro ? '✓ No carrinho' : '+ Adicionar ao carrinho';
    b.setAttribute('aria-pressed', dentro);
  });
  const escolhidos = servicos.filter((s) => carrinho.has(s.id));
  $('#itens-pacote').innerHTML = escolhidos.length
    ? escolhidos.map((s) => `<li>${s.icone} ${esc(s.titulo)} <button type="button" data-tirar="${s.id}" aria-label="Tirar ${esc(s.titulo)} do pacote">×</button></li>`).join('')
    : '<li class="vazio">Uma boa conversa sobre a sua loja. (Dica: adicione itens pela vitrine.)</li>';

  const assunto = escolhidos.length ? `Marketplace: ${escolhidos.map((s) => s.titulo).join(', ')}` : 'Vamos conversar sobre marketplace';
  const corpo = `Olá, Kevin! Vi seu portfólio.\n\n${escolhidos.length ? `Tenho interesse em:\n${escolhidos.map((s) => `- ${s.titulo}`).join('\n')}\n\n` : ''}Sobre a minha loja:\n`;
  $('#enviar-email').href = `mailto:${perfil.email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
  guardar.gravar('ka-carrinho', [...carrinho]);
}

$('#lista-servicos').innerHTML = servicos.map((s, i) => `
  <article class="anuncio revela" data-id="${s.id}" style="--atraso:${(i % 3) * 0.08}s">
    <div class="anuncio__foto">${s.selo ? `<span class="anuncio__selo">${esc(s.selo)}</span>` : ''}<em aria-hidden="true">${s.icone}</em></div>
    <div class="anuncio__corpo">
      <h3>${esc(s.titulo)}</h3>
      <p class="anuncio__texto">${esc(s.texto)}</p>
      <ul>${s.itens.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
      <div class="anuncio__tags">${s.tags.map((t) => `<span>${esc(t)}</span>`).join('')}</div>
      <p class="anuncio__frete">Orçamento grátis · resposta rápida</p>
      <button class="anuncio__btn" type="button" aria-pressed="false"></button>
    </div>
  </article>`).join('');

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.anuncio__btn');
  if (btn) {
    const id = btn.closest('.anuncio').dataset.id;
    carrinho.has(id) ? carrinho.delete(id) : carrinho.add(id);
    atualizarCarrinho(carrinho.has(id));
    return;
  }
  const tirar = e.target.closest('[data-tirar]');
  if (tirar) { carrinho.delete(tirar.dataset.tirar); atualizarCarrinho(); }
});

// Inclinação 3D dos anúncios
if (!semMovimento && matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.anuncio').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}

/* ---------- Rastreio ---------- */
$('#lista-rastreio').insertAdjacentHTML('beforeend', rastreio.map((r, i) => `
  <li class="evento revela${r.atual ? ' atual' : ''}" style="--atraso:${i * 0.06}s">
    <div class="evento__topo"><span class="evento__status">${esc(r.status)}</span><span class="evento__quando">${esc(r.quando)}</span></div>
    <h3>${esc(r.titulo)}</h3>
    <p class="evento__local">📍 ${esc(r.local)}</p>
    <p class="evento__texto">${esc(r.texto)}</p>
    ${r.itens ? `<details><summary>Ver detalhes</summary><ul>${r.itens.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></details>` : ''}
  </li>`).join(''));

const linha = $('.rastreio__linha');
function moverCaminhao() {
  const r = linha.getBoundingClientRect();
  const p = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
  $('#rastreio-progresso').style.height = `${p * 100}%`;
  $('#caminhao').style.top = `${p * 100}%`;
}

/* ---------- Ficha e cupom ---------- */
$('#lista-ficha').innerHTML = ficha.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join('');
$('#lista-cupom').innerHTML = cupom.map((c, i) => `
  <li><span class="n">${String(i + 1).padStart(3, '0')}</span><span class="nome">${esc(c.item)}</span>
  <span class="sit${c.situacao === 'Cursando' ? ' cursando' : ''}">${esc(c.situacao.toUpperCase())}</span>
  <span class="origem">${esc(c.origem)}${c.quando ? ` · ${esc(c.quando)}` : ''}</span></li>`).join('');

// Código de barras determinístico a partir de um texto
function barras(svg, texto, alturaTexto = false) {
  let h = 2166136261;
  const bits = [];
  for (let i = 0; i < 64; i++) {
    h ^= texto.charCodeAt(i % texto.length) + i; h = Math.imul(h, 16777619) >>> 0;
    bits.push(1 + (h % 4));
  }
  let x = 0; const rects = [];
  bits.forEach((w, i) => { if (i % 2 === 0) rects.push(`<rect x="${x}" y="0" width="${w}" height="100"/>`); x += w; });
  svg.setAttribute('viewBox', `0 0 ${x} 100`);
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.innerHTML = rects.join('');
}
barras($('#barras-cupom'), 'formacao-kevin');
barras($('#barras-etiqueta'), perfil.email);

/* ---------- Copiar e-mail ---------- */
$('#copiar').addEventListener('click', async () => {
  let ok = true;
  try { await navigator.clipboard.writeText(perfil.email); } catch { ok = false; }
  const t = document.createElement('div');
  t.className = 'copiado';
  t.setAttribute('role', 'status');
  t.textContent = ok ? `Copiado: ${perfil.email}` : perfil.email;
  document.body.append(t);
  setTimeout(() => t.remove(), 2200);
});

/* ---------- Revelar ao rolar ---------- */
// Também revela o que ficou para trás num salto de âncora
let pendentes = [...document.querySelectorAll('.revela, #cupom')];
function revelar() {
  pendentes = pendentes.filter((el) => {
    if (el.getBoundingClientRect().top > innerHeight * 0.88) return true;
    el.classList.add(el.id === 'cupom' ? 'impresso' : 'visto');
    return false;
  });
}

/* ---------- Topo e menu ativo ---------- */
const links = [...document.querySelectorAll('.menu a')];
function aoRolar() {
  $('.topo').classList.toggle('rolou', scrollY > 10);
  let atual = '';
  document.querySelectorAll('main section[id]').forEach((s) => { if (s.getBoundingClientRect().top < innerHeight * 0.4) atual = s.id; });
  links.forEach((a) => a.classList.toggle('ativo', a.getAttribute('href') === `#${atual}`));
  moverCaminhao();
  revelar();
}
addEventListener('scroll', aoRolar, { passive: true });
addEventListener('resize', aoRolar);
aoRolar();

/* ---------- Dicas de vendedor ---------- */
const aviso = $('#aviso');
let iDica = 0, fechouDica = false;
function mostrarDica() {
  if (fechouDica) return;
  $('#aviso-texto').textContent = dicas[iDica++ % dicas.length];
  aviso.classList.remove('saindo');
  aviso.hidden = false;
  setTimeout(() => {
    if (fechouDica) return;
    aviso.classList.add('saindo');
    setTimeout(() => { aviso.hidden = true; }, 300);
  }, 6500);
}
$('#aviso-fechar').addEventListener('click', () => { fechouDica = true; aviso.hidden = true; });
setTimeout(() => { mostrarDica(); setInterval(mostrarDica, 22000); }, 7000);

atualizarCarrinho();
