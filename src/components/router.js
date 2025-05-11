import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/HomePage.vue";
import HorarioMisa from "@/components/HorarioMisa.vue";
import ContactPage from "@/components/ContactPage.vue";
import MinisteriosPage from "@/components/MinisteriosPage.vue";
import PeliculasPage from "@/components/peliculas.vue";
import PodcastPage from "@/components/Podcast.vue";




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
    name: "Horario",
    component: HorarioMisa,
  },
  {
    path: "/MinisteriosPage",
    name: "Ministerios",
    component: MinisteriosPage,
  },
  {
    path: "/peliculas",
    name: "Peliculas",
    component: PeliculasPage,
  },
  {
    path: '/podcast',
    name: 'Podcast',
    component: PodcastPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
