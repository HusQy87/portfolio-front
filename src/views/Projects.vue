<template>
<div v-if="">

</div>
</template>

<script lang="ts">
import {defineComponent} from "@vue/composition-api";
import Project from "@/models/Project";

export default defineComponent({
  name: "Projects",
  data() {
    return {
      projects: [] as Project[]
    }
  },
  mounted() {
    this.$axios.get('/projects')
  }
})
</script>

<style scoped>

</style>
