
<template>
  <div class="container is-fluid">
    <form @submit.prevent="requestLogin">

      <b-field label="Username"  type="is-success">
        <b-input v-model="form.username" value="123" maxlength="30"></b-input>
      </b-field>

      <b-field label="Password">
        <b-input type="password" v-model="form.password" value="" message="pw is 123" ></b-input>
      </b-field>
      <input type="submit" class="button is-fullwidth">
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  created() {
    if (this.$auth.$state.loggedIn) {
      this.$router.replace({ name: "index" });
    }
  },
  methods: {
    requestLogin() {
      this.$auth.loginWith("local", {
        data: {
          username: this.form.username,
          password: this.form.password
        }
      });
    }
  }
};
</script> 