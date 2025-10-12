<template>
    <div>
      <div class="header">
        <h2>Módulo 4: Desempeño Social</h2>
        <p>A continuación, reporta los datos para los temas sociales que has identificado como materiales. Completa cada una de las siguientes secciones.</p>
      </div>
  
      <section class="form-stack">
        <!-- 1) PROGRESO DEL MÓDULO -->
        <div class="panel">
          <div class="step-head">
            <div class="step-title">
              <strong>Progreso del Módulo Social</strong>
              <div class="subtitle">1 estándares sociales identificados para reporte</div>
            </div>
          </div>
  
          <p style="margin:0; font-weight:700;">
            {{ completedMaterial }}/1 completadas
          </p>
        </div>
  
        <!-- Título de grupo: Estándares Materiales -->
        <div class="group-title">Estandares Materiales</div>
  
        <!-- 2) PASO 1 (MATERIAL) -->
        <div class="panel">
          <div class="step-head">
            <div class="step-title">
              <strong>ESRS S1: Personal Propio</strong>
              <div class="subtitle">Reporta sobre las condiciones laborales, diversidad, formación y salud y seguridad de tus empleados.</div>
            </div>
          </div>
  
          <div class="row-between">
            <div class="status-wrap">
              <span>Estado: </span>
              <span :class="['status', step1.completed ? 'status-completado' : 'status-pendiente']">
                {{ step1.completed ? 'Completado' : 'Pendiente' }}
              </span>
            </div>
  
            <button
              class="btn btn-secondary"
              :disabled="step1.completed"
              @click="complete('step1')"
            >
              Completar
            </button>
          </div>
        </div>
  
        <!-- Título de grupo: Estándares No Materiales -->
        <div class="group-title">Estandares No Materiales</div>
  
        <!-- 3) PASO 2 (NO MATERIAL) -->
        <div class="panel">
          <div class="step-head">
            <div class="step-title">
              <strong>ESRS S2: Trabajadores de la Cadena de Valor</strong>
              <div class="subtitle">Según tu análisis, este tema no es material y no requiere reporte.</div>
            </div>
          </div>
  
          <div class="row-between">
            <div class="status-wrap">
              <span>Estado: </span>
              <span :class="['status', step2.completed ? 'status-completado' : 'status-pendiente']">
                {{ step2.completed ? 'Completado' : 'Pendiente' }}
              </span>
            </div>
  
            <button
              class="btn btn-secondary"
              :disabled="step2.completed"
              @click="complete('step2')"
            >
              Completar
            </button>
          </div>
        </div>
      </section>
  
      <!-- Acciones -->
      <div class="form-actions">
        <button class="btn btn-secondary" @click="$router.push('/')">
          Volver al dashboard
        </button>
        <button class="btn btn-primary" @click="saveAndContinue">
          Guardar y continuar al siguiente módulo
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Module4Social',
    data() {
      return {
        // Paso 1 (material) — cuenta para el progreso 1/1
        step1: { completed: false },
        // Paso 2 (no material) — no cuenta para el 1/1, pero el estado cambia y se refleja en la UI
        step2: { completed: false },
      };
    },
    computed: {
      completedMaterial() {
        return this.step1.completed ? 1 : 0;
      },
    },
    methods: {
      complete(which) {
        this[which].completed = true;
        // si quisieras guardar al vuelo o disparar algo, este es el punto
      },
      saveAndContinue() {
        const payload = {
          material: { paso1: this.step1.completed },
          noMaterial: { paso2: this.step2.completed },
        };
        console.log('Guardando Módulo 4:', payload);
        // según tu instrucción: llevar al módulo 2
        this.$router.push('/modulos/5');
      },
    },
  };
  </script>
  
  <style scoped>
  .form-stack { display:flex; flex-direction:column; gap:24px; }
  
  .step-head { margin-bottom:12px; }
  .step-title strong { font-size:16px; font-weight:800; }
  .step-title .subtitle { font-size:12px; color:var(--mutetext); margin-top:4px; }
  
  .group-title {
    margin: -6px 0 -8px;
    color: var(--mutetext);
    font-weight: 700;
  }
  
  .row-between { display:flex; align-items:center; justify-content:space-between; }
  
  .status-wrap { font-weight:600; }
  .status {
    display:inline-block; padding:4px 10px; border-radius:999px;
    font-size:12px; margin-left:6px; font-weight:800;
  }
  .status-pendiente {
    color:#634d00;
    background:rgba(255, 204, 0, .2);
    box-shadow:0 0 0 1px rgba(255, 204, 0, .35) inset;
  }
  .status-completado {
    color:#0b4d3b;
    background:rgba(25, 195, 136, .2);
    box-shadow:0 0 0 1px rgba(25, 195, 136, .4) inset;
  }
  .form-actions{
    display:flex; justify-content:space-between; align-items:center;
    margin-top:24px;
  }
  .btn{
    border:0; border-radius:12px; padding:12px 18px; font-weight:700; cursor:pointer;
  }
  .btn-secondary{ background:rgba(255,255,255,.08); color:var(--text); }
  .btn-secondary:hover{ background:rgba(255,255,255,.12); }
  .btn-primary{ background:var(--accent); color:#062c23; }
  .btn-primary:hover{ background:color-mix(in srgb, var(--accent) 85%, black); }
  
  </style>
  