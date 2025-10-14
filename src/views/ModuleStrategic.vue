<template>
  <div>
    <div class="header">
      <h2>Módulo 1: Gestion de la Sostenibilidad</h2>
      <p>Completa cada apartado y envía la información para generar el texto del informe.</p>
    </div>

    <!-- Overlay para capturar username -->
    <div v-if="!usernameConfirmed" class="overlay">
      <div class="overlay-card">
        <h3 class="overlay-title">Antes de empezar</h3>
        <p class="overlay-subtitle">Introduce un nombre de usuario para asociar tus respuestas.</p>

        <label class="field-label" for="username-input">Nombre de usuario</label>
        <input
          id="username-input"
          class="field-input"
          type="text"
          v-model.trim="usernameDraft"
          maxlength="120"
          placeholder="Ejemplo: maria.garcia"
          @keyup.enter="confirmUsername"
          autofocus
        />
        <p v-if="usernameError" class="input-error">{{ usernameError }}</p>

        <div class="overlay-actions">
          <button class="btn btn-primary" @click="confirmUsername">Continuar</button>
        </div>
      </div>
    </div>

    <!-- Cajitas -->
    <section class="form-stack" :aria-hidden="!usernameConfirmed">
      <!-- 2) Composición y Responsabilidad -->
      <div class="box">
        <div class="box-head">
          <h3 class="box-title">Composición y Responsabilidad</h3>
        </div>
        <div class="box-body">
          <label class="field-label">
            ¿Qué órgano o individuo tiene la máxima responsabilidad en la supervisión de los asuntos de sostenibilidad?
          </label>
          <textarea class="field-textarea" rows="3" v-model="form.comp.p1" placeholder="Consejo de Administración, Comité de sostenibilidad..."></textarea>

          <label class="field-label">
            ¿Cómo están formalizadas estas responsabilidades? (ej: estatutos del comité, mandato del Consejo, políticas internas)
          </label>
          <textarea class="field-textarea" rows="3" v-model="form.comp.p2" placeholder="En los estatutos del comité, en el mandato del Consejo, en políticas internas..."></textarea>
        </div>
        <div class="box-actions">
          <button class="btn btn-primary" :disabled="!usernameConfirmed || loading.compositionAndResponsibility" @click="submitComposition">
            {{ loading.compositionAndResponsibility ? 'Enviando...' : 'Enviar información' }}
          </button>
        </div>
        <transition name="fade">
          <div v-if="responses.compositionAndResponsibility" class="response-box">
            <strong>Respuesta del asistente:</strong>
            <p>{{ responses.compositionAndResponsibility }}</p>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="errors.compositionAndResponsibility" class="response-box error">
            <strong>Error:</strong>
            <p>{{ errors.compositionAndResponsibility }}</p>
          </div>
        </transition>
      </div>

      <!-- 3) Competencias y Expertise -->
      <div class="box">
        <div class="box-head">
          <h3 class="box-title">Competencias y Expertise</h3>
        </div>
        <div class="box-body">
          <label class="field-label">
            Describe las competencias y experiencia de los miembros en materia de sostenibilidad. ¿Poseen conocimiento directo o acceso a expertos externos?
          </label>
          <textarea class="field-textarea" rows="3" v-model="form.skills.p1" placeholder="Ejemplo..."></textarea>

          <label class="field-label">
            ¿Qué procesos de formación o actualización se han llevado a cabo en el último año?
          </label>
          <textarea class="field-textarea" rows="3" v-model="form.skills.p2" placeholder="Ejemplo..."></textarea>
        </div>
        <div class="box-actions">
          <button class="btn btn-primary" :disabled="!usernameConfirmed || loading.skillsAndExpertise" @click="submitSkills">
            {{ loading.skillsAndExpertise ? 'Enviando...' : 'Enviar información' }}
          </button>
        </div>
        <transition name="fade">
          <div v-if="responses.skillsAndExpertise" class="response-box">
            <strong>Respuesta del asistente:</strong>
            <p>{{ responses.skillsAndExpertise }}</p>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="errors.skillsAndExpertise" class="response-box error">
            <strong>Error:</strong>
            <p>{{ errors.skillsAndExpertise }}</p>
          </div>
        </transition>
      </div>

      <!-- 4) Flujo de Información -->
      <div class="box">
        <div class="box-head">
          <h3 class="box-title">Flujo de Información</h3>
        </div>
        <div class="box-body">
          <label class="field-label">
            ¿Con qué frecuencia se informa a los órganos de gobierno sobre IROs y progreso de objetivos?
          </label>
          <textarea class="field-textarea" rows="3" v-model="form.flow.p1" placeholder="Ejemplo..."></textarea>

          <label class="field-label">
            ¿Quién presenta esta información y por qué canales (informes, reuniones, etc.)?
          </label>
          <textarea class="field-textarea" rows="3" v-model="form.flow.p2" placeholder="Informes, reuniones específicas...."></textarea>
        </div>
        <div class="box-actions">
          <button class="btn btn-primary" :disabled="!usernameConfirmed || loading.infoFlow" @click="submitFlow">
            {{ loading.infoFlow ? 'Enviando...' : 'Enviar información' }}
          </button>
        </div>
        <transition name="fade">
          <div v-if="responses.infoFlow" class="response-box">
            <strong>Respuesta del asistente:</strong>
            <p>{{ responses.infoFlow }}</p>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="errors.infoFlow" class="response-box error">
            <strong>Error:</strong>
            <p>{{ errors.infoFlow }}</p>
          </div>
        </transition>
      </div>

      <!-- 5) Integración en la Toma de Decisiones -->
      <div class="box">
        <div class="box-head">
          <h3 class="box-title">Integración en la Toma de Decisiones</h3>
        </div>
        <div class="box-body">
          <label class="field-label">
            Describe cómo los órganos de gobierno usan la información para supervisar la estrategia, grandes transacciones y gestión de riesgos.
          </label>
          <textarea class="field-textarea" rows="4" v-model="form.decision.p1" placeholder="Ejemplo..."></textarea>
        </div>
        <div class="box-actions">
          <button class="btn btn-primary" :disabled="!usernameConfirmed || loading.decisionIntegration" @click="submitDecision">
            {{ loading.decisionIntegration ? 'Enviando...' : 'Enviar información' }}
          </button>
        </div>
        <transition name="fade">
          <div v-if="responses.decisionIntegration" class="response-box">
            <strong>Respuesta del asistente:</strong>
            <p>{{ responses.decisionIntegration }}</p>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="errors.decisionIntegration" class="response-box error">
            <strong>Error:</strong>
            <p>{{ errors.decisionIntegration }}</p>
          </div>
        </transition>
      </div>

      <!-- 6) Existencia de Esquemas (Sí/No en checkboxes) -->
      <div class="box">
        <div class="box-head">
          <h3 class="box-title">Existencia de Esquemas</h3>
        </div>
        <div class="box-body">
          <label class="field-label">
            ¿La remuneración variable de los miembros de los órganos de administración está vinculada al cumplimiento de objetivos de sostenibilidad?
          </label>

          <div class="options">
            <label class="check-label">
              <input type="checkbox" :checked="form.schemas.yes" @change="toggleSchemas(true)" />
              <span>Sí</span>
            </label>
            <label class="check-label">
              <input type="checkbox" :checked="!form.schemas.yes" @change="toggleSchemas(false)" />
              <span>No</span>
            </label>
          </div>
        </div>
        <div class="box-actions">
          <button class="btn btn-primary" :disabled="!usernameConfirmed || loading.schemasExistence" @click="submitSchemasExistence">
            {{ loading.schemasExistence ? 'Enviando...' : 'Enviar información' }}
          </button>
        </div>
        <transition name="fade">
          <div v-if="responses.schemasExistence" class="response-box">
            <strong>Respuesta del asistente:</strong>
            <p>{{ responses.schemasExistence }}</p>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="errors.schemasExistence" class="response-box error">
            <strong>Error:</strong>
            <p>{{ errors.schemasExistence }}</p>
          </div>
        </transition>
      </div>

      <!-- 6.5) Descripción del Esquema (solo si arriba es Sí) -->
      <div class="box" v-if="form.schemas.yes">
        <div class="box-head">
          <h3 class="box-title">Descripción del Esquema</h3>
        </div>
        <div class="box-body">
          <label class="field-label">Describe las características clave de estos esquemas de incentivos.</label>
          <textarea class="field-textarea" rows="3" v-model="form.schemasDesc.p1" placeholder="Ejemplo..."></textarea>

          <label class="field-label">¿Qué objetivos o métricas (ej: emisiones, seguridad, diversidad) se usan para evaluar el desempeño?</label>
          <textarea class="field-textarea" rows="3" v-model="form.schemasDesc.p2" placeholder="Reducción de emisiones, índice de seguridad, puntuación en diversidad..."></textarea>

          <label class="field-label">¿Qué porcentaje de la remuneración variable depende de estos objetivos?</label>
          <textarea class="field-textarea" rows="3" v-model="form.schemasDesc.p3" placeholder="Ejemplo..."></textarea>
        </div>
        <div class="box-actions">
          <button class="btn btn-primary" :disabled="!usernameConfirmed || loading.schemasDescription" @click="submitSchemasDescription">
            {{ loading.schemasDescription ? 'Enviando...' : 'Enviar información' }}
          </button>
        </div>
        <transition name="fade">
          <div v-if="responses.schemasDescription" class="response-box">
            <strong>Respuesta del asistente:</strong>
            <p>{{ responses.schemasDescription }}</p>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="errors.schemasDescription" class="response-box error">
            <strong>Error:</strong>
            <p>{{ errors.schemasDescription }}</p>
          </div>
        </transition>
      </div>

      <!-- 7) Declaración sobre Diligencia Debida -->
      <div class="box">
        <div class="box-head">
          <h3 class="box-title">Declaración sobre Diligencia Debida</h3>
        </div>
        <div class="box-body">
          <label class="field-label">
            Proporciona una descripción general del proceso de diligencia debida (identificar, prevenir, mitigar y rendir cuentas) alineado con los Principios Rectores de la ONU.
          </label>
          <textarea class="field-textarea" rows="4" v-model="form.due.p1" placeholder="Ejemplo..."></textarea>
        </div>
        <div class="box-actions">
          <button class="btn btn-primary" :disabled="!usernameConfirmed || loading.dueDiligence" @click="submitDue">
            {{ loading.dueDiligence ? 'Enviando...' : 'Enviar información' }}
          </button>
        </div>
        <transition name="fade">
          <div v-if="responses.dueDiligence" class="response-box">
            <strong>Respuesta del asistente:</strong>
            <p>{{ responses.dueDiligence }}</p>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="errors.dueDiligence" class="response-box error">
            <strong>Error:</strong>
            <p>{{ errors.dueDiligence }}</p>
          </div>
        </transition>
      </div>

      <!-- 8) Descripción del Sistema -->
      <div class="box">
        <div class="box-head">
          <h3 class="box-title">Descripción del Sistema</h3>
        </div>
        <div class="box-body">
          <label class="field-label">
            Describe las principales características de los sistemas de gestión de riesgos y control interno para elaborar la información de sostenibilidad.
          </label>
          <textarea class="field-textarea" rows="3" v-model="form.system.p1" placeholder="Ejemplo..."></textarea>

          <label class="field-label">
            ¿Cómo se asegura la calidad, fiabilidad y trazabilidad de los datos ESG reportados?
          </label>
          <textarea class="field-textarea" rows="3" v-model="form.system.p2" placeholder="Ejemplo..."></textarea>
        </div>
        <div class="box-actions">
          <button class="btn btn-primary" :disabled="!usernameConfirmed || loading.systemDescription" @click="submitSystem">
            {{ loading.systemDescription ? 'Enviando...' : 'Enviar información' }}
          </button>
        </div>
        <transition name="fade">
          <div v-if="responses.systemDescription" class="response-box">
            <strong>Respuesta del asistente:</strong>
            <p>{{ responses.systemDescription }}</p>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="errors.systemDescription" class="response-box error">
            <strong>Error:</strong>
            <p>{{ errors.systemDescription }}</p>
          </div>
        </transition>
      </div>

      <!-- 9) Evaluación y Reporte Interno -->
      <div class="box">
        <div class="box-head">
          <h3 class="box-title">Evaluación y Reporte Interno</h3>
        </div>
        <div class="box-body">
          <label class="field-label">
            ¿Cómo se evalúan los riesgos asociados al proceso de reporte (ej: error en datos, greenwashing)?
          </label>
          <textarea class="field-textarea" rows="3" v-model="form.internal.p1" placeholder="Ejemplo..."></textarea>

          <label class="field-label">
            ¿Cómo se reportan los hallazgos de estas evaluaciones a los órganos de gobierno?
          </label>
          <textarea class="field-textarea" rows="3" v-model="form.internal.p2" placeholder="Ejemplo..."></textarea>
        </div>
        <div class="box-actions">
          <button class="btn btn-primary" :disabled="!usernameConfirmed || loading.internEvaluationAndReport" @click="submitInternal">
            {{ loading.internEvaluationAndReport ? 'Enviando...' : 'Enviar información' }}
          </button>
        </div>
        <transition name="fade">
          <div v-if="responses.internEvaluationAndReport" class="response-box">
            <strong>Respuesta del asistente:</strong>
            <p>{{ responses.internEvaluationAndReport }}</p>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="errors.internEvaluationAndReport" class="response-box error">
            <strong>Error:</strong>
            <p>{{ errors.internEvaluationAndReport }}</p>
          </div>
        </transition>
      </div>
    </section>

    <!-- Acciones -->
    <div class="form-actions">
      <button class="btn btn-secondary" @click="$router.push('/')">Volver al dashboard</button>
      <button class="btn btn-primary" @click="goToNext">Guardar y continuar al siguiente módulo</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
});

