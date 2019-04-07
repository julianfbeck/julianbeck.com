<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">

        <div
          class="navbar-burger burger"
          v-on:click="showNav = !showNav"
          v-bind:class="{ 'is-active' : showNav }"
          data-target="navbarExampleTransparentExample">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navbarBasicExample" class="navbar-menu" v-bind:class="{ 'is-active' : showNav }">
        <div class="navbar-start">
          <nuxt-link class="navbar-item" to="/">Home</nuxt-link>
          <nuxt-link class="navbar-item" to="/projects">Project</nuxt-link>
          <nuxt-link class="navbar-item" to="/devices">Devices</nuxt-link>
          <nuxt-link class="navbar-item" to="/contact">Contact me</nuxt-link>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showNav: false
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
