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
      "http://localhost:3001/user/5ca7bb3c73c8c7781bb72402/hosts"
    );
    return { hosts: hosts };
  }
};
</script>
