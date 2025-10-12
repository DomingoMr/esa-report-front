<template>
    <div class="bg-app-panel rounded-xl2 shadow-soft p-6 border border-white/5">
      <h3 class="text-2xl font-bold">Progreso del Informe</h3>
      <p class="text-app-mutetext mt-1">
        Has completado el {{ (completed * 100).toFixed(0) }}% de tu informe de sostenibilidad
      </p>
  
      <div class="mt-4 h-3 bg-black/20 rounded-full overflow-hidden">
        <div class="h-full bg-app-accent rounded-full transition-all" :style="{ width: (completed * 100)+'%' }"></div>
      </div>
  
      <p class="text-app-mutetext mt-2 text-sm">
        {{ started }} de {{ total }} módulos iniciados
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProgressCard",
    props: {
      completed: { type: Number, default: 0 },
      started: { type: Number, default: 0 },
      total: { type: Number, default: 6 },
    },
  };
  </script>
  