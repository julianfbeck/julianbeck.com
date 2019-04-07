<template>
  <div class="container">
    <HostList :hosts="hosts"/>
    <NuxtLink to="/">Back to the home page</NuxtLink>
  </div>
</template>

<script>
import HostList from "~/components/HostList.vue";
export default {
  components: { HostList },
  async asyncData({ $axios }) {
    const hosts = await $axios.$get(
      "http://localhost:3001/user/5caa44d072255e2383da700c/hosts"
    );
    return { hosts: hosts };
  }
};
</script>
