"use strict";

import router from "./router.js";

const app1 = new Vue({
  el: "#app",
  components: {
    myheader: httpVueLoader("./components/myheader.vue"),
    mylogin: httpVueLoader("./components/login.vue"),
  },
  data() {
    return {
      showLogin: false,
      reshlogin: undefined,
      user: {
        islogged: false,
        user_id: undefined,
        isActive: undefined,
        user_code: undefined,
        user_name: undefined,
        performLogin: this.checkLogin,
        loginSuccess: this.succesfulLogin,
        performLogout: this.logoutUser,
      },
    };
  },
  computed: {},
  methods: {
    checkLogin(username, password) {
      if (username == "admin" && password == "12345") return true;
      else return false;
    },
    succesfulLogin() {
      this.user.islogged = true;
      this.$router.push("/");
    },
    logoutUser() {
      this.user.islogged = false;
      this.$router.push("/");
    },
  },
  mounted: function () {
    this.$router.push("/");
    uibuilder.start();
    var vueApp = this;
    uibuilder.onChange("msg", function (newVal) {});
  },
  router: new VueRouter(router),
});

Vue.prototype.$user = app1.user;
