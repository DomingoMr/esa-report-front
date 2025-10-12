<template>
  <button :class="['nav-item', { active }]" class="nav-btn">
    <span style="opacity:.75; margin-right:8px">{{ icon }}</span> {{ label }}
  </button>
</template>

<script>
export default {
  name:'NavItem',
  props:{ icon:String, label:String, active:{type:Boolean,default:false} }
}
</script>

<style scoped>
.nav-btn{ width:100%; text-align:left; border:0; outline:0; cursor:pointer;
  padding:12px 16px; border-radius:12px; background:transparent; color:inherit; }
.nav-btn:hover{ background:rgba(255,255,255,.06) }
.nav-btn.active{ background:rgba(255,255,255,.10); box-shadow:0 0 0 1px rgba(255,255,255,.10) inset }
</style>
