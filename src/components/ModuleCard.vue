<template>
  <button class="module" @click="$emit('open')">
    <div class="top">
      <div style="display:flex; align-items:center;">
        <div class="icon">{{ icon }}</div>
        <h4>{{ index }}. {{ title }}</h4>
      </div>
      <span class="badge">Pendiente</span>
    </div>
    <p>{{ desc }}</p>
  </button>
</template>

<script>
export default {
  name:'ModuleCard',
  props:{ index:[String,Number], title:String, desc:String, icon:String }
}
</script>
