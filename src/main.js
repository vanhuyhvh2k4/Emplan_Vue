import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { registerComponent } from "./config/import";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import "./assets/styles/tailwind.css";
import "./assets/styles/global.css";

//fontawesome
library.add(fas, fab, far);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(store);
app.use(router);
app.mount("#app");

registerComponent(app);
