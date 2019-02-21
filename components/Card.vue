<template>
  <li class="portfolio__item">
    <a v-if="isWork"
      :href="work.url"
      class="portfolio__thumb-inner">
      <div class="portfolio__thumb-hover" :style="backgroundColor">
        <div class="portfolio__thumb-text">
          <h3 class="portfolio__thumb-description">
            {{ work.title }}
          </h3>
          <h3 class="portfolio__thumb-client">
            {{ work.description }}
          </h3>
        </div>
      </div>
      <ImageResponsive
        :imageURL="cardImage"
        :classes="'cardThumbnail'"
        :width="'952'"
        :height="'509'"
        :alt="work.cardAlt" />
    </a>
    <nuxt-link>
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
      nuxtLink () {
        return this.isWork ?
          'work-slug':
          'blog-slug';
      },
      backgroundColor () {
        return `background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, ${this.work.color} 70%)`
      }
    }
  }
</script>

