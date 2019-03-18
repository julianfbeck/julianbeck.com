<template>
  <div class="page-blog">
    <div class="container">
      <BlogSection :blogs="blogs"/>
    </div>
  </div>
</template>

<script>
  import BlogSection from "~/components/Sections/BlogSection"
  import blogs from '~/contents/projects.js'

  export default {
    async asyncData ({store}) {
      async function asyncImport (blogName) {
        const wholeMD = await import(`~/contents/projects/${blogName}.md`)
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
        meta: [
          { name: "author", content: "Julian Beck" },
        ]
      }
    },

    computed: {
      
    }
  }
</script>
<style >
.page-blog {
  margin-top: 2rem;
}
</style>
