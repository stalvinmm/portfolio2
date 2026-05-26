import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1A1A2E',
          secondary: '#16213E',
          accent: '#E94560',
          surface: '#FFFFFF',
          background: '#F7F7F9',
          'on-background': '#1A1A2E',
          info: '#4FC3F7',
          success: '#66BB6A',
        },
      },
    },
  },
  defaults: {
    VBtn: { style: 'font-family: Syne, sans-serif; font-weight: 600; letter-spacing: 0.5px;' },
    VCard: { rounded: 'xl' },
    VChip: { rounded: 'lg' },
  },
})

createApp(App).use(vuetify).mount('#app')