export default {
  name: 'Module1Strategic',
  data() {
    return {
      // Username
      usernameDraft: '',
      usernameConfirmed: false,
      usernameError: '',

      // Formularios de cada cajita
      form: {
        gov: { p1: '' },          // 1
        comp: { p1: '', p2: '' }, // 2
        skills: { p1: '', p2: '' }, // 3
        flow: { p1: '', p2: '' },   // 4
        decision: { p1: '' },     // 5
        schemas: { yes: false },            // 6 (Sí/No)
        schemasDesc: { p1: '', p2: '', p3: '' }, // 6.5
        due: { p1: '' },          // 7
        system: { p1: '', p2: '' }, // 8
        internal: { p1: '', p2: '' }, // 9
      },

      // Loading / respuestas / errores
      loading: {
        governance: false,
        compositionAndResponsibility: false,
        skillsAndExpertise: false,
        infoFlow: false,
        decisionIntegration: false,
        schemasExistence: false,
        schemasDescription: false,
        dueDiligence: false,
        systemDescription: false,
        internEvaluationAndReport: false,
      },
      responses: {
        governance: '',
        compositionAndResponsibility: '',
        skillsAndExpertise: '',
        infoFlow: '',
        decisionIntegration: '',
        schemasExistence: '',
        schemasDescription: '',
        dueDiligence: '',
        systemDescription: '',
        internEvaluationAndReport: '',
      },
      errors: {
        governance: '',
        compositionAndResponsibility: '',
        skillsAndExpertise: '',
        infoFlow: '',
        decisionIntegration: '',
        schemasExistence: '',
        schemasDescription: '',
        dueDiligence: '',
        systemDescription: '',
        internEvaluationAndReport: '',
      },

      paths: {
        base: '/api/v1/module1',
        governance: '/governance',
        compositionAndResponsibility: '/compositionAndResponsibility',
        skillsAndExpertise: '/skillsAndExpertise',
        infoFlow: '/infoFlow',
        decisionIntegration: '/decisionIntegration',
        schemasExistence: '/schemasExistence',
        schemasDescription: '/schemasDescription',
        dueDiligence: '/dueDiligence',
        systemDescription: '/systemDescription',
        internEvaluationAndReport: '/internEvaluationAndReport',
      },
    };
  },
  computed: {
    username() {
      return this.usernameDraft;
    },
  },
  methods: {
    confirmUsername() {
      if (!this.usernameDraft || !this.usernameDraft.trim()) {
        this.usernameError = 'El nombre de usuario es obligatorio.';
        return;
      }
      if (this.usernameDraft.length > 120) {
        this.usernameError = 'El nombre de usuario no puede superar 120 caracteres.';
        return;
      }
      this.usernameError = '';
      this.usernameConfirmed = true;
    },

    // Toggle exclusivo para los dos checkboxes (Sí/No)
    toggleSchemas(yes) {
      this.form.schemas.yes = !!yes;
    },

    // Helpers para construir prompt
    buildPromptGovernance() {
      return `Gobernanza de la Sostenibilidad:\n${this.form.gov.p1}`;
    },
    buildPromptComposition() {
      const { p1, p2 } = this.form.comp;
      return [
        'Composición y Responsabilidad:',
        `1) Órgano/individuo responsable: ${p1}`,
        `2) Formalización de responsabilidades: ${p2}`,
      ].join('\n');
    },
    buildPromptSkills() {
      const { p1, p2 } = this.form.skills;
      return [
        'Competencias y Expertise:',
        `1) Competencias/experiencia: ${p1}`,
        `2) Formación/actualización último año: ${p2}`,
      ].join('\n');
    },
    buildPromptFlow() {
      const { p1, p2 } = this.form.flow;
      return [
        'Flujo de Información:',
        `1) Frecuencia de reporte sobre IROs/objetivos: ${p1}`,
        `2) Responsable y canales: ${p2}`,
      ].join('\n');
    },
    buildPromptDecision() {
      return `Integración en la Toma de Decisiones:\n${this.form.decision.p1}`;
    },
    buildPromptSchemasExistence() {
      return `Existencia de esquemas de incentivos vinculados a sostenibilidad: ${this.form.schemas.yes ? 'Sí' : 'No'}`;
    },
    buildPromptSchemasDescription() {
      const { p1, p2, p3 } = this.form.schemasDesc;
      return [
        'Descripción del Esquema:',
        `1) Características clave: ${p1}`,
        `2) Objetivos/métricas: ${p2}`,
        `3) % de remuneración variable dependiente: ${p3}`,
     ].join('\n');
    },
    buildPromptDue() {
      return `Declaración sobre Diligencia Debida:\n${this.form.due.p1}`;
    },
    buildPromptSystem() {
      const { p1, p2 } = this.form.system;
      return [
        'Descripción del Sistema:',
        `1) Sistemas de gestión/control interno: ${p1}`,
        `2) Calidad/fiabilidad/trazabilidad de datos ESG: ${p2}`,
      ].join('\n');
    },
    buildPromptInternal() {
      const { p1, p2 } = this.form.internal;
      return [
        'Evaluación y Reporte Interno:',
        `1) Evaluación de riesgos del reporte: ${p1}`,
        `2) Reporte de hallazgos a órganos de gobierno: ${p2}`,
      ].join('\n');
    },

    async postAsk(path, prompt, key) {
      this.errors[key] = '';
      this.responses[key] = '';
      this.loading[key] = true;

      try {
        const url = `${this.paths.base}${path}`;
        const body = { username: this.username, prompt };
        const { data } = await api.post(url, body);
        this.responses[key] = data?.answer ?? '(Sin contenido)';
      } catch (e) {
        const msg =
          e?.response?.data?.message ||
          e?.response?.data?.error ||
          e?.message ||
          'Error desconocido';
        this.errors[key] = `No se pudo enviar la información. Detalle: ${msg}`;
      } finally {
        this.loading[key] = false;
      }
    },

    // Submits
    async submitGovernance() {
      await this.postAsk(this.paths.governance, this.buildPromptGovernance(), 'governance');
    },
    async submitComposition() {
      await this.postAsk(this.paths.compositionAndResponsibility, this.buildPromptComposition(), 'compositionAndResponsibility');
    },
    async submitSkills() {
      await this.postAsk(this.paths.skillsAndExpertise, this.buildPromptSkills(), 'skillsAndExpertise');
    },
    async submitFlow() {
      await this.postAsk(this.paths.infoFlow, this.buildPromptFlow(), 'infoFlow');
    },
    async submitDecision() {
      await this.postAsk(this.paths.decisionIntegration, this.buildPromptDecision(), 'decisionIntegration');
    },
    async submitSchemasExistence() {
      await this.postAsk(this.paths.schemasExistence, this.buildPromptSchemasExistence(), 'schemasExistence');
    },
    async submitSchemasDescription() {
      await this.postAsk(this.paths.schemasDescription, this.buildPromptSchemasDescription(), 'schemasDescription');
    },
    async submitDue() {
      await this.postAsk(this.paths.dueDiligence, this.buildPromptDue(), 'dueDiligence');
    },
    async submitSystem() {
      await this.postAsk(this.paths.systemDescription, this.buildPromptSystem(), 'systemDescription');
    },
    async submitInternal() {
      await this.postAsk(this.paths.internEvaluationAndReport, this.buildPromptInternal(), 'internEvaluationAndReport');
    },

    goToNext() {
      this.$router.push('/modulos/2');
    },
  },
};
</script>

