<template>
  <div class="login-page">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
          <div class="card login">
            <h3 style="text-align: center">Sign In</h3>
            <p class="text-muted" style="font-size: 18px; text-align: center">
              File Upload
            </p>
            <form class="form-group" novalidate>
              <input
                v-model="postBody.usercode"
                type="text"
                class="form-control"
                placeholder="Username"
                maxlength="12"
                required />
              <input
                v-model="postBody.password"
                type="password"
                class="form-control"
                placeholder="Password"
                maxlength="16"
                required />
              <input
                type="submit"
                class="btn custom-gray-button"
                @click="login()" />
              <b-alert
                v-show="displayError"
                variant="danger"
                show
                class="error-Msg">
                {{ errormessage }}
              </b-alert>
              <p
                class="mt-4 text-muted"
                style="font-size: 15px; margin-top: 20px; text-align: center">
                Administrator
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
<script>
module.exports = {
  props: ["keys"],
  data() {
    return {
      postBody: { usercode: "", password: "" },
      errors: [],
      errormessage: "",
    };
  },
  computed: {
    displayError() {
      if (this.errormessage != "") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    login() {
      var self = this;
      var result = this.keys.performLogin(
        this.postBody.usercode,
        this.postBody.password
      );
      if (result) {
        this.keys.loginSuccess();
        this.postBody.usercode = "";
        this.postBody.password = "";
        this.errormessage = "";
      } else {
        this.errormessage = "Incorrect username or password.";
      }
    },
  },
};
</script>

<style scoped>
.custom-gray-button {
  background-color: #141414;
  color: #fff;
  border: none;
}

.custom-gray-button:hover {
  background-color: #3b3b3b;
}

input {
  text-align: center;
}

.error-Msg {
  text-align: center;
}

p {
  line-height: 1rem;
}

.card {
  padding: 20px;
  margin-top: 25%;
}

.form-group input {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
}

.login-page {
  align-items: center;
  display: flex;
  height: 100%;
  z-index: 1;
}

.wallpaper-login {
  background-size: cover;
  height: 100%;
  position: absolute;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.wallpaper-register {
  background-size: cover;
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: -1;
}

h1 {
  margin-bottom: 1.5rem;
}

.error {
  animation-name: errorShake;
  animation-duration: 0.3s;
}

@keyframes errorShake {
  0% {
    transform: translateX(-25px);
  }
  25% {
    transform: translateX(25px);
  }
  50% {
    transform: translateX(-25px);
  }
  75% {
    transform: translateX(25px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
