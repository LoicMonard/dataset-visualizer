import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DatasetView from "../views/DatasetView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      redirect: "/categories",
    },
    {
      path: "/",
      redirect: "/categories",
    },
    {
      path: "/categories",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/categories/:category_id",
      name: "home",
      component: DatasetView,
    },
  ],
});

export default router;
