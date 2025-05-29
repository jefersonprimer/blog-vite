# Testes unitários (BEM) descomplicados com Poku: uma alternativa leve, moderna e brasileira

Você já passou pela experiência de configurar testes unitários em um projeto simples que usa TypeScript e, quando viu, estava abrindo 5 arquivos de configuração e instalando 12 pacotes diferentes?

Se a resposta for sim, bem-vindo ao clube.

Hoje eu quero te apresentar uma alternativa que mudou completamente minha relação com testes automatizados: o Poku — um framework de testes minimalista, eficiente e, olha só, brasileiro.

Neste post, vou te mostrar por que ele pode ser a solução perfeita para seus projetos pequenos, suas bibliotecas, seus scripts e até para aquela funçãozinha que você só queria validar sem abrir um buraco negro de configurações.


### O drama de quem só queria testar um sum(a, b)
Vamos começar com a verdade nua e crua: configurar ferramentas como Jest ou Vitest, especialmente em ambientes ESM + TypeScript, pode ficar muito chato muito rápido.

Você começa com boas intenções:

npm install --save-dev jest ts-jest @types/jest
E aí vem a cascata:

- jest.config.ts
- tsconfig.json
- babel.config.js
- Plugins, transforms, mapeamento de path…

Quer usar ESM? Prepare-se pra lidar com experimental-vm-modules, resolver problemas de mock, e configurar o Jest para um monte de exceções.

Mesmo o Vitest, que é bem mais moderno e tem integração com Vite, exige configuração específica se você estiver usando ESM puro com Node.

No fim das contas, tudo o que você queria era testar isso aqui:

function sum(a: number, b: number): number {

  return a + b;

}

E ter um resultado simples como: ✅ sum(2, 3) retorna 5.

Mas parece que você precisa invocar um ritual pra isso.


### Conhecendo o Poku: menos fricção, mais código testado
Foi aí que descobri o Poku.

Criado pelo Wesley, o Poku é um test runner ultra minimalista, feito com foco em simplicidade e produtividade.

Você instala com um único comando:

npm install -D poku
E pronto. Não precisa de configuração, babel, ts-jest, plugins ou qualquer outro peso extra.

O que o Poku traz de diferente?
Suporte nativo a ESM
Funciona perfeitamente com TypeScript, sem precisar de compilação prévia
Usa o assert do próprio Node
Tem uma API super simples
É ideal para libs, CLIs, scripts, utilitários — tudo que não precisa de um canhão pra matar mosquito
Mão na massa: validando senhas fortes
Aqui vai um exemplo real de como usei o Poku para testar uma função de validação de senha.

Arquivo validador.ts
export function isStrongPassword(password: string): boolean {

  return (

    password.length >= 8 &&

    /[A-Z]/.test(password) &&

    /[a-z]/.test(password) &&

    /[0-9]/.test(password)

  );

}
Arquivo validador.test.ts
import { assert, test } from 'poku';

import { isStrongPassword } from './validador.js';

test('Senha válida: Abc12345', () => {

  assert.ok(isStrongPassword('Abc12345'));

});

test('Falta número', () => {

  assert.ok(!isStrongPassword('Abcdefgh'));

});

test('Falta maiúscula', () => {

  assert.ok(!isStrongPassword('abc12345'));

});

test('Muito curta', () => {

  assert.ok(!isStrongPassword('Ab1'));

});
Executar? Só rodar:

npx poku
O resultado é direto no terminal, rápido e sem overhead.

Lidando com funções assíncronas
Um dos diferenciais do Poku é que ele lida muito bem com testes assíncronos — sem precisar de done(), async setup, ou nenhuma sintaxe especial.

Veja este exemplo simples com setTimeout:

import { test } from 'poku';

import assert from 'node:assert/promises'; // O Poku permite importar tanto o 'assert' direto do node quanto a função wrapper da própria lib

async function fetchData() {

  return new Promise((resolve) => setTimeout(() => resolve(42), 100));

}

test('fetchData retorna 42', async () => {

  const result = await fetchData();

  assert.strictEqual(result, 42);

});
Você pode usar assert/promises do próprio Node. Sem gambiarras.

Um exemplo real com beforeEach()
Imagine que você está testando uma lista de tarefas. Você pode usar o beforeEach do Poku para inicializar o estado a cada teste:

import { test, beforeEach } from 'poku';

import assert from 'node:assert';

let tasks: string[] = [];

beforeEach(() => {

  tasks = ['Lavar louça'];

});

test('adiciona uma nova tarefa', () => {

  tasks.push('Estudar Poku');

  assert.deepStrictEqual(tasks, ['Lavar louça', 'Estudar Poku']);

});

test('inicializa com 1 tarefa', () => {

  assert.strictEqual(tasks.length, 1);

});
Funciona exatamente como você espera, e mantém cada teste isolado.

Comparativo: Poku vs. Jest vs. Vitest
Quando usar o Poku?
Se você está construindo:

uma biblioteca
uma ferramenta de linha de comando (CLI)
um script Node simples
um módulo utilitário
ou só quer testar uma função isolada…
… o Poku é uma escolha incrível.

Agora, se o seu projeto é um app React, Vue ou uma aplicação grande com testes complexos de UI, mocks profundos, e integrações, talvez seja melhor usar Jest ou Vitest.

Gratidão de quem testa com ❤️
Testar pode (e deve) ser leve. O que falta muitas vezes não é uma nova feature, mas sim menos fricção, mais foco no essencial e ferramentas que respeitem nosso tempo.

E é por isso que esse post é também um agradecimento à comunidade open-source brasileira.
Gente como o Wesley Imon, criador do Poku, que dedica tempo e talento para tornar o dia a dia de outros devs mais simples.

Se você ainda não conhece o Poku, recomendo fortemente experimentar. Aqui tem o Github dele: https://github.com/wellwelwel/poku
Ele pode não ser o test runner definitivo para todos os projetos…
Mas pode ser exatamente o que você precisava para voltar a escrever testes com prazer.