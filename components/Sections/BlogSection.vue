<template>
  <section>
    <ul>
      <card
        v-for="blog in blogs"
        :key="blog.name"
        :project="blog"/>
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
