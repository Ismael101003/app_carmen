import { createApp } from "vue";
import App from "./App.vue";
import router from "./components/router.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './registerServiceWorker'; // Importar el service worker

const app = createApp(App);
app.use(router);
app.mount("#app");