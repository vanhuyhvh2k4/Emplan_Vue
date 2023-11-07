import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerComponent } from './config/import';

import "./assets/styles/tailwind.css";
import "./assets/styles/global.css";

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');

registerComponent(app);