import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PeoplesView from '../views/PeoplesView.vue'
import FavoritesView from "@/views/FavoritesView.vue";
import PeopleView from "@/views/PeopleView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/peoples',
    children: [
      {
        name: 'peoples',
        path: '/peoples',
        component: PeoplesView,
      },
      {
        name: 'person',
        path: '/peoples/:id',
        component: PeopleView,
      },
    ],
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
