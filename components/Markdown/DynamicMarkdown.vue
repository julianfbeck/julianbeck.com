<script lang="js">
   import InlineCode from './InlineCode.vue'

  export default {
    props: ["renderFunc", "staticRenderFuncs"],

    components: {
      InlineCode
    },

    computed: {
      initHighlightJs () {
        let targets = document.querySelectorAll('code')
        targets.forEach((target) => {
          hljs.highlightBlock(target)
        })
      }
    },

    mounted() {
      this.initHighlightJs
    },

    render: function (createElement) {
    return this.templateRender ? this.templateRender() : createElement("div", "Rendering");
    },

    created: function () {
      this.templateRender = new Function(this.renderFunc)();
      this.$options.staticRenderFns = new Function(this.staticRenderFuncs)();
    }
  }
</script>