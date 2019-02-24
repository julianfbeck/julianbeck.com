<template>
  <li>
    <nuxt-link :to="{ path: 'blogs/'+work.name, params: { slug: work.name }}">
      <div class="">
        <h3>
          {{ work.title }}
        </h3>
        <h3>
          {{ work.description }}
        </h3>
      </div>
    </nuxt-link>
  </li>
</template>

<script lang="js">
  export default {
    props: {
      work: {
        type: Object
      },
      article: {
        type: Object
      },
      isWork: {
        type: Boolean
      }
    },

    computed: {

    }
  }
</script>