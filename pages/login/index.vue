
<template>
  <div>
    <form @submit.prevent="requestLogin">
      <input type="text" v-model="form.username" placeholder="123">
      <input type="password" v-model="form.password" placeholder="123">
      <input type="submit">
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  created () {
    if (this.$auth.$state.loggedIn) {
      this.$router.replace({ name: 'index' })
    }
  },
  methods: {
    requestLogin () {
      this.$auth.loginWith('local', {
        data: {
          username: this.form.username,
          password: this.form.password
        }
      })
    }
  }
}
</script>