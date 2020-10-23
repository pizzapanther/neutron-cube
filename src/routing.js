import VueRouter from "vue-router";

const Editor = () => import("./editor.vue");
const HomePage = () => import("./homepage.vue");

export var Routes = [
  { path: "/editor", component: Editor, name: "editor" },
  { path: "/", component: HomePage, name: "home" },
];

var ropts = {
  routes: Routes,
  mode: "history",
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
};

var Router = new VueRouter(ropts);
export default Router;
