import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/HomePage.vue";
import HorarioMisa from "@/components/HorarioMisa.vue";
import ContactPage from "@/components/ContactPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/contacto",
    name: "Contact",
    component: ContactPage,
  },
  {
    path: "/HorarioMisa",
    name: "HorarioMisa",
    component: HorarioMisa,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
