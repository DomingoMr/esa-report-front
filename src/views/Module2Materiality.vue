<template>
  <div>
    <div class="header">
      <h2>Módulo 2: Análisis de Doble Materialidad</h2>
      <p>Este asistente te guiará paso a paso para realizar y documentar tu análisis de doble materialidad, el corazón de tu informe CSRD.</p>
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

    <!-- Flujo por fases -->
    <section class="form-stack" :aria-hidden="!usernameConfirmed">
      <!-- FASE 1 -->
      <div v-if="faseActual === 1" class="panel">
        <div class="step-head">
          <div class="step-title">
            <strong>Análisis Interno (Fuente de Datos 1)</strong>
          </div>
        </div>

        <!-- Cajita 1: Estrategia y Modelo de Negocio -->
        <div class="box">
          <div class="box-head">
            <h3 class="box-title">Revisión de la Estrategia y el Modelo de Negocio</h3>
          </div>
          <div class="box-body">
            <label class="field-label">Describe tu modelo de negocio principal. ¿Qué productos o servicios vendes y a quién?</label>
            <textarea class="field-textarea" rows="3" v-model="fase1.estrategia.p1" placeholder="Ejemplo..."></textarea>

            <label class="field-label">¿En qué países y regiones geográficas óperas principalmente?</label>
            <textarea class="field-textarea" rows="3" v-model="fase1.estrategia.p2" placeholder="Ejemplo..."></textarea>

            <label class="field-label">¿Cuáles son tus planes estratégicos de crecimiento para los próximos 5 años? ¿Cómo se espera que estos planes modifiquen tu operación?</label>
            <textarea class="field-textarea" rows="3" v-model="fase1.estrategia.p3" placeholder="Ejemplo..."></textarea>
          </div>
          <div class="box-actions">
            <button class="btn btn-primary" :disabled="!usernameConfirmed || loading.estrategia" @click="submitEstrategia">
              {{ loading.estrategia ? 'Enviando...' : 'Enviar información' }}
            </button>
          </div>

          <transition name="fade">
            <div v-if="responses.estrategia" class="response-box">
              <strong>Respuesta del asistente:</strong>
              <p>{{ responses.estrategia }}</p>
            </div>
          </transition>
          <transition name="fade">
            <div v-if="errors.estrategia" class="response-box error">
              <strong>Error:</strong>
              <p>{{ errors.estrategia }}</p>
            </div>
          </transition>
        </div>

        <!-- Cajita 2: Mapa de Riesgos Corporativo -->
        <div class="box">
          <div class="box-head">
            <h3 class="box-title">Análisis del Mapa de Riesgos Corporativo</h3>
          </div>
          <div class="box-body">
            <label class="field-label">Riesgos Operativos: Piensa en el día a día de tu negocio. ¿Cuáles son las 5 principales amenazas que podrían detener tu producción o servicio mañana?</label>
            <textarea class="field-textarea" rows="3" v-model="fase1.riesgos.operativos" placeholder="Ejemplo: Fallo de una máquina crítica, Corte de suministro eléctrico, Falta de personal clave"></textarea>

            <label class="field-label">Riesgos de la Cadena de Suministro: ¿De qué 3 materias primas o proveedores dependes más críticamente? ¿Qué pasaría si te fallaran?</label>
            <textarea class="field-textarea" rows="3" v-model="fase1.riesgos.cadena" placeholder="Ejemplo: Nuestro único proveedor de arcilla, La empresa de transporte que usamos para exportar "></textarea>

            <label class="field-label">Riesgos de Mercado y Reputación: ¿Cuál es la mayor preocupación que te han transmitido tus clientes más importantes?</label>
            <textarea class="field-textarea" rows="3" v-model="fase1.riesgos.mercado" placeholder="Ejemplo: La calidad constante del producto, Los plazos de entrega, El origen de nuestros materiales"></textarea>

            <label class="field-label">El Vínculo con Sostenibilidad: Ahora, para cada riesgo que has listado, describe brevemente cómo podría estar conectado con factores ambientales o sociales.</label>
            <textarea class="field-textarea" rows="3" v-model="fase1.riesgos.vinculoSostenibilidad" placeholder="Ejemplo: Riesgo: 'Falta de personal clave'. Vínculo: 'El aumento de la competencia por el talento en nuestra región y las nuevas expectativas de flexibilidad laboral "></textarea>
          </div>
          <div class="box-actions">
            <button class="btn btn-primary" :disabled="!usernameConfirmed || loading.riesgos" @click="submitRiesgos">
              {{ loading.riesgos ? 'Enviando...' : 'Enviar información' }}
            </button>
          </div>

          <transition name="fade">
            <div v-if="responses.riesgos" class="response-box">
              <strong>Respuesta del asistente:</strong>
              <p>{{ responses.riesgos }}</p>
            </div>
          </transition>
          <transition name="fade">
            <div v-if="errors.riesgos" class="response-box error">
              <strong>Error:</strong>
              <p>{{ errors.riesgos }}</p>
            </div>
          </transition>
        </div>

        <!-- Cajita 3: Talleres Internos y Entrevistas (DAFO) -->
        <div class="box">
          <div class="box-head">
            <h3 class="box-title">Talleres Internos y Entrevistas (Análisis DAFO)</h3>
          </div>
          <div class="box-body">
            <label class="field-label">FORTALEZAS: Piensa en lo que hace a tu empresa especial y eficiente. ¿En qué áreas de tu operación ya sois buenos en términos de sostenibilidad, aunque no lo llaméis así? ¿Cuáles son los impactos positivos más significativos que tu modelo de negocio genera intencionadamente en la sociedad o el medio ambiente?</label>
            <textarea class="field-textarea" rows="3" v-model="fase1.dafo.fortalezas" placeholder="enemos un proceso productivo que genera muy pocos residuos, Nuestros empleados están muy formados y comprometidos, Usamos proveedores locales para el 80% de nuestras compras"></textarea>

            <label class="field-label">DEBILIDADES: ¿Cuáles son los mayores desafíos internos o las áreas donde sabes que tu empresa tiene un impacto negativo significativo? ¿Cuáles son los impactos negativos inherentes a tu modelo de negocio?</label>
            <textarea class="field-textarea" rows="3" v-model="fase1.dafo.debilidades" placeholder="Nuestra maquinaria es antigua y consume mucha energía, Tenemos una alta dependencia de embalajes plásticos no reciclables"></textarea>

            <label class="field-label">OPORTUNIDADES: Enumera las 3 principales oportunidades estratégicas que la empresa está explorando. Para cada oportunidad, describe su vínculo con tendencias de sostenibilidad.</label>
            <textarea class="field-textarea" rows="3" v-model="fase1.dafo.oportunidades" placeholder="Oportunidad de nuevos mercados: vinculada a demanda de productos circulares o bajos en carbono"></textarea>

            <label class="field-label">AMENAZAS: ¿Qué cambio en la regulación, en los precios o en las exigencias de tus grandes clientes relacionado con la sostenibilidad te preocupa más que pueda afectar a tu negocio?</label>
            <textarea class="field-textarea" rows="3" v-model="fase1.dafo.amenazas" placeholder="Un nuevo impuesto al plástico dispararía nuestros costes, Nuestro principal cliente nos va a exigir certificar nuestra huella de carbono para seguir siendo su proveedor"></textarea>
          </div>
          <div class="box-actions">
            <button class="btn btn-primary" :disabled="!usernameConfirmed || loading.dafo" @click="submitDafo">
              {{ loading.dafo ? 'Enviando...' : 'Enviar información' }}
            </button>
          </div>

          <transition name="fade">
            <div v-if="responses.dafo" class="response-box">
              <strong>Respuesta del asistente:</strong>
              <p>{{ responses.dafo }}</p>
            </div>
          </transition>
          <transition name="fade">
            <div v-if="errors.dafo" class="response-box error">
              <strong>Error:</strong>
              <p>{{ errors.dafo }}</p>
            </div>
          </transition>
        </div>

        <!-- Cajita 4: Análisis de la Cadena de Valor -->
        <div class="box">
          <div class="box-head">
            <h3 class="box-title">Análisis de la Cadena de Valor</h3>
          </div>
          <div class="box-body">
            <label class="field-label">Lista tus principales materias primas y su país de origen.</label>
            <textarea class="field-textarea" rows="3" v-model="fase1.cadenaValor.p8" placeholder="Ejemplo..."></textarea>

            <label class="field-label">Describe las fases principales de tu proceso productivo o de prestación de servicios.</label>
            <textarea class="field-textarea" rows="3" v-model="fase1.cadenaValor.p9" placeholder="Ejemplo..."></textarea>

            <label class="field-label">Califica la intensidad sobre el uso de la energía, agua o generación de residuos.</label>
            <textarea class="field-textarea" rows="3" v-model="fase1.cadenaValor.p10" placeholder="Ejemplo..."></textarea>

            <label class="field-label">¿Qué ocurre con tus productos al final de su vida útil?</label>
            <textarea class="field-textarea" rows="3" v-model="fase1.cadenaValor.p11" placeholder="Ejemplo..."></textarea>
          </div>
          <div class="box-actions">
            <button class="btn btn-primary" :disabled="!usernameConfirmed || loading.cadenaValor" @click="submitCadenaValor">
              {{ loading.cadenaValor ? 'Enviando...' : 'Enviar información' }}
            </button>
          </div>

          <transition name="fade">
            <div v-if="responses.cadenaValor" class="response-box">
              <strong>Respuesta del asistente:</strong>
              <p>{{ responses.cadenaValor }}</p>
            </div>
          </transition>
          <transition name="fade">
            <div v-if="errors.cadenaValor" class="response-box error">
              <strong>Error:</strong>
              <p>{{ errors.cadenaValor }}</p>
            </div>
          </transition>
        </div>

        <!-- Cajita 5: Preocupaciones de la dirección -->
        <div class="box">
          <div class="box-head">
            <h3 class="box-title">Preocupaciones de la dirección</h3>
          </div>
          <div class="box-body">
            <label class="field-label">¿Cuáles han sido los temas de sostenibilidad más discutidos por el Consejo de Administración o la alta dirección en el último año?</label>
            <textarea class="field-textarea" rows="3" v-model="fase1.preocupacionesDireccion.p12" placeholder="Ciberseguridad, retención de talento, cumplimiento regulatorio ambiental..."></textarea>
          </div>
          <div class="box-actions">
            <button class="btn btn-primary" :disabled="!usernameConfirmed || loading.preocupacionesDireccion" @click="submitPreocupacionesDireccion">
              {{ loading.cadenaValor ? 'Enviando...' : 'Enviar información' }}
            </button>
          </div>

          <transition name="fade">
            <div v-if="responses.preocupacionesDireccion" class="response-box">
              <strong>Respuesta del asistente:</strong>
              <p>{{ responses.preocupacionesDireccion }}</p>
            </div>
          </transition>
          <transition name="fade">
            <div v-if="errors.preocupacionesDireccion" class="response-box error">
              <strong>Error:</strong>
              <p>{{ errors.preocupacionesDireccion }}</p>
            </div>
          </transition>
        </div>


      <!-- Cajita 6: Politicas y compromisos existentes -->
        <div class="box">
          <div class="box-head">
            <h3 class="box-title">Políticas y Compromisos Existentes</h3>
          </div>
          <div class="box-body">
            <label class="field-label">¿Dispone la empresa de políticas o códigos de conducta relacionados con la ética, los derechos humanos, el medio ambiente o la anticorrupción? Por favor, nómbralos.</label>
            <textarea class="field-textarea" rows="3" v-model="fase1.politicasCompromisos.p13" placeholder="Ejemplo..."></textarea>
          </div>
          <div class="box-actions">
            <button class="btn btn-primary" :disabled="!usernameConfirmed || loading.politicasCompromisos" @click="submitPoliticasCompromisos">
              {{ loading.cadenaValor ? 'Enviando...' : 'Enviar información' }}
            </button>
          </div>

          <transition name="fade">
            <div v-if="responses.politicasCompromisos" class="response-box">
              <strong>Respuesta del asistente:</strong>
              <p>{{ responses.politicasCompromisos }}</p>
            </div>
          </transition>
          <transition name="fade">
            <div v-if="errors.politicasCompromisos" class="response-box error">
              <strong>Error:</strong>
              <p>{{ errors.politicasCompromisos }}</p>
            </div>
          </transition>
        </div>
      </div>

      <!-- FASE 2 -->
<div v-else-if="faseActual === 2" class="panel">
  <div class="step-head">
    <div class="step-title"><strong>Análisis de Doble Materialidad</strong></div>
  </div>

  <!-- Cajita 1: Benchmarking Sectorial -->
  <div class="box">
    <div class="box-head">
      <h3 class="box-title">Benchmarking Sectorial (Análisis de Competencia)</h3>
    </div>
    <div class="box-body">
      <label class="field-label">Identifica de 2 a 3 competidores directos o líderes de tu sector.</label>
      <textarea class="field-textarea" rows="3" v-model="fase2.benchmarking.p1" placeholder="Ejemplo..."></textarea>

      <label class="field-label">De los informes analizados, selecciona los 3 temas de sostenibilidad que aparecen con mayor frecuencia o importancia.</label>
      <textarea class="field-textarea" rows="3" v-model="fase2.benchmarking.p2" placeholder="Ejemplo..."></textarea>
    </div>
    <div class="box-actions">
      <button class="btn btn-primary" :disabled="!usernameConfirmed || loading.benchMarking" @click="submitBenchMarking">
        {{ loading.benchMarking ? 'Enviando...' : 'Enviar información' }}
      </button>
    </div>

    <transition name="fade">
      <div v-if="responses.benchMarking" class="response-box">
        <strong>Respuesta del asistente:</strong>
        <p>{{ responses.benchMarking }}</p>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="errors.benchMarking" class="response-box error">
        <strong>Error:</strong>
        <p>{{ errors.benchMarking }}</p>
      </div>
    </transition>
  </div>

  <!-- Cajita 2: Análisis Regulatorio y de Tendencias -->
  <div class="box">
    <div class="box-head">
      <h3 class="box-title">Análisis Regulatorio y de Tendencias</h3>
    </div>
    <div class="box-body">
      <label class="field-label">¿Has identificado alguna nueva ley o regulación (local, nacional o internacional) relacionada con la sostenibilidad que pueda afectar a tu negocio a corto o medio plazo?</label>
      <textarea class="field-textarea" rows="3" v-model="fase2.regulatorio.p3" placeholder="Ejemplo: La nueva normativa europea sobre emisiones para el transporte marítimo (EU ETS) tendrá un impacto financiero directo en nuestros costes operativos."></textarea>

      <label class="field-label">¿Qué tendencias de consumo o de mercado relacionadas con la sostenibilidad podrían representar una OPORTUNIDAD para tu negocio?</label>
      <textarea class="field-textarea" rows="3" v-model="fase2.regulatorio.p4" placeholder="Ejemplo: El aumento de la demanda de los consumidores por productos con certificaciones ecológicas y de proximidad."></textarea>

      <label class="field-label">¿Qué tendencias de sostenibilidad podrían representar un RIESGO para tu negocio si no se gestionan adecuadamente?</label>
      <textarea class="field-textarea" rows="3" v-model="fase2.regulatorio.p5" placeholder="Ejemplo: La preferencia de los grandes clientes por proveedores que puedan demostrar una gestión activa de su huella de carbono."></textarea>

      <label class="field-label">¿Ha habido alguna controversia pública o incidente negativo (ambiental o social) en tu sector durante los últimos dos años? Descríbelo brevemente.</label>
      <textarea class="field-textarea" rows="3" v-model="fase2.regulatorio.p6" placeholder="Ejemplo..."></textarea>

      <label class="field-label">¿Qué nueva legislación o regulación en materia de sostenibilidad (actual o futura) te preocupa más?</label>
      <textarea class="field-textarea" rows="3" v-model="fase2.regulatorio.p7" placeholder="CSDDD, normativas sobre plásticos, taxonomía verde..."></textarea>
    
      <label class="field-label">¿Qué tipo de información ESG te están pidiendo los bancos o inversores?</label>
      <textarea class="field-textarea" rows="3" v-model="fase2.regulatorio.p8" placeholder="Huella de carbono, datos de diversidad, políticas de derechos humanos..."></textarea>
    
      <label class="field-label">¿Hay algún grupo de interés (clientes importantes, ONGs, comunidades) que te haya solicitado información específica sobre algún tema de sostenibilidad en particular? ¿Cuál?</label>
      <textarea class="field-textarea" rows="3" v-model="fase2.regulatorio.p9" placeholder="Ejemplo..."></textarea>
    
    
    </div>
    <div class="box-actions">
      <button class="btn btn-primary" :disabled="!usernameConfirmed || loading.regulatorio" @click="submitRegulatorio">
        {{ loading.regulatorio ? 'Enviando...' : 'Enviar información' }}
      </button>
    </div>

    <transition name="fade">
      <div v-if="responses.regulatorio" class="response-box">
        <strong>Respuesta del asistente:</strong>
        <p>{{ responses.regulatorio }}</p>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="errors.regulatorio" class="response-box error">
        <strong>Error:</strong>
        <p>{{ errors.regulatorio }}</p>
      </div>
    </transition>
  </div>

  <!-- Cajita 3: Revisión de Marcos y Estándares -->
  <div class="box">
    <div class="box-head">
      <h3 class="box-title">Revisión de Marcos y Estándares de Sostenibilidad</h3>
    </div>
    <div class="box-body">
      <label class="field-label">Además de los ESRS, ¿has consultado algún otro marco de sostenibilidad reconocido para identificar temas relevantes?</label>

      <div class="options">
        <label v-for="(opt, i) in frameworkOptions" :key="i" class="check-label" :for="'fw-'+i">
          <input type="checkbox" :id="'fw-'+i" :value="opt" v-model="fase2.frameworks.selected" />
          <span>{{ opt }}</span>
        </label>
      </div>
    </div>
    <div class="box-actions">
      <button class="btn btn-primary" :disabled="!usernameConfirmed || loading.frameworks" @click="submitFrameworks">
        {{ loading.frameworks ? 'Enviando...' : 'Enviar información' }}
      </button>
    </div>

    <transition name="fade">
      <div v-if="responses.frameworks" class="response-box">
        <strong>Respuesta del asistente:</strong>
        <p>{{ responses.frameworks }}</p>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="errors.frameworks" class="response-box error">
        <strong>Error:</strong>
        <p>{{ errors.frameworks }}</p>
      </div>
    </transition>
  </div>
</div>


      <!-- FASE 3 (NUEVA): Ejecución de análisis de doble materialidad -->
<div v-else-if="faseActual === 3" class="panel">
  <div class="step-head">
    <div class="step-title">
      <strong>Ejecución de análisis de doble materialidad</strong>
    </div>
  </div>

  <div class="box">
    <div class="box-head">
      <h3 class="box-title">Ejecute su análisis</h3>
    </div>
    <div class="box-body">
      <p class="field-label">Pulsa el botón para ejecutar el análisis con el usuario actual.</p>
    </div>
    <div class="box-actions">
      <button
        class="btn btn-primary"
        :disabled="!usernameConfirmed || loading.execute"
        @click="submitExecuteAnalysis"
      >
        {{ loading.execute ? 'Ejecutando...' : 'Ejecutar' }}
      </button>
    </div>

    <transition name="fade">
      <div v-if="responses.execute" class="response-box">
        <strong>Respuesta del asistente:</strong>
        <p>{{ responses.execute }}</p>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="errors.execute" class="response-box error">
        <strong>Error:</strong>
        <p>{{ errors.execute }}</p>
      </div>
    </transition>
  </div>
</div>

<!-- FASE 4 (ANTES era FASE 3): Consulta a Stakeholders -->
<div v-else class="panel">
  <div class="step-head">
    <div class="step-title"><strong>Consulta a Stakeholders (Fuente de Datos 3)</strong></div>
  </div>
