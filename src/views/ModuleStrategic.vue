<template>
    <div>
      <div class="header">
        <h2>Módulo 1: Marco Estratégico</h2>
        <p>Empecemos por lo general. Introduce la web de tu empresa para que la IA genere un primer borrador de tu estrategia y propósito.</p>
      </div>
  
      <!-- Columna con 3 cajitas -->
      <section class="form-stack">
  
        <!-- Paso 1 -->
        <div class="panel">
          <div class="step-head">
            <div class="step-title">
              <strong>Paso 1: Recopilación Automática</strong>
              <span class="subtitle">Ingresa la URL de tu página web corporativa para que la IA analice tu información existente</span>
            </div>
          </div>
  
          <label class="field-label">Introduce la URL de tu página web</label>
          <input
            v-model="form.url"
            type="url"
            class="field-input"
            placeholder="https://"
          />
        </div>
  
        <!-- Paso 2 -->
        <div class="panel">
          <div class="step-head">
            <div class="step-title">
              <strong>Paso 2: Borrador del Capítulo</strong>
              <span class="subtitle">Revisa y edita el texto generado. Este será el marco estratégico de tu informe CSRD</span>
            </div>
          </div>
  
          <label class="field-label">Marco estratégico de sostenibilidad</label>
          <textarea
            v-model="form.marco"
            rows="8"
            class="field-textarea"
            placeholder="Escribe aquí tu marco estratégico..."
          ></textarea>
        </div>
  
        <!-- Paso 3 -->
        <div class="panel">
          <div class="step-head">
            <div class="step-title">
              <strong>Paso 3: Asistente de Edición (Opcional)</strong>
              <span class="subtitle">Pide a la IA que refine específicamente algún aspecto del texto</span>
            </div>
          </div>
  
          <label class="field-label">Pide a la IA que refine tu texto (ej. "Hazlo más formal")</label>
          <input
            v-model="form.formal"
            type="text"
            class="field-input"
            placeholder="Texto breve"
          />
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
    name:'Module1Strategic',
    data(){
      return {
        form: {
          url: 'http://tuempresa.com',
          marco: 'Aquí aparecerá el borrador generado por la IA basado en tu web. Podrás editarlo directamente o usar el asistente.',
          formal: 'Ejemplo: Hazlo más técnico, añade métricas específicas, simplifica el lenguaje...'
        }
      }
    },
    methods:{
      saveAndContinue(){
        // Aquí podrías guardar en API/Pinia/localStorage
        console.log('Guardando Módulo 1:', this.form)
        this.$router.push('/modulos/2')
      }
    }
  }
  </script>
  
  <style scoped>
  .form-stack{ display:flex; flex-direction:column; gap:24px; }
  
  /* cabecera de cada paso */
  .step-head{ display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
  .step-title strong{ font-size:16px; font-weight:800; }
  .step-title .subtitle{ display:block; font-size:12px; color:var(--mutetext); margin-top:2px; }
  
  /* campos */
  .field-label{ display:block; font-size:14px; color:var(--mutetext); margin:8px 0; }
  .field-input, .field-textarea{
    width:100%; border-radius:12px; border:1px solid var(--border);
    padding:12px 14px; background:rgba(0,0,0,.15); color:var(--text);
    outline:none; box-shadow:none;
  }
  .field-input:focus, .field-textarea:focus{
    border-color: var(--accent); box-shadow: 0 0 0 2px var(--accent-weak);
  }
  
  /* acciones */
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
  