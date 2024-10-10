<template>
  <b-navbar toggleable="lg" type="dark" class="bg-black">
    <b-navbar-brand href="#" to="/" class="font-weight-bold">
      Image Manager
    </b-navbar-brand>

    <b-navbar-toggle
      target="nav-collapse"
      v-show="keys.islogged"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-show="keys.islogged">
        <b-nav-item href="#" to="/table">TABLE</b-nav-item>
        <b-nav-item href="#" to="/uploaddata">UPLOAD</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto" v-show="keys.islogged">
        <b-nav-item-dropdown right v-show="keys.islogged">
          <template #button-content>
            <em>
              <b-avatar
                src="./images/cookie.png"
                size="1.8rem"
                class="mr-2"></b-avatar
              >Administrator
            </em>
          </template>
          <b-dropdown-item href="#" @click="keys.performLogout()"
            >Sign Out</b-dropdown-item
          >
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<style scoped>
.bg-black {
  background-color: black;
}

.logo-img {
  height: 50px;
  width: auto;
}
</style>

<script>
module.exports = {
  props: ["keys"],
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
