<template>
    <div>
      <div class="header">
        <h2>Tu Informe de Sostenibilidad CSRD</h2>
        <p>Completa los módulos siguientes para generar tu informe de sostenibilidad conforme a la normativa CSRD.</p>
      </div>
  
      <!-- Barra de progreso -->
      <ReportProgressBar :completed="progress" />
  
      <!-- Tarjeta de progreso (opcional) -->
      <section class="panel" style="margin:24px 0">
        <h3 style="margin:0; font-size:22px; font-weight:800">Progreso del Informe</h3>
        <p style="margin:6px 0 0; color:var(--mutetext)">
          Has completado el {{ (progress*100).toFixed(0) }}% — {{ started }} de {{ modules.length }} módulos iniciados
        </p>
      </section>
  
      <!-- Grilla 1/2/3 columnas -->
      <section class="grid">
        <ModuleCard v-for="m in modules" :key="m.id"
          :index="m.id" :title="m.title" :desc="m.desc" :icon="m.icon"
          @open="openModule(m.id)" />
      </section>
    </div>
  </template>
  
  <script>
  import ReportProgressBar from '../components/ReportProgressBar.vue'
  import ModuleCard from '../components/ModuleCard.vue'
  
  export default {
    components:{ ReportProgressBar, ModuleCard },
    data(){
      return {
        progress: 0.35,
        started: 1,
        modules: [
          { id: 1, title: "Marco Estratégico", desc: "Define la visión y el propósito de tu empresa", icon: "🎯" },
          { id: 2, title: "Análisis de Doble Materialidad", desc: "Identifica tus temas más importantes", icon: "🔎" },
          { id: 3, title: "Desempeño Medioambiental", desc: "Reporta tus datos sobre Ejes E", icon: "🍃" },
          { id: 4, title: "Desempeño Social", desc: "Reporta tus datos sobre Ejes S", icon: "👥" },
          { id: 5, title: "Gobernanza", desc: "Reporta tus datos sobre Ejes G", icon: "🛡️" },
          { id: 6, title: "Finanzas Sostenibles", desc: "Calcula tus KPIs de la Taxonomía UE", icon: "🏦" },
        ]
      }
    },
    methods:{
      openModule(id){ this.$router.push(`/modulos/${id}`) }
    }
  }
  </script>
  