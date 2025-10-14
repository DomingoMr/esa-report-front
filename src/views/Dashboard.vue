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
    <!-- Lista de usuarios -->
<section class="panel user-list">
  <div class="user-list-head">
    <h3 style="margin:0; font-size:18px; font-weight:800">Usuarios existentes</h3>
    <button class="btn btn-secondary" :disabled="loadingUsers" @click="loadUsers">
      {{ loadingUsers ? 'Cargando...' : 'Recargar' }}
    </button>
  </div>

  <p v-if="usersError" class="msg error">❌ {{ usersError }}</p>
  <p v-else-if="loadingUsers" class="msg">Cargando usuarios…</p>
  <p v-else-if="users.length === 0" class="msg">Aún no hay usuarios creados.</p>

  <ul v-else class="user-list-ul">
    <li v-for="u in users" :key="u">👤 {{ u }}</li>
  </ul>
</section>

    <!-- Crear usuario -->
<section class="panel user-create">
  <h3 style="margin:0; font-size:18px; font-weight:800">Crear usuario</h3>
  <p style="margin:6px 0 12px; color:var(--mutetext)">Crea un usuario para asociar respuestas en los módulos.</p>

  <div class="user-create-row">
    <input
      v-model.trim="newUser"
      type="text"
      class="field-input"
      maxlength="120"
      placeholder="Nombre de usuario (máx. 120)"
      @keyup.enter="registerUser"
    />
    <button class="btn btn-primary"
            :disabled="creating || !newUser"
            @click="registerUser">
      {{ creating ? 'Creando...' : 'Crear usuario' }}
    </button>
  </div>

  <p v-if="userSuccess" class="msg success">✅ Usuario creado: {{ userSuccess }}</p>
  <p v-if="userError" class="msg error">❌ {{ userError }}</p>
</section>

</template>
  
  <script>
  import ReportProgressBar from '../components/ReportProgressBar.vue'
  import ModuleCard from '../components/ModuleCard.vue'
  import axios from 'axios' 

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})
  
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
        ],
        newUser: '',
      creating: false,
      userSuccess: '',
      userError: '',
      users: [],
    loadingUsers: false,
    usersError: '',
      }
    },
    mounted() {
  this.loadUsers();
},
    methods:{
      async loadUsers(){
    this.usersError = '';
    this.loadingUsers = true;
    try{
      const { data } = await api.get('/api/users/usernames'); // -> List<String>
      this.users = Array.isArray(data) ? data : [];
    }catch(e){
      const msg = e?.response?.data?.message || e?.response?.data?.error || e?.message || 'Error desconocido';
      this.usersError = `No se pudo cargar la lista de usuarios. Detalle: ${msg}`;
    }finally{
      this.loadingUsers = false;
    }
  },
      openModule(id){ this.$router.push(`/modulos/${id}`) },
      async registerUser(){
      this.userSuccess = ''
      this.userError = ''

      if(!this.newUser || !this.newUser.trim()){
        this.userError = 'El nombre de usuario es obligatorio.'
        return
      }
      if(this.newUser.length > 120){
        this.userError = 'El nombre de usuario no puede superar 120 caracteres.'
        return
      }

      this.creating = true
      try {
        const { data } = await api.post('/api/users', { username: this.newUser })
        // Muestra algo útil (username o id)
        this.userSuccess = data?.username || `ID ${data?.id || 'desconocido'}`
        this.newUser = ''
      } catch (e) {
        const msg = e?.response?.data?.message || e?.response?.data?.error || e?.message || 'Error desconocido'
        this.userError = `No se pudo crear el usuario. Detalle: ${msg}`
      } finally {
        this.creating = false
      }
    }
    }
  }
  </script>
  
  <style>
/* Crear usuario */
.user-create { margin-top: 24px; }
.user-create-row{
  display:flex; gap:10px; align-items:center; margin-top:8px;
}
.user-create-row .field-input{
  flex:1; border-radius:12px; border:1px solid var(--border);
  padding:10px 12px; background:rgba(0,0,0,.15); color:var(--text);
  outline:none; box-shadow:none;
}
.user-create-row .field-input:focus{
  border-color: var(--accent); box-shadow: 0 0 0 2px var(--accent-weak);
}
.msg{ margin-top:8px; font-size:14px; }
.msg.success{ color:#65d172; }
.msg.error{ color:#ff7a7a; }
/* Lista de usuarios */
.user-list { margin-top: 24px; }
.user-list-head{
  display:flex; justify-content:space-between; align-items:center; gap:10px;
  margin-bottom:8px;
}
.user-list-ul{
  list-style:none; padding-left:0; margin:8px 0 0;
  display:flex; flex-direction:column; gap:6px;
}
.user-list-ul li{
  padding:8px 10px; border:1px solid var(--border); border-radius:10px;
  background:rgba(255,255,255,.04);
}


</style>