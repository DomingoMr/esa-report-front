<template>
  <div>
    <div class="header">
      <h2>Módulo 2: Análisis de Doble Materialidad</h2>
      <p>Este asistente te guiará paso a paso para realizar y documentar tu análisis de doble materialidad, el corazón de tu informe CSRD.</p>
    </div>

    <!-- Columna con 3 cajitas -->
    <section class="form-stack">
      <!-- PASO 1 -->
      <div class="panel">
        <div class="step-head">
          <div class="step-title">
            <strong>Grupos de Interés Consultados</strong>
            <div class="subtitle">Selecciona los grupos de stakeholders que has consultado durante tu análisis</div>
          </div>
        </div>

        <div class="options">
          <div v-for="(opt, i) in paso1" :key="'p1-' + i" class="option-row">
            <label class="check-label">
              <input type="checkbox" v-model="opt.checked" />
              <span>{{ opt.label }}</span>
            </label>

            <div class="option-actions">
              <button
                class="btn btn-secondary"
                :disabled="!opt.checked"
                @click="triggerFile('p1', i)"
              >
                Adjuntar archivo
              </button>
              <span class="file-name" v-if="opt.fileName">{{ opt.fileName }}</span>
              <input
                type="file"
                :ref="`file-p1-${i}`"
                class="file-hidden"
                @change="handleFile($event, 'p1', i)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- PASO 2 -->
      <div class="panel">
        <div class="step-head">
          <div class="step-title">
            <strong>Métodos de Consulta Utilizados  </strong>
            <div class="subtitle">Indica qué métodos has empleado para recopilar información de tus stakeholders</div>
          </div>
        </div>

        <div class="options">
          <div v-for="(opt, i) in paso2" :key="'p2-' + i" class="option-row">
            <label class="check-label">
              <input type="checkbox" v-model="opt.checked" />
              <span>{{ opt.label }}</span>
            </label>

            <div class="option-actions">
              <button
                class="btn btn-secondary"
                :disabled="!opt.checked"
                @click="triggerFile('p2', i)"
              >
                Adjuntar archivo
              </button>
              <span class="file-name" v-if="opt.fileName">{{ opt.fileName }}</span>
              <input
                type="file"
                :ref="`file-p2-${i}`"
                class="file-hidden"
                @change="handleFile($event, 'p2', i)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- PASO 3 -->
      <div class="panel">
        <div class="step-head">
          <div class="step-title">
            <strong>Descripción del Proceso General</strong>
            <div class="subtitle">Describe brevemente las fases principales de tu análisis de doble materialidad</div>
          </div>
        </div>

        <label class="field-label">Describe brevemente las fases de tu análisis</label>
        <textarea
          v-model="textoPaso3"
          rows="8"
          class="field-textarea"
          placeholder="Escribe aquí tu marco estratégico..."
        ></textarea>
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
  name: 'Module2Materiality',
  data() {
    return {
      paso1: [
        { label: 'Empleados', checked: false, fileName: '' },
        { label: 'Clientes', checked: false, fileName: '' },
        { label: 'Proveedores', checked: false, fileName: '' },
        { label: 'Inversores', checked: false, fileName: '' },
        { label: 'Comunidad Local', checked: false, fileName: '' },
      ],
      paso2: [
        { label: 'Encuestas online', checked: false, fileName: '' },
        { label: 'Entrevistas', checked: false, fileName: '' },
        { label: 'Workshops', checked: false, fileName: '' },
        { label: 'Análisis documental', checked: false, fileName: '' },
      ],
      textoPaso3: 'Ej: Hemos seguido un proceso de 4 fases: 1. Comprensión del contexto, 2. Identificación de IROs...',
    };
  },
  methods: {
    triggerFile(group, index) {
      const refKey = `file-${group}-${index}`;
      const input = this.$refs[refKey];
      if (input && input[0]) input[0].click();
      else if (input) input.click();
    },
    handleFile(e, group, index) {
      const file = e.target.files?.[0];
      if (!file) return;
      if (group === 'p1') this.paso1[index].fileName = file.name;
      if (group === 'p2') this.paso2[index].fileName = file.name;
    },
    saveAndContinue() {
      const payload = {
        paso1: this.paso1,
        paso2: this.paso2,
        paso3: this.textoPaso3,
      };
      console.log('Guardando Módulo 2:', payload);
      this.$router.push('/modulos/3'); // <-- antes iba al dashboard
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
