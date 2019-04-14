<template>
  <div class="container is-fluid">
    <HostList :hosts="hosts"/>
    <NuxtLink to="/">Back to the home page</NuxtLink>
  </div>
</template>

<script>
import HostList from "~/components/HostList.vue";
export default {
  components: { HostList },
  middleware: 'auth',
  async asyncData({ $axios }) {
    const hosts = await $axios.$get(
      "https://api.julianbeck.de/user/5caafbd7742a7432bee00135/hosts"
    );
    return { hosts: hosts };
  }
};
</script>
<style>
.container{
  margin: 3px
}
</style>
