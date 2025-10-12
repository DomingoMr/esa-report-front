<template>
    <div>
      <div class="header">
        <h2>Módulo 6: Finanzas Sostenibles (Taxonomía UE)</h2>
        <p>
          Este asistente te guiará para calcular los KPIs de la Taxonomía de la UE. 
          Sigue los pasos para determinar el porcentaje de tus actividades que se consideran 
          medioambientalmente sostenibles.
        </p>
      </div>
  
      <!-- Paso y subtítulo -->
      <div class="group-title" style="margin-top:12px;">
        Paso 1: Introduce tus Datos Financieros Totales
      </div>
      <div class="group-subtitle">
        Introduce las cifras totales de tu último ejercicio fiscal. 
        Estos valores se utilizarán como base para calcular tus KPIs de la Taxonomía de la UE.
      </div>
  
      <!-- Recuadro de advertencia -->
      <div class="panel" style="background: rgba(255, 204, 0, .08); border-color: rgba(255, 204, 0, .35);">
        <strong style="display:block; margin-bottom:6px;">Importante</strong>
        <p style="margin:0; color:var(--mutetext);">
          Utiliza los datos de tu último ejercicio fiscal completo. Los importes deben estar en euros
          y corresponder a las cifras consolidadas de tu empresa.
        </p>
      </div>
  
      <!-- Cajita con los 4 formularios -->
      <section class="form-stack">
        <div class="panel">
          <div class="step-head">
            <div class="step-title">
              <strong>Datos Financieros Anuales</strong>
            </div>
          </div>
  
          <!-- Volumen de Negocio -->
          <label class="field-label">Volumen de Negocio Total (€)</label>
          <input
            type="number" inputmode="decimal" step="0.01" min="0"
            class="field-input"
            v-model.number="form.turnover"
            placeholder="Ej: 1,250,000"
          />
          <div class="hint">Cifra de negocios total del ejercicio fiscal</div>
  
          <!-- CAPEX -->
          <label class="field-label" style="margin-top:14px;">CAPEX Total (€) - Inversiones de Capital</label>
          <input
            type="number" inputmode="decimal" step="0.01" min="0"
            class="field-input"
            v-model.number="form.capex"
            placeholder="Ej: 85,000"
          />
          <div class="hint">Gastos de capital e inversiones en activos fijos</div>
  
          <!-- OPEX -->
          <label class="field-label" style="margin-top:14px;">OPEX Total (€) - Gastos Operativos</label>
          <input
            type="number" inputmode="decimal" step="0.01" min="0"
            class="field-input"
            v-model.number="form.opex"
            placeholder="Ej: 450,000"
          />
          <div class="hint">Gastos operativos directos no incluidos en CapEx</div>
  
          <!-- Activos Totales (4º formulario) -->
          <label class="field-label" style="margin-top:14px;">Activos Totales (€) - Balance</label>
          <input
            type="number" inputmode="decimal" step="0.01" min="0"
            class="field-input"
            v-model.number="form.assets"
            placeholder="Ej: 3,200,000"
          />
          <div class="hint">Activos totales consolidados al cierre del ejercicio</div>
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
    name: 'Module6Finance',
    data() {
      return {
        form: {
          turnover: null,
          capex: null,
          opex: null,
          assets: null,
        }
      }
    },
    methods: {
      saveAndContinue() {
        console.log('Guardando Módulo 6 (Finanzas Sostenibles):', this.form);
        // Navega al siguiente módulo (placeholder, aún no implementado)
        this.$router.push('/modulos/7');
      }
    }
  }
  </script>
  
  <style scoped>
  .form-stack { display:flex; flex-direction:column; gap:24px; }
  
  .step-head { margin-bottom:12px; }
  .step-title strong { font-size:16px; font-weight:800; }
  
  .field-label { display:block; font-size:14px; color:var(--mutetext); margin:8px 0; }
  .field-input {
    width:100%; border-radius:12px; border:1px solid var(--border);
    padding:12px 14px; background:rgba(0,0,0,.15); color:var(--text);
    outline:none; box-shadow:none;
  }
  .field-input:focus { border-color:var(--accent); box-shadow:0 0 0 2px var(--accent-weak); }
  .hint { font-size:12px; color:var(--mutetext); margin-top:6px; }
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
  