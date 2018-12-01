<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://julianbeck.com">
          <img src="/img/julianBeck.png" width="112" height="28">
        </a>

         <div class="navbar-burger burger" v-on:click="showNav = !showNav" v-bind:class="{ 'is-active' : showNav }" data-target="navbarExampleTransparentExample">
                    <span></span>
                    <span></span>
                    <span></span>
        </div>
      </div>

      <div id="navbarBasicExample" class="navbar-menu" v-bind:class="{ 'is-active' : showNav }">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Home</router-link>
          <router-link class="navbar-item" to="/projects">
            Project
          </router-link>
          <router-link class="navbar-item" to="/contact">
            Contact me
          </router-link>
        <!-- comment out
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              More
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                About
              </a>
              <a class="navbar-item">
                Jobs
              </a>
              <a class="navbar-item">
                Contact
              </a>
              <hr class="navbar-divider">
              <a class="navbar-item">
                Report an issue
              </a>
            </div>
          </div>
          -->
        </div>
      </div>
    </nav>
    <transition
        name="fade"
        mode="out-in"
      >
      </transition>
    <router-view />
  </div>
</template>
<script>
export default {
   data() {
        return {
            showNav: false,
        } 
}
}
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