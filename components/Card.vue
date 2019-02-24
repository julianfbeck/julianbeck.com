<template>
  <li>
    <nuxt-link :to="{ path: 'blogs/'+project.name, params: { slug: project.name }}">
      <div class="">
        <h3>
          {{ project.title }}
        </h3>
        <h3>
          {{ project.description }}
        </h3>
      </div>
    </nuxt-link>
  </li>
</template>

<script lang="js">
  export default {
    props: {
      project: {
        type: Object
      },
      article: {
        type: Object
      }
    },

    computed: {

    }
  }
</script>