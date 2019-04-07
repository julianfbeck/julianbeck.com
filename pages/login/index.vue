<template>
  <div class="container">
    <h1>Please login to see the secret content</h1>
    <form v-if="!$store.state.authUser" @submit.prevent="login">
      <p v-if="formError" class="error">
        {{ formError }}
      </p>
      {{ip}}
      <p><i>To login, use <b>demo</b> as username and <b>demo</b> as password.</i></p>
      <p>Username: <input v-model="formUsername" type="text" name="username"></p>
      <p>Password: <input v-model="formPassword" type="password" name="password"></p>
      <button type="submit">
        Login
      </button>
    </form>
    <div v-else>
      Hello {{ $store.state.authUser.username }}!
      <pre>I am the secret content, I am shown only when the use is connected.</pre>
      <p><i>You can also refresh this page, you'll still be connected!</i></p>
      <HostList :hosts="hosts"/>
      <button @click="logout">
        Logout
      </button>
    </div>
    <p>
      <NuxtLink to="/secret">
        Super secret page
      </NuxtLink>
    </p>
  </div>
</template>

<script>
import HostList from "~/pages/login/HostList.vue";
export default {
  components: { HostList },
  data() {
    return {
      formError: null,
      formUsername: '',
      formPassword: '',
      sessionId:"5ca7bb3c73c8c7781bb72402"
    }
  },
  async asyncData({ $axios }) {
    const hosts = await $axios.$get('http://localhost:3001/user/5ca7bb3c73c8c7781bb72402/hosts')
  return { hosts:hosts }
},
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', {
          username: this.formUsername,
          password: this.formPassword
        })
        this.formUsername = ''
        this.formPassword = ''
        this.formError = null
      } catch (e) {
        this.formError = e.message
      }
    },
    async logout() {
      try {
        await this.$store.dispatch('logout')
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>

<style>
.container {
  padding: 100px;
}
.error {
  color: red;
}
</style>
