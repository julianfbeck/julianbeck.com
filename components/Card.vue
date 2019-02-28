<template>
  <li>
    <nuxt-link :to="{ path: 'projects/'+project.name, params: { slug: project.name }}">
      <div class="box">
        <h3 class="is-size-4">
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