<template>
  <div class="progress-wrap">
    <div class="progress-track">
      <div class="progress-bar" :style="{ width: (completed*100) + '%' }"></div>
    </div>
    <div class="progress-meta">
      <span>Progreso del informe</span>
      <span>{{ (completed*100).toFixed(0) }}%</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'ReportProgressBar',
  props:{ completed:{type:Number,default:0} }
}
</script>