<style scoped>
.form-stack { display:flex; flex-direction:column; gap:24px; }

/* Panel / Box */
.box{ border:1px solid var(--border); border-radius:14px; background:rgba(0,0,0,.08); overflow:hidden; }
.box + .box{ margin-top:8px; }
.box-head{ padding:14px 16px; border-bottom:1px solid var(--border); background:rgba(255,255,255,.04); }
.box-title{ margin:0; font-size:15px; font-weight:800; }
.box-body{ padding:14px 16px; display:flex; flex-direction:column; gap:12px; }
.box-actions{ padding:14px 16px; border-top:1px solid var(--border); display:flex; justify-content:flex-end; }

/* Campos */
.field-label { display:block; font-size:14px; color:var(--mutetext); margin:8px 0 4px; }
.field-textarea, .field-input {
  width:100%;
  border-radius:12px; border:1px solid var(--border);
  padding:12px 14px; background:rgba(0,0,0,.15); color:var(--text);
  outline:none; box-shadow:none; resize:vertical;
}
.field-textarea:focus, .field-input:focus {
  border-color:var(--accent); box-shadow:0 0 0 2px var(--accent-weak);
}

/* Acciones */
.form-actions {
  display:flex; justify-content:space-between; align-items:center;
  margin-top:24px;
}
.btn { border:0; border-radius:12px; padding:12px 18px; font-weight:700; cursor:pointer; }
.btn-secondary{ background:rgba(255,255,255,.08); color:var(--text); }
.btn-secondary:hover{ background:rgba(255,255,255,.12); }
.btn-primary{ background:var(--accent); color:#062c23; }
.btn-primary:hover{ background:color-mix(in srgb, var(--accent) 85%, black); }
.btn:disabled{ opacity:.6; cursor:not-allowed; }

/* Respuestas */
.response-box{
  margin:12px 16px 16px;
  border:1px solid var(--border);
  background:rgba(255,255,255,.06);
  border-radius:12px;
  padding:12px 14px; color:var(--text);
}
.response-box.error{ border-color:#ff7a7a; background:rgba(255,0,0,.08); }

/* Overlay username */
.overlay{
  position:fixed; inset:0; display:flex; align-items:center; justify-content:center;
  background:rgba(0,0,0,.6); z-index:1000; backdrop-filter: blur(2px);
}
.overlay-card{
  width:min(560px, 92vw);
  border:1px solid var(--border); border-radius:16px;
  background:rgba(20,20,20,.95); padding:20px;
  box-shadow:0 10px 30px rgba(0,0,0,.4);
}
.overlay-title{ margin:0 0 6px; font-size:18px; font-weight:800; }
.overlay-subtitle{ margin:0 0 14px; color:var(--mutetext); }
.overlay-actions{ display:flex; justify-content:flex-end; gap:8px; margin-top:12px; }

/* Checks */
.options { display:flex; flex-direction:column; gap:10px; }
.check-label{ display:flex; align-items:flex-start; gap:10px; }
.check-label input[type="checkbox"]{ width:18px; height:18px; margin:0; margin-top:2px; }
.check-label span{ line-height:1.25; }

/* Fade */
.fade-enter-active, .fade-leave-active { transition: opacity .18s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.input-error{ color:#ff7a7a; font-size:13px; margin-top:6px; }
</style>
