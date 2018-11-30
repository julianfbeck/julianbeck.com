<template>
  <div class="home">
    <div class="center">
      <figure class="image is-128x128 center">
        <img class="is-rounded" src="https://avatars2.githubusercontent.com/u/7285926?s=460&v=4">
      </figure>
      <p class="title is-1">Julian Beck</p>
      <p class="subtitle is-4">Computer Science Student</p>
      <p class="subtitle is-6"> Intrested in full Stack development & languages</p>
    </div>
    <a class="button is-medium" target="_blank" rel="noopener noreferrer" href="https://github.com/jufabeck2202">
      <span class="icon">
        <font-awesome-icon :icon="['fab', 'github']"/>
      </span>
      <span>GitHub</span>
    </a>
    <a class="button is-medium" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/kickbeak/">
      <span class="icon is-medium">
        <font-awesome-icon :icon="['fab', 'instagram']"/>
      </span>
      <span>Instagram</span>
    </a>
    <a  class="button is-medium" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/julian-beck/">
      <span class="icon is-medium">
        <font-awesome-icon :icon="['fab', 'linkedin']"/>
      </span>
      <span>linkedin</span>
    </a>
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
.home{
  text-align: center;
}
.center {
  margin: auto;
  width: 50%;
}
.subtitle{
  margin-bottom:  10px !important
}
.button{
  margin: 3px
}
</style>