import { defineAsyncComponent } from "vue";

export function registerComponent(app) {
    app.component("Default", defineAsyncComponent(() => import("@/layouts/Default")));
}