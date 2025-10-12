<template>
  <div>
    <div class="header">
      <h2>Módulo 2: Análisis de Doble Materialidad</h2>
      <p>Este asistente te guiará paso a paso para realizar y documentar tu análisis de doble materialidad, el corazón de tu informe CSRD.</p>
    </div>

    <!-- Flujo por fases -->
    <section class="form-stack">
      <!-- FASE 1 -->
      <div v-if="faseActual === 1" class="panel">
        <div class="step-head">
          <div class="step-title">
            <strong>Análisis Interno (Fuente de Datos 1)</strong>
          </div>
        </div>
      </div>

      <!-- FASE 2 -->
      <div v-else-if="faseActual === 2" class="panel">
        <div class="step-head">
          <div class="step-title">
            <strong>Análisis Externo (Fuente de Datos 2)</strong>
          </div>
        </div>
      </div>

      <!-- FASE 3 -->
      <div v-else class="panel">
        <div class="step-head">
          <div class="step-title">
            <strong>Consulta a Stakeholders (Fuente de Datos 3)</strong>
          </div>
        </div>
      </div>
    </section>

    <!-- Acciones -->
    <div class="form-actions">
      <button class="btn btn-secondary" @click="$router.push('/')">
        Volver al dashboard
      </button>
      <button class="btn btn-primary" @click="saveAndContinue">
        {{ ctaLabel }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Module2Materiality',
  data() {
    return {
      faseActual: 1,
    };
  },
  computed: {
    ctaLabel() {
      return this.faseActual < 3
        ? 'Guardar y continuar a la siguiente fase'
        : 'Guardar y continuar al siguiente módulo';
    },
  },
  methods: {
    saveAndContinue() {
      console.log('Guardando Módulo 2 - Fase', this.faseActual);
      if (this.faseActual < 3) {
        this.faseActual += 1;
        return;
      }
      this.$router.push('/modulos/3');
    },
  },
};
</script>

<style scoped>
.form-stack { display:flex; flex-direction:column; gap:24px; }

.step-head { margin-bottom:12px; }
.step-title strong { font-size:16px; font-weight:800; }
.step-title .subtitle { font-size:12px; color:var(--mutetext); margin-top:4px; }

/* lista de opciones */
.options { display:flex; flex-direction:column; gap:12px; }
.option-row {
  display:flex; align-items:center; justify-content:space-between;
  padding:12px; border:1px solid var(--border); border-radius:12px;
  background:rgba(0,0,0,.12);
}
.check-label { display:flex; align-items:center; gap:10px; }
.check-label input[type="checkbox"] { width:18px; height:18px; }

.option-actions { display:flex; align-items:center; gap:10px; }
.file-hidden { display:none; }
.file-name { font-size:12px; color:var(--mutetext); }

.field-label { display:block; font-size:14px; color:var(--mutetext); margin:8px 0; }
.field-textarea {
  width:100%; border-radius:12px; border:1px solid var(--border);
  padding:12px 14px; background:rgba(0,0,0,.15); color:var(--text);
  outline:none; box-shadow:none;
}
.field-textarea:focus {
  border-color:var(--accent); box-shadow:0 0 0 2px var(--accent-weak);
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
