# Uncomplicated Unit Testing (BEM) with Poku: a lightweight, modern, and Brazilian alternative

Have you ever tried setting up unit tests for a simple TypeScript project, only to find yourself opening five config files and installing 12 different packages?

If the answer is yes, welcome to the club.

Today I want to introduce you to an alternative that completely changed my relationship with automated tests: Poku — a minimalist, efficient, and, surprise, Brazilian testing framework.

In this post, I’ll show you why it might be the perfect solution for your small projects, libraries, scripts, or even that tiny function you just wanted to validate without falling into a configuration black hole.

## The struggle of just wanting to test a sum(a, b)

Let’s start with the harsh truth: configuring tools like Jest or Vitest, especially in ESM + TypeScript environments, can get annoying very quickly.

You start with good intentions:

```bash
npm install --save-dev jest ts-jest @types/jest
```

And then comes the cascade:

* jest.config.ts
* tsconfig.json
* babel.config.js
* Plugins, transforms, path mapping…

Want to use ESM? Get ready to deal with experimental-vm-modules, mocking issues, and configuring Jest with lots of exceptions.

Even Vitest, which is more modern and integrates with Vite, requires specific configuration if you're using pure ESM with Node.

At the end of the day, all you wanted was to test this:

```typescript
function sum(a: number, b: number): number {
  return a + b;
}
```

And get a simple result like: ✅ sum(2, 3) returns 5.

But it feels like you need to perform a ritual for that.

## Meet Poku: less friction, more tested code

That’s when I discovered Poku.

Created by Wesley, Poku is an ultra-minimalist test runner, focused on simplicity and productivity.

You install it with a single command:

```bash
npm install -D poku
```

And that's it. No need for config, babel, ts-jest, plugins, or any other extra weight.

### What makes Poku different?

* Native ESM support
* Works perfectly with TypeScript, no need for pre-compilation
* Uses Node's own assert
* Has a super simple API
* Ideal for libs, CLIs, scripts, utilities — anything that doesn’t need a cannon to kill a mosquito

## Hands-on: validating strong passwords

Here’s a real example of how I used Poku to test a password validation function.

**File:** `validador.ts`

```typescript
export function isStrongPassword(password: string): boolean {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password)
  );
}
```

**File:** `validador.test.ts`

```typescript
import { assert, test } from 'poku';
import { isStrongPassword } from './validador.js';

test('Valid password: Abc12345', () => {
  assert.ok(isStrongPassword('Abc12345'));
});

test('Missing number', () => {
  assert.ok(!isStrongPassword('Abcdefgh'));
});

test('Missing uppercase', () => {
  assert.ok(!isStrongPassword('abc12345'));
});

test('Too short', () => {
  assert.ok(!isStrongPassword('Ab1'));
});
```

To run the tests:

```bash
npx poku
```

The result is direct in the terminal, fast, and without overhead.

## Handling asynchronous functions

One of Poku's differentiators is that it handles async tests very well — no need for done(), async setup, or any special syntax.

Here’s a simple example with setTimeout:

```typescript
import { test } from 'poku';
import assert from 'node:assert/promises';

async function fetchData() {
  return new Promise((resolve) => setTimeout(() => resolve(42), 100));
}

test('fetchData returns 42', async () => {
  const result = await fetchData();
  assert.strictEqual(result, 42);
});
```

You can use Node's own `assert/promises`. No hacks needed.

## A real example with beforeEach()

Imagine you're testing a task list. You can use Poku’s beforeEach to initialize state before each test:

```typescript
import { test, beforeEach } from 'poku';
import assert from 'node:assert';

let tasks: string[] = [];

beforeEach(() => {
  tasks = ['Wash dishes'];
});

test('adds a new task', () => {
  tasks.push('Study Poku');
  assert.deepStrictEqual(tasks, ['Wash dishes', 'Study Poku']);
});

test('initializes with 1 task', () => {
  assert.strictEqual(tasks.length, 1);
});
```

It works exactly as you expect, keeping each test isolated.

## Comparison: Poku vs. Jest vs. Vitest

**When should you use Poku?**

If you're building:

* a library
* a command-line tool (CLI)
* a simple Node script
* a utility module
* or just want to test an isolated function…

… Poku is an amazing choice.

But if your project is a React, Vue app, or a large application with complex UI tests, deep mocks, and integrations, maybe Jest or Vitest would be better.

## Gratitude from someone who tests with ❤️

Testing can (and should) be light. What’s often missing isn’t a new feature but less friction, more focus on the essentials, and tools that respect our time.

That’s why this post is also a thank you to the Brazilian open-source community.

People like Wesley Imon, creator of Poku, who dedicates time and talent to making other developers' lives simpler.

If you haven’t tried Poku yet, I strongly recommend it. Check out the GitHub:

[https://github.com/wellwelwel/poku](https://github.com/wellwelwel/poku)

It might not be the ultimate test runner for every project…

But it might be exactly what you needed to enjoy writing tests again.
