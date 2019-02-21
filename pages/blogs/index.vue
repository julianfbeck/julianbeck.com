<template>
  <div class="page-blog">
    <div class="container">
      <BlogSection :blogs="blogs"/>

    </div>
  </div>
</template>

<script>
  import BlogSection from "~/components/Sections/BlogSection"
  import blogs from '~/contents/blogs.js'

  export default {
    async asyncData ({store}) {

      
      async function asyncImport (blogName) {
        const wholeMD = await import(`~/contents/blogs/${blogName}.md`)
        return wholeMD.attributes
      }

      return Promise.all(blogs.map(blog => asyncImport(blog)))
      .then((res) => {
        return {
          blogs: res
        }
      })
    },

    components: { BlogSection },

    head () {
      return {
        title: this.$t('indexPageHead.title'),
        htmlAttrs: {
          lang: this.$i18n.locale,
        },
        meta: [
          { name: "author", content: "Marina Aisa" },
          { name: "description", property: "og:description", content: this.$t('indexPageHead.description'), hid: "description" },
          { property: "og:title", content: this.$t('indexPageHead.title') },
          { property: "og:image", content: this.ogImage },
          { name: "twitter:description", content: this.$t('indexPageHead.description') },
          { name: "twitter:image", content: this.ogImage }
        ]
      }
    },

    computed: {
      ogUrl: function () {
        return process.env.baseUrl;
      },
      ogImage: function () {
        return `${process.env.baseUrl}/images/fb-banner.jpg`;
      },
      pageTitle: function () {
        return "title";
      },
      pageDescription: function () {
        return "description";
      }
    }
  }
</script>
<style >
.page-blog {
  margin-top: 4rem;
}
</style>
