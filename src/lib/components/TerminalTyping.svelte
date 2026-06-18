<script lang="ts">
  /**
   * TerminalTyping — small floating terminal window with auto-typed hacking commands.
   * Decorative — use as overlay element near the hero section.
   */
  import { onMount, onDestroy } from 'svelte';

  export let lines: string[] = [
    '$ whoami',
    '> el-houcine-qara :: full-stack-dev',
    '$ ssh ai-cluster.qaranetwork.com',
    '> connection established ✓',
    '$ npm run deploy --prod',
    '> [OK] Pipeline 100%',
    '$ python train.py --model neural',
    '> epoch 42/42 acc: 0.998 ✓',
    '$ docker compose up -d',
    '> 3 containers running ●',
    '$ git push origin main',
    '> [success] HEAD -> main',
    '$ curl -X POST /api/v1/predict',
    '> {"status":"ok","result":42}'
  ];
  export let speedMs: number = 32;

  let displayedLines: string[] = [];
  let currentLineIndex = 0;
  let currentCharIndex = 0;
  let timer: number | undefined;
  let cursorVisible = true;
  let cursorTimer: number | undefined;

  function type() {
    if (currentLineIndex >= lines.length) {
      timer = window.setTimeout(() => {
        displayedLines = [];
        currentLineIndex = 0;
        currentCharIndex = 0;
        type();
      }, 1800);
      return;
    }

    const line = lines[currentLineIndex];
    if (currentCharIndex < line.length) {
      const partial = line.slice(0, currentCharIndex + 1);
      displayedLines = [...displayedLines.slice(0, currentLineIndex), partial];
      currentCharIndex++;
      timer = window.setTimeout(type, speedMs + Math.random() * 18);
    } else {
      currentLineIndex++;
      currentCharIndex = 0;
      timer = window.setTimeout(type, 280);
    }
  }

  onMount(() => {
    type();
    cursorTimer = window.setInterval(() => (cursorVisible = !cursorVisible), 500);
  });

  onDestroy(() => {
    if (timer) clearTimeout(timer);
    if (cursorTimer) clearInterval(cursorTimer);
  });

  function lineColor(line: string) {
    if (line.startsWith('$')) return 'text-emerald-400';
    if (line.startsWith('>')) {
      if (line.includes('✓') || line.includes('ok') || line.includes('OK') || line.includes('success'))
        return 'text-cyan-300';
      if (line.includes('●')) return 'text-yellow-300';
      return 'text-slate-300';
    }
    return 'text-slate-200';
  }
</script>

<div
  class="font-mono text-[11px] sm:text-xs leading-relaxed
         bg-slate-950/85 backdrop-blur-md text-slate-100
         rounded-xl border border-emerald-500/30
         shadow-[0_0_24px_rgba(16,185,129,0.25)]
         overflow-hidden"
>
  <!-- Header -->
  <div class="flex items-center gap-1.5 px-3 py-2 border-b border-emerald-500/20 bg-slate-900/80">
    <span class="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
    <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
    <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
    <span class="ml-2 text-[10px] text-emerald-300/80 tracking-wide">qara@tech:~</span>
    <span class="ml-auto text-[9px] text-slate-500">zsh</span>
  </div>

  <!-- Body -->
  <div class="p-3 sm:p-4 min-h-[160px] sm:min-h-[200px]">
    {#each displayedLines as line, i}
      <div class="{lineColor(line)} whitespace-pre-wrap break-all">
        {line}{#if i === displayedLines.length - 1}<span class="inline-block w-2 h-3 align-middle ml-0.5 bg-emerald-400" style="opacity: {cursorVisible ? 1 : 0}"></span>{/if}
      </div>
    {/each}
  </div>
</div>
