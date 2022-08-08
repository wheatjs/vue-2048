import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './main.css'

createApp(App)
  .use(autoAnimatePlugin)
  .use(createPinia())
  .mount('#app')
