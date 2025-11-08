<script lang="ts">
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let color: 'primary' | 'white' | 'gray' = 'primary';
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };
  
  const colorClasses = {
    primary: 'text-blue-600',
    white: 'text-white',
    gray: 'text-gray-600'
  };
</script>

<div class="flex justify-center items-center">
  <div class="animate-spin rounded-full border-2 border-gray-300 border-t-current {sizeClasses[size]} {colorClasses[color]}"></div>
</div> 