</div>

    </section>

    <!-- Acciones -->
    <div class="form-actions">
      <button class="btn btn-secondary" @click="$router.push('/')">Volver al dashboard</button>
      <button class="btn btn-primary" @click="saveAndContinue">{{ ctaLabel }}</button>
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
  name: 'Module2Materiality',
  data() {
    return {
      // Username UI
      usernameDraft: '',
      usernameConfirmed: false,
      faseActual: 1,
      fase1: {
        estrategia: { p1: '', p2: '', p3: '' },
        riesgos: {
          operativos: '',
          cadena: '',
          mercado: '',
          vinculoSostenibilidad: '',
        },
        dafo: {
          fortalezas: '',
          debilidades: '',
          oportunidades: '',
          amenazas: '',
        },
        cadenaValor: { p8: '', p9: '', p10: '', p11: '' },
        preocupacionesDireccion: {p12: ''},
        politicasCompromisos: {p13: ''}
      },
      usernameError: '',
      fase2: {
      benchmarking: { p1: '', p2: '' },
      regulatorio:  { p3: '', p4: '', p5: '', p6: '', p7: '', p8: '', p9: ''},
      frameworks:   { selected: [] }
    },
    frameworkOptions: [
      'Estándares GRI (Global Reporting Initiative)',
      'Estándares SASB (específicos por industria)',
      'Principios Rectores de la ONU sobre Empresas y Derechos Humanos',
      'Objetivos de Desarrollo Sostenible (ODS)'
    ],
    paths: {
  base: '/api/v1/agent',
  // Fase 1
  estrategia: '/strategyAndBusinessModel',
  riesgos: '/riskAndOpportunities',
  dafo: '/dafo',
  cadenaValor: '/valueChain',
  preocupacionesDireccion: '/managementConcerns',
  politicasCompromisos: '/policiesAndCommits',
  // Fase 2
  benchMarking: '/benchMarking',
  regulatoryAnalysis: '/regulatoryAnalysis',
  frameworksAndSustainability: '/frameworksAndSustainability',
  // Fase 3 (nueva)
  executeAnalysis: '/executeAnalysis',
},

loading: {
  // Fase 1
  estrategia: false,
  riesgos: false,
  dafo: false,
  cadenaValor: false,
  preocupacionesDireccion: false,
  politicasCompromisos: false,
  // Fase 2
  benchMarking: false,
  regulatorio: false,
  frameworks: false,
  // Fase 3
  execute: false,
},

responses: {
  estrategia: '',
  riesgos: '',
  dafo: '',
  cadenaValor: '',
  benchMarking: '',
  regulatorio: '',
  frameworks: '',
  execute: '',
  politicasCompromisos: '',
  preocupacionesDireccion: ''
},

errors: {
  estrategia: '',
  riesgos: '',
  dafo: '',
  cadenaValor: '',
  benchMarking: '',
  regulatorio: '',
  frameworks: '',
  execute: '',
  politicasCompromisos: '',
  preocupacionesDireccion: ''
},

    };
    
  },
  computed: {
    ctaLabel() {
      return this.faseActual < 4
        ? 'Guardar y continuar a la siguiente fase'
        : 'Guardar y continuar al siguiente módulo';
    },

    username() {
      return this.usernameDraft; // alias para usar en las peticiones
    },
  },
  methods: {
  async submitExecuteAnalysis() {
  this.errors.execute = '';
  this.responses.execute = '';
  this.loading.execute = true;

  try {
    const url = `${this.paths.base}${this.paths.executeAnalysis}`;
    // El endpoint espera @RequestParam("username"), sin body.
    const { data } = await api.post(url, null, { params: { username: this.username } });
    this.responses.execute = data?.answer ?? '(Sin contenido)';
  } catch (e) {
    const msg =
      e?.response?.data?.message ||
      e?.response?.data?.error ||
      e?.message ||
      'Error desconocido';
    this.errors.execute = `No se pudo ejecutar el análisis. Detalle: ${msg}`;
  } finally {
    this.loading.execute = false;
  }
},

    confirmUsername() {
      // Validaciones similares a AskRequest
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

    buildPromptEstrategia() {
      const { p1, p2, p3 } = this.fase1.estrategia;
      return [
        'Revisión de la Estrategia y el Modelo de Negocio:',
        `1) Modelo de negocio: ${p1}`,
        `2) Zonas geográficas: ${p2}`,
        `3) Planes 5 años: ${p3}`,
      ].join('\n');
    },
    buildPromptRiesgos() {
      const { operativos, cadena, mercado, vinculoSostenibilidad } = this.fase1.riesgos;
      return [
        'Análisis del Mapa de Riesgos Corporativo:',
        `1) Riesgos Operativos: ${operativos}`,
        `2) Cadena de Suministro: ${cadena}`,
        `3) Mercado y Reputación: ${mercado}`,
        `4) Vínculo con Sostenibilidad: ${vinculoSostenibilidad}`,
      ].join('\n');
    },
    buildPromptDafo() {
      const { fortalezas, debilidades, oportunidades, amenazas } = this.fase1.dafo;
      return [
        'Talleres Internos y Entrevistas (DAFO):',
        `F: ${fortalezas}`,
        `D: ${debilidades}`,
        `O: ${oportunidades}`,
        `A: ${amenazas}`,
      ].join('\n');
    },
    buildPromptCadenaValor() {
      const { p8, p9, p10, p11 } = this.fase1.cadenaValor;
      return [
        'Análisis de la Cadena de Valor:',
        `1) Materias primas y origen: ${p8}`,
        `2) Fases del proceso: ${p9}`,
        `3) Intensidad (energía/agua/residuos): ${p10}`,
        `4) Fin de vida del producto: ${p11}`,
      ].join('\n');
    },
    buildPromptPreocupacionesDireccion() {
      const { p12 } = this.fase1.preocupacionesDireccion;
      return [
        `1) Temas de sostenibilidad: ${p12}`,
      ].join('\n');
    },
    buildPromptPoliticasCompromisos() {
      const { p13 } = this.fase1.politicasCompromisos;
      return [
        `1) Politicas y Compromisos ${p13}`,
      ].join('\n');
    },
    // Prompts Fase 2
buildPromptBenchMarking() {
  const { p1, p2 } = this.fase2.benchmarking;
  return [
    'Benchmarking Sectorial (Análisis de Competencia):',
    `1) Competidores/líderes: ${p1}`,
    `2) Temas de sostenibilidad destacados: ${p2}`,
  ].join('\n');
},
buildPromptRegulatorio() {
  const { p3, p4, p5, p6, p7, p8, p9 } = this.fase2.regulatorio;
  return [
    'Análisis Regulatorio y de Tendencias:',
    `1) Nuevas leyes/regulaciones: ${p3}`,
    `2) Tendencias (OPORTUNIDAD): ${p4}`,
    `3) Tendencias (RIESGO): ${p5}`,
    `4) Controversias o incidentes: ${p6}`,
    `5) Legislación preocupante: ${p7}`,
    `6) Información ESG requerida: ${p8}`,
    `7) Grupos de interés: ${p9}`,
    
  ].join('\n');
},
buildPromptFrameworks() {
  const sel = this.fase2.frameworks.selected;
  const texto = sel.length ? sel.map((s, i) => `${i + 1}) ${s}`).join('\n') : 'Ninguno';
  return [
    'Revisión de Marcos y Estándares de Sostenibilidad:',
    'Además de ESRS, marcos consultados:',
    texto,
  ].join('\n');
},

// Submit Fase 2
async submitBenchMarking() {
  await this.postAsk(this.paths.benchMarking, this.buildPromptBenchMarking(), 'benchMarking');
},
async submitRegulatorio() {
  await this.postAsk(this.paths.regulatoryAnalysis, this.buildPromptRegulatorio(), 'regulatorio');
},
async submitFrameworks() {
  await this.postAsk(this.paths.frameworksAndSustainability, this.buildPromptFrameworks(), 'frameworks');
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

    async submitEstrategia() {
      await this.postAsk(this.paths.estrategia, this.buildPromptEstrategia(), 'estrategia');
    },
    async submitRiesgos() {
      await this.postAsk(this.paths.riesgos, this.buildPromptRiesgos(), 'riesgos');
    },
    async submitDafo() {
      await this.postAsk(this.paths.dafo, this.buildPromptDafo(), 'dafo');
    },
    async submitCadenaValor() {
      await this.postAsk(this.paths.cadenaValor, this.buildPromptCadenaValor(), 'cadenaValor');
    },
    async submitPreocupacionesDireccion() {
      await this.postAsk(this.paths.preocupacionesDireccion, this.buildPromptPreocupacionesDireccion(), 'preocupacionesDireccion');
    },
    async submitPoliticasCompromisos() {
      await this.postAsk(this.paths.politicasCompromisos, this.buildPromptPoliticasCompromisos(), 'politicasCompromisos');
    },

    saveAndContinue() {
      if (this.faseActual < 4) { this.faseActual += 1; return; }
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

/* Panel / Box */
.panel { display:flex; flex-direction:column; gap:18px; }
.box{ border:1px solid var(--border); border-radius:14px; background:rgba(0,0,0,.08); overflow:hidden; }
.box-head{ padding:14px 16px; border-bottom:1px solid var(--border); background:rgba(255,255,255,.04); }
.box-title{ margin:0; font-size:15px; font-weight:800; }
.box-body{ padding:14px 16px; display:flex; flex-direction:column; gap:12px; }
.box-actions{ padding:14px 16px; border-top:1px solid var(--border); display:flex; justify-content:flex-end; }

.field-label { display:block; font-size:14px; color:var(--mutetext); margin:8px 0 4px; }
.field-textarea {
  width:100%; border-radius:12px; border:1px solid var(--border);
  padding:12px 14px; background:rgba(0,0,0,.15); color:var(--text);
  outline:none; box-shadow:none; resize:vertical;
}
.field-input{
  width:100%; border-radius:12px; border:1px solid var(--border);
  padding:10px 12px; background:rgba(0,0,0,.15); color:var(--text);
  outline:none; box-shadow:none;
}
.field-textarea:focus, .field-input:focus { border-color:var(--accent); box-shadow:0 0 0 2px var(--accent-weak); }

.form-actions{ display:flex; justify-content:space-between; align-items:center; margin-top:24px; }
.btn{ border:0; border-radius:12px; padding:12px 18px; font-weight:700; cursor:pointer; }
.btn-secondary{ background:rgba(255,255,255,.08); color:var(--text); }
.btn-secondary:hover{ background:rgba(255,255,255,.12); }
.btn-primary{ background:var(--accent); color:#062c23; }
.btn-primary:hover{ background:color-mix(in srgb, var(--accent) 85%, black); }
.btn:disabled{ opacity:.6; cursor:not-allowed; }

/* Cajita de respuesta */
.response-box{
  margin:12px 16px 16px;
  border:1px solid var(--border);
  background:rgba(255,255,255,.06);
  border-radius:12px;
  padding:12px 14px;
  color:var(--text);
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

/* Fade in */
.fade-enter-active, .fade-leave-active { transition: opacity .18s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.input-error{ color:#ff7a7a; font-size:13px; margin-top:6px; }
.options { display:flex; flex-direction:column; gap:10px; }
/* Alineación correcta de checkboxes + texto */
.check-label{
  display:flex;
  align-items:flex-start; /* clave: alinear arriba, no centrado vertical */
  gap:10px;
}

.check-label input[type="checkbox"]{
  width:18px;
  height:18px;
  margin:0;
  margin-top:2px; /* pequeño ajuste para que no “caiga” */
}

.check-label span{
  line-height:1.25; /* mejora lectura en varias líneas */
}


</style>
