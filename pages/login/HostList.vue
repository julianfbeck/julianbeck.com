<template>
  <div>{{hosts}} </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    hosts: {
      type: Array
    }
  },
};
</script>
