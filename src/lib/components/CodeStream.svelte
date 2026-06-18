<script lang="ts">
  /**
   * CodeStream — code/dev themed background.
   * Floating code snippets, brackets and git-like symbols that drift upward.
   * Pure DOM, no canvas, very light.
   */
  import { onMount } from 'svelte';

  export let opacity: number = 0.35;
  export let count: number = 22;

  interface Snippet {
    id: number;
    text: string;
    left: number;
    duration: number;
    delay: number;
    fontSize: number;
    color: string;
  }

  const snippets = [
    'const dev = () => true',
    'function build() { return ✨ }',
    'git commit -m "feat: ✨"',
    'npm run dev',
    'docker compose up',
    'kubectl apply -f .',
    '<App />',
    'await fetch(api)',
    'export default <T>',
    'pip install ai',
    'SELECT * FROM users',
    'PUT /api/v1/deploy',
    'console.log("🚀")',
    'while(true) { learn(); }',
    '0xDEADBEEF',
    '{ ...spread }',
    '() => Promise.resolve()',
    'async/await',
    'try { ... } catch(e)',
    '/* TODO: AI integration */',
    'import { magic } from "core"',
    'type Brain<T> = Neural<T>',
    '<svelte:fragment slot="ai" />',
    '$ ssh root@server',
    'rm -rf node_modules',
    '#!/bin/bash',
    '✓ build passed',
    'export const train = ml.fit()'
  ];

  const colors = [
    'text-emerald-400',
    'text-cyan-400',
    'text-purple-400',
    'text-pink-400',
    'text-indigo-400',
    'text-sky-400'
  ];

  let items: Snippet[] = [];

  onMount(() => {
    items = Array.from({ length: count }, (_, i) => ({
      id: i,
      text: snippets[Math.floor(Math.random() * snippets.length)],
      left: Math.random() * 100,
      duration: 16 + Math.random() * 18,
      delay: -Math.random() * 30,
      fontSize: 11 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
  });
</script>

<div
  class="absolute inset-0 pointer-events-none overflow-hidden"
  style="opacity: {opacity};"
  aria-hidden="true"
>
  {#each items as it (it.id)}
    <span
      class="absolute font-mono whitespace-nowrap {it.color}
             drop-shadow-[0_0_4px_rgba(168,85,247,0.5)] code-snippet"
      style="left: {it.left}%;
             font-size: {it.fontSize}px;
             animation-duration: {it.duration}s;
             animation-delay: {it.delay}s;"
    >
      {it.text}
    </span>
  {/each}
</div>

<style>
  .code-snippet {
    bottom: -10%;
    animation-name: float-up;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    will-change: transform, opacity;
  }

  @keyframes float-up {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 0;
    }
    10% { opacity: 1; }
    50% { transform: translateY(-50vh) translateX(20px); }
    90% { opacity: 1; }
    100% {
      transform: translateY(-110vh) translateX(-20px);
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .code-snippet { animation: none !important; opacity: 0.2 !important; }
  }
</style>
