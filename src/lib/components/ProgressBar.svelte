<script lang="ts">
  export let value: number = 0;
  export let max: number = 100;
  export let color: 'blue' | 'green' | 'red' | 'yellow' | 'purple' = 'blue';
  export let showLabel: boolean = true;
  export let animated: boolean = true;
  
  $: percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500'
  };
  
  const bgColorClasses = {
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    red: 'bg-red-100',
    yellow: 'bg-yellow-100',
    purple: 'bg-purple-100'
  };
</script>

<div class="w-full">
  {#if showLabel}
    <div class="flex justify-between items-center mb-2">
      <span class="text-sm font-medium text-gray-700">Progress</span>
      <span class="text-sm font-medium text-gray-700">{Math.round(percentage)}%</span>
    </div>
  {/if}
  
  <div class="w-full bg-gray-200 rounded-full h-2.5">
    <div
      class="h-2.5 rounded-full {colorClasses[color]} {animated ? 'transition-all duration-500 ease-out' : ''}"
      style="width: {percentage}%"
    ></div>
  </div>
</div> 
