<template>
  <div class="section-title-wrap">
    <div class="section-label">{{ label }}</div>
    <h2 class="section-title-text" :class="{ dark: dark }">{{ title }}</h2>
    <div class="section-line"></div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  title: String,
  dark: { type: Boolean, default: false },
})
</script>

<style scoped>
.section-title-wrap { text-align: center; }

.section-label {
  font-family: "Syne", "Jost", sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #e94560;
  margin-bottom: 10px;
}

.section-title-text {
  font-family: "Syne", "Jost", sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -1.5px;
  line-height: 1.1;
  margin-bottom: 16px;
}

.section-line {
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #e94560, #4a00e0);
  border-radius: 2px;
  margin: 0 auto;
}
</style>
