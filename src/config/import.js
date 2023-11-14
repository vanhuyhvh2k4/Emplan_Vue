import { defineAsyncComponent } from "vue";

export function registerComponent(app) {
  app.component(
    "Default",
    defineAsyncComponent(() => import("@/layouts/Default.layout.vue")),
  );
  app.component(
    "Empty",
    defineAsyncComponent(() => import("@/layouts/Empty.layout.vue")),
  );
  app.component(
    "Auth",
    defineAsyncComponent(() => import("@/layouts/Auth.layout.vue")),
  );
}
