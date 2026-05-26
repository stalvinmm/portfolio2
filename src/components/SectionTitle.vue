<template>
  <div class="section-title-wrap animate-fade-up">
    <div class="section-label" :class="{ 'section-label--dark': dark }">{{ label }}</div>
    <h2 class="section-heading" :class="{ 'section-heading--dark': dark }">{{ title }}</h2>
    <div class="section-line" :class="{ 'section-line--dark': dark }"></div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  title: String,
  dark: Boolean,
})
</script>

<style scoped>
.section-title-wrap { text-align: center; margin-bottom: 8px; }
.section-label {
  font-family: 'Syne', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #E94560;
  margin-bottom: 10px;
}
.section-label--dark { color: rgba(233,69,96,0.8); }
.section-heading {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 800;
  color: #1A1A2E;
  letter-spacing: -1.5px;
  line-height: 1.1;
}
.section-heading--dark { color: #fff; }
.section-line {
  width: 48px;
  height: 3px;
  background: #E94560;
  border-radius: 2px;
  margin: 16px auto 0;
}
.section-line--dark { background: rgba(233,69,96,0.7); }
</style>
