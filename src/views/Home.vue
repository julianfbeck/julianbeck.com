<template>
  <div class="home">
    <div class="center">
      <figure class="image is-128x128 center">
        <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png">
      </figure>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
<style>
.center {
    margin: auto;
    width: 50%;
}
</style>

