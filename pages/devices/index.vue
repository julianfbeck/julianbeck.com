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
      "https://api.julianbeck.com/user/5cdda570f593ba4893456066/hosts"
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
