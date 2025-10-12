<template>
  <div class="app">
    <!-- Sidebar (oculto en móvil mediante .hidden-md en tu CSS global) -->
    <aside class="sidebar hidden-md">
      <div class="brand">
        <h1>Enterprise Flow</h1>
        <p>CSRD Reporting</p>
      </div>

      <nav class="nav">
        <button class="nav-btn" :class="{ active: $route.name === 'dashboard' }" @click="$router.push('/')">
          📊 Dashboard
        </button>
        <button class="nav-btn" :class="{ active: $route.name === 'mod1' }" @click="$router.push('/modulos/1')">
          📄 Marco Estratégico
        </button>
        <button class="nav-btn" :class="{ active: $route.name === 'mod2' }" @click="$router.push('/modulos/2')">
          📈 Doble Materialidad
        </button>
      </nav>

      <div class="foot">© {{ year }} · Enterprise Flow</div>
    </aside>

    <!-- Contenido principal: aquí se renderizan Dashboard y los módulos -->
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    year() {
      return new Date().getFullYear();
    }
  }
}
</script>
