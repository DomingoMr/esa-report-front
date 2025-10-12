import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Module1 from '../views/ModuleStrategic.vue'
import Module2 from '../views/Module2Materiality.vue'
import Module3 from '../views/Module3Enviromental.vue'
import Module4 from '../views/Module4Social.vue'
import Module5 from '../views/Module5Gobernance.vue'
import Module6 from '../views/Module6Finance.vue'

const routes = [
  { path: '/', name: 'dashboard', component: Dashboard },
  { path: '/modulos/1', name: 'mod1', component: Module1 },
  { path: '/modulos/2', name: 'mod2', component: Module2 }, // placeholder
  { path: '/modulos/3', name: 'mod3', component: Module3 },
  { path: '/modulos/4', name: 'mod4', component: Module4 },
  { path: '/modulos/5', name: 'mod5', component: Module5 },
  { path: '/modulos/6', name: 'mod6', component: Module6 },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
