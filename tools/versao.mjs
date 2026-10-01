// Antes de publicar: node tools/versao.mjs
// Troca o ?v= do CSS e dos scripts para o navegador não usar arquivos antigos do cache.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const raiz = fileURLToPath(new URL('..', import.meta.url));
const v = new Date().toISOString().replace(/\D/g, '').slice(0, 12);
const alvos = [
  ['index.html', [/(css\/style\.css)(\?v=\w+)?/g, /(js\/app\.js)(\?v=\w+)?/g]],
  ['js/app.js', [/(\.\/dados\.js)(\?v=\w+)?/g]],
];

for (const [arquivo, padroes] of alvos) {
  const caminho = raiz + arquivo;
  let texto = await readFile(caminho, 'utf8');
  for (const p of padroes) texto = texto.replace(p, `$1?v=${v}`);
  await writeFile(caminho, texto);
}
console.log(`Versão ${v} aplicada.`);
