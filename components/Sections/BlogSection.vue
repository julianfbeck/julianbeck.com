<template>
  <section>
    <ul>
      <card
        v-for="blog in blogs"
        :key="blog.name"
        :work="blog"
        :isWork="false" />
    </ul>
  </section>
</template>
<script>
import Card from "~/components/Card.vue";
export default {
  components: { Card },
  props: {
    blogs: {
      type: Array
    }
  }
}
</script>
