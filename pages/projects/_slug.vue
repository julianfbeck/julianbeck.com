<template>
  <div class="blogSelected">
    <div class="intro">
      <div class="elevate-cover">
        <div class="elevate-cover__textOffset">
          <div class="elevate-cover__text">
            <span class="blogSelected-year">{{ year }}</span>
            <h1 >
              {{ title }} 
            </h1>
            <p class="elevate-cover__description">{{ description }}</p>
          </div>
        </div>
        <ImageResponsive
          :imageURL="'blog/' + id + '/_main.jpg'"
          width="100%"
          class="elevate-cover__img"
          :alt="'Blog picture'" />
      </div>
    </div>
    <div class="container small">
      <DynamicMarkdown
        :render-func="renderFunc"
        :static-render-funcs="staticRenderFuncs" />
    </div>
  </div>
</template>

<script lang="js">
  
  import DynamicMarkdown from "~/components/Markdown/DynamicMarkdown.vue"
  import Card from "~/components/Card.vue"


  export default {

    async asyncData ({params, store}) {
      const fileContent = await import(`~/contents/projects/${params.slug}.md`)
      const attr = fileContent.attributes
      return {
        name: params.slug,
        title: attr.title,
        trans: attr.trans,
        year: attr.year,
        id: attr.id,
        owner: attr.owner,
        colors: attr.colors,
        role: attr.role,
        cardAlt: attr.cardAlt,
        description: attr.description,
        related: attr.related,
        renderFunc: fileContent.vue.render,
        staticRenderFuncs: fileContent.vue.staticRenderFns,
        image: {
          main: attr.image && attr.image.main,
          og: attr.image && attr.image.og
        }
      }
    },


    components: { DynamicMarkdown, Card },

    head () {
      return {
        title: this.pageTitle,
        meta: [
          { name: "author", content: "Julian Beck" },
          { name: "description", property: "og:description", content: this.description, hid: "description" },
          { property: "og:title", content: this.pageTitle },
          { property: "og:image", content: this.ogImage },
          { name: "twitter:description", content: this.description },
          { name: "twitter:image", content: this.ogImage }
        ],

      };
    },

    computed: {
      ogImage: function () {
        return `${process.env.baseUrl}/images/blog/${this.id}/_thumbnail.jpg`;
      },
      pageTitle: function () {
        return this.title + ' – Marina Aisa';
      },
    },
    
  }
</script>

<style lang="scss">
.dynamicMarkdown {
  code {
    background: #f3f4f4;
    border-radius: 4px;
    display: inline;
    color: #030303;
    font-size: 14px;
    padding: .2em .4em;
  }
  pre {
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
    padding: 2.4rem;
    border-radius: 4px;
    background-color: #f6f8fa;
    overflow-x: scroll;
    display: block;
    margin-bottom: 5rem;
    code {
      background-color: #f6f8fa;
    }
  }
  h1{
    class: blue;
  }
}


</style>