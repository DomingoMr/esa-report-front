<template>
    <div>
      <div class="header">
        <h2>Módulo 5: Gobernanza</h2>
        <p>
          Describe aquí la estructura de gobierno y los procesos de supervisión de la sostenibilidad en tu empresa.
          Esta sección es obligatoria y fundamental para tu informe.
        </p>
      </div>
  
      <!-- Título de grupo (aplica a las 3 primeras cajitas) -->
      <div class="group-title" style="margin-top:12px;">
        Gobernanza General de la Sostenibilidad (ESRS 2)
      </div>
      <div class="group-subtitle">
        Describe el rol de tus órganos de administración, la gestión de riesgos y la integración de la sostenibilidad en los incentivos.
      </div>
  
      <section class="form-stack">
        <!-- 1) Rol y Supervisión -->
        <div class="panel">
          <div class="step-head">
            <div class="step-title">
              <strong>Rol y Supervisión (GOV-1, GOV-2)</strong>
            </div>
          </div>
  
          <label class="field-label">
            Describe el papel de los órganos de administración, dirección y supervisión en la sostenibilidad
          </label>
          <textarea
            v-model="form.rol"
            rows="8"
            class="field-textarea"
            placeholder="Describe aquí..."
          ></textarea>
        </div>
  
        <!-- 2) Integración en Incentivos -->
        <div class="panel">
          <div class="step-head">
            <div class="step-title">
              <strong>Integración en Incentivos (GOV-3)</strong>
            </div>
          </div>
  
          <label class="field-label">
            Describe cómo se integra el rendimiento en sostenibilidad en los sistemas de incentivos
          </label>
          <textarea
            v-model="form.incentivos"
            rows="8"
            class="field-textarea"
            placeholder="Describe aquí..."
          ></textarea>
        </div>
  
        <!-- 3) Diligencia Debida y Gestión de Riesgos -->
        <div class="panel">
          <div class="step-head">
            <div class="step-title">
              <strong>Diligencia Debida y Gestión de Riesgos (GOV-4, GOV-5)</strong>
            </div>
          </div>
  
          <label class="field-label">
            Describe tu declaración sobre la diligencia debida y los principales sistemas de control interno
          </label>
          <textarea
            v-model="form.ddrr"
            rows="8"
            class="field-textarea"
            placeholder="Describe aquí..."
          ></textarea>
        </div>
  
        <!-- 4) ESRS G1 -->
        <div class="panel">
          <div class="step-head">
            <div class="step-title">
              <strong>ESRS G1: Conducta Empresarial</strong>
              <div class="subtitle">
                Según tu análisis, este tema no es material y no requiere reporte detallado, aunque se cubrirán aspectos
                básicos en la sección general.
              </div>
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
          Guardar y continuar al siguiente módulo
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Module5Governance',
    data() {
      return {
        form: {
          rol: 'Ej: El Consejo de Administracion, a través de su Comisión de Sostenibilidad, supervisa directamente nuestra estrategia y desempeño ESG...',
          incentivos: 'Ej: Un 15% de la retribución variable de la alta dirección está vinculada al cumplimiento de nuestros objetivos de reducción de emisiones...',
          ddrr: 'Ej: Hemos implementado un sistema de debida diligencia para identificar y mitigar los impactos negativos en nuestra cadena de valor...',
        }
      }
    },
    methods: {
      saveAndContinue() {
        console.log('Guardando Módulo 5 (Gobernanza):', this.form);
        // "Siguiente módulo": proponemos /modulos/6 (Finanzas Sostenibles)
        this.$router.push('/modulos/6');
      }
    }
  }
  </script>
  
  <style scoped>
  .form-stack { display:flex; flex-direction:column; gap:24px; }
  
  .group-title {
    color: var(--mutetext);
    font-weight: 800;
    margin-bottom: 2px;
  }
  .group-subtitle {
    color: var(--mutetext);
    opacity: .9;
    margin-bottom: 12px;
    font-size: 14px;
  }
  
  .step-head { margin-bottom:12px; }
  .step-title strong { font-size:16px; font-weight:800; }
  .step-title .subtitle { font-size:12px; color:var(--mutetext); margin-top:4px; }
  
  .field-label { display:block; font-size:14px; color:var(--mutetext); margin:8px 0; }
  .field-textarea {
    width:100%; border-radius:12px; border:1px solid var(--border);
    padding:12px 14px; background:rgba(0,0,0,.15); color:var(--text);
    outline:none; box-shadow:none;
  }
  .field-textarea:focus {
    border-color: var(--accent); box-shadow: 0 0 0 2px var(--accent-weak);
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
  