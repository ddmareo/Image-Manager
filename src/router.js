const Home = httpVueLoader("./components/subcomponents/home.vue");
const Table = httpVueLoader("./components/subcomponents/table.vue");
const UploadData = httpVueLoader("./components/subcomponents/upload.vue");

const isLoggedIn = (to, from, next) => {
  const user = Vue.prototype.$user;
  if (user.islogged) {
    next();
  } else {
    next({ name: "Home" });
  }
};

export default {
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/uploaddata",
      name: "Upload",
      component: UploadData,
      beforeEnter: isLoggedIn,
    },
    {
      path: "/table",
      name: "Table",
      component: Table,
      beforeEnter: isLoggedIn,
    },
  ],
};
