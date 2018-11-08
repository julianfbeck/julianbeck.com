<template>
  <div class="home">
    <div class="center">
      <figure class="image is-128x128 center">
        <img class="is-rounded" src="https://media.licdn.com/dms/image/C5103AQGJzi-Kdahz4A/profile-displayphoto-shrink_200_200/0?e=1547078400&v=beta&t=trnWkHcDLZYPz7PGHjxhbm8Wpx-fYaWleMUiHYG1Gzo">
      </figure>
      <h1 class="title is-1">Julian Beck</h1>
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