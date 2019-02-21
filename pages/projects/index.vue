<template>
    <div class="container">
        <h1>Blog</h1>
        <ul>
            <li v-for="(post, index) in posts" :key="index">
                <nuxt-link :to="{ name: 'posts-id', params: { id: post.name } }">
                    {{ post.name }}
                </nuxt-link>
            </li>
        </ul>
        <p>
            <nuxt-link to="/">Back to home page</nuxt-link>
        </p>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        async asyncData({
            app,
            req,
            params
        }) {
            const url = 'https://api.github.com/users/waterlow/repos'
            const res = await app.$axios.$get(url)
            return {
                posts: res.slice(0, 5)
            }
        },
        head: {
            title: 'List of posts'
        }
    }
</script>

<style scoped>
    .container {
        width: 70%;
        margin: auto;
        text-align: center;
        padding-top: 100px;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    ul li {
        border: 1px #ddd solid;
        padding: 20px;
        text-align: left;
    }

    ul li a {
        color: gray;
    }

    p {
        font-size: 20px;
    }

    a {
        color: #41bb83;
    }
</style>