<template>
    <div>
      <div class="header">
        <h2>Módulo 3: Desempeño Medioambiental</h2>
        <p>A continuación, reporta los datos para los temas medioambientales que has identificado como materiales. Completa cada una de las siguientes secciones.</p>
      </div>
  
      <section class="form-stack">
        <!-- 1) PROGRESO DEL MÓDULO -->
        <div class="panel">
          <div class="step-head">
            <div class="step-title">
              <strong>Progreso del Módulo Medioambiental</strong>
              <div class="subtitle">3 estándares materiales identificados para reporte</div>
            </div>
          </div>
  
          <p style="margin:0; font-weight:700;">
            {{ completedMaterial }}/3 completadas
          </p>
        </div>
  
        <!-- Título de grupo: Estándares Materiales -->
        <div style="margin: -6px 0 -8px; color: var(--mutetext); font-weight:700;">
          Estándares Materiales
        </div>
  
        <!-- 2) PASO 1 (MATERIAL) -->
        <div class="panel">
          <div class="step-head">
            <div class="step-title">
              <strong>ESRS E1: Cambio Climático</strong>
              <div class="subtitle">Reporta tu consumo de energia, emisiones de GEI y tu plan de transición.</div>
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
  
        <!-- 3) PASO 2 (MATERIAL) -->
        <div class="panel">
          <div class="step-head">
            <div class="step-title">
              <strong>ESRS E3: Recursos Hídricos y Marinos</strong>
              <div class="subtitle">Reporta tu consumo de agua y su gestión.</div>
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
  
        <!-- 4) PASO 3 (MATERIAL) -->
        <div class="panel">
          <div class="step-head">
            <div class="step-title">
              <strong>ESRS E5: Uso de Recursos y economía Circular</strong>
              <div class="subtitle">Reporta tu gestión de reiduos y estrategias de economía circular.</div>
            </div>
          </div>
  
          <div class="row-between">
            <div class="status-wrap">
              <span>Estado: </span>
              <span :class="['status', step3.completed ? 'status-completado' : 'status-pendiente']">
                {{ step3.completed ? 'Completado' : 'Pendiente' }}
              </span>
            </div>
  
            <button
              class="btn btn-secondary"
              :disabled="step3.completed"
              @click="complete('step3')"
            >
              Completar
            </button>
          </div>
        </div>
  
        <!-- Título de grupo: Estándares No Materiales -->
        <div style="margin: -6px 0 -8px; color: var(--mutetext); font-weight:700;">
          Estándares No Materiales
        </div>
  
        <!-- 5) PASO 4 (NO MATERIAL) -->
        <div class="panel">
          <div class="step-head">
            <div class="step-title">
              <strong>ESRS E2: Contaminación</strong>
              <div class="subtitle">Reporta tu gestión de residuos y estrategias de economía circular.</div>
            </div>
          </div>
  
          <div class="row-between">
            <div class="status-wrap">
              <span>Estado: </span>
              <span :class="['status', step4.completed ? 'status-completado' : 'status-pendiente']">
                {{ step4.completed ? 'Completado' : 'Pendiente' }}
              </span>
            </div>
  
            <button
              class="btn btn-secondary"
              :disabled="step4.completed"
              @click="complete('step4')"
            >
              Completar
            </button>
          </div>
        </div>
      </section>
  
      <!-- Acciones -->
      <div class="form-actions">
        <button class="btn btn-secondary" @click="$router.push('/')">Volver al dashboard</button>
        <button class="btn btn-primary" @click="saveAndContinue">
          Guardar y continuar al siguiente módulo
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Module3Environmental',
    data() {
      return {
        step1: { completed: false },
        step2: { completed: false },
        step3: { completed: false },
        step4: { completed: false }, // no material; no cuenta en el 3/3
      };
    },
    computed: {
      completedMaterial() {
        return [this.step1, this.step2, this.step3].filter(s => s.completed).length;
      },
    },
    methods: {
      complete(which) {
        this[which].completed = true;
      },
      saveAndContinue() {
        const payload = {
          materiales: {
            paso1: this.step1.completed,
            paso2: this.step2.completed,
            paso3: this.step3.completed,
          },
          noMateriales: {
            paso4: this.step4.completed,
          },
        };
        console.log('Guardando Módulo 3:', payload);
        // según tu instrucción, ir al Módulo 2
        this.$router.push('/modulos/4');
      },
    },
  };
  </script>
  
  <style scoped>
  .form-stack { display:flex; flex-direction:column; gap:24px; }
  
  .step-head { margin-bottom:12px; }
  .step-title strong { font-size:16px; font-weight:800; }
  .step-title .subtitle { font-size:12px; color:var(--mutetext); margin-top:4px; }
  
  .row-between { display:flex; align-items:center; justify-content:space-between; }
  
  .status-wrap { font-weight:600; }
  .status {
    display:inline-block; padding:4px 10px; border-radius:999px;
    font-size:12px; margin-left:6px; font-weight:800;
  }
  .status-pendiente {
    color:#634d00; background:rgba(255, 204, 0, .2); box-shadow:0 0 0 1px rgba(255, 204, 0, .35) inset;
  }
  .status-completado {
    color:#0b4d3b; background:rgba(25, 195, 136, .2); box-shadow:0 0 0 1px rgba(25, 195, 136, .4) inset;
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
  