<template>
  <div class="home">
    <div class="center">
      <figure class="image is-128x128 center">
        <img class="is-rounded" src="https://avatars2.githubusercontent.com/u/7285926?s=460&v=4">
      </figure>
      <p class="title is-1">Julian Beck</p>
      <p class="subtitle is-4">Computer Science Student</p>
      <p >Intrested in full Stack development & languages</p>

    </div>
    <div class="field has-addons has-text-centered">
      <p class="control">
        <a class="button is-medium">
          <span class="icon">
            <font-awesome-icon :icon="['fab', 'github']" />
          </span>
          <span>GitHub</span>
        </a>
      </p>
      <p class="control">
        <a class="button is-medium">
          <span class="icon is-medium">
            <font-awesome-icon :icon="['fab', 'twitter']" />
          </span>
          <span>Twitter</span>
        </a>
      </p>
      <p class="control">
        <a class="button is-medium">
          <span class="icon is-medium">
            <font-awesome-icon :icon="['fab', 'linkedin']" />
          </span>
          <span>linkedin</span>
        </a>
      </p>
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