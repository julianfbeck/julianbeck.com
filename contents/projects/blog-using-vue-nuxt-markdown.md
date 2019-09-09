---
name: 'blog-using-vue-nuxt-markdown'
title: this is temporary
year: 
color: '#8e7964'
trans: 'blog-usando-vue-nuxt-markdown'
id: 'vue-nuxt-blog'
description: |
  test
---

## Heading 2
This is a hyper link[Vuex](https://vuex.vuejs.org/) 

## List:
- **State** (in the code <inline-code>state</inline-code>):
  - It's an object that can contain any type of information: strings, arrays or other objects.
  - It's information stored centrally throughout the app.
- **Mutations** (in the code <inline-code>mutations</inline-code>):
  - They are functions.
  - They are the only functions that can modify the state.
  - They are called by the actions.
  - They can be initialized in the component to be used through *commit* or initialized through an action.
  - They are synchronous.


But I was a rookie and I thought that this idea of ​​information centralization would be great to create this webapp with blog that I explained in this <nuxt-link to="blog-using-vue-nuxt-markdown">post</nuxt-link>. In a first step I thought about importing all the markdown files in my webapp all at once through an action that would commit a mutation to finish saving all the posts in the state. So, later I would have access from the state to all the posts or to only one, as needed in each component. For example, in the dynamic page of each post I would simply do something like that and get the post I'm looking for:

```javascript
data () {
  const blogs = this.$store.state[this.$i18n.locale].blogs
  return {
    blog: blogs[params.slug]
  }
}
```

