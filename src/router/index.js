import {
  createRouter,
  createWebHashHistory
  // createWebHistory
} from "vue-router";
import Home from "../home/Home.vue";

// const routerHistory = createWebHistory();
const routerWebHashHistory = createWebHashHistory();

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/mentors",
    name: "Mentors",
    // route level code-splitting
    // this generates a separate chunk (mentors.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "mentors" */ "../mentors/Mentors/Mentors.vue")
  },
  {
    path: "/mentors/:mentorId",
    name: "Mentor",
    component: () =>
      import(/* webpackChunkName: "mentor" */ "../mentors/Mentor/Mentor.vue")
  }
];

const router = createRouter({
  history: routerWebHashHistory,
  routes
});

export default router;
