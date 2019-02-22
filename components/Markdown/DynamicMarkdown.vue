<script lang="js">
   import InlineCode from './InlineCode.vue'

  export default {
    props: ["renderFunc", "staticRenderFuncs"],

    components: {
      InlineCode
    },

    computed: {
 
    },

    mounted() {
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