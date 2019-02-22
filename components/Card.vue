<template>
  <li class="portfolio__item">
    <nuxt-link 
      :to="{ path: 'blogs/'+work.name, params: { slug: work.name }}"
      class="portfolio__thumb-inner">
      <div class="portfolio__thumb-hover" :style="backgroundColor">
        <div class="portfolio__thumb-text">
          <h3 class="portfolio__thumb-description" :class="{ 'portfolio__thumb-description--dark' : work.isTextColorDark }">
            {{ work.title }}
          </h3>
          <h3 
            class="portfolio__thumb-client" :class="{ 'portfolio__thumb-client--dark' : work.isTextColorDark }">
            {{ work.description }}
          </h3>
        </div>
      </div>
    </nuxt-link>
    <div class="portfolio__description">
      {{ work.title }}
    </div>
    <div class="portfolio__client">
      {{ work.description }}
    </div>
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
      backgroundColor () {
        return `background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, ${this.work.color} 70%)`
      }
    }
  }
</script>

