<template>
  <div class="page-blog">
    <div class="container">
    </div>
    <section class="section">
      <div class="container">
        <h1 class="title">Apps</h1>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h1 class="title">Blog Entires</h1>
        <h2 class="subtitle">
          Check out the blog posts i wrote
        </h2>
          <BlogSection :blogs="blogs" />
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h1 class="title">npm Packages</h1>
        <h2 class="subtitle">
          <strong>npm Package</strong> I published
        </h2>
      </div>
    </section>
  </div>
</template>

<script>
import BlogSection from "~/components/Sections/BlogSection";
import blogs from "~/contents/projects.js";

export default {
  async asyncData({ store }) {
    async function asyncImport(blogName) {
      const wholeMD = await import(`~/contents/projects/${blogName}.md`);
      return wholeMD.attributes;
    }

    return Promise.all(blogs.map(blog => asyncImport(blog))).then(res => {
      return {
        blogs: res
      };
    });
  },

  components: { BlogSection },

  head() {
    return {
      meta: [{ name: "author", content: "Julian Beck" }]
    };
  },

  computed: {}
};
</script>
<style >
.page-blog {
  margin-top: 2rem;
}
</style>
