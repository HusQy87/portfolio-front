<template>
  <div class="bg-dark">
  <div class="p-5">
    <ProjectPreview></ProjectPreview>
  </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ProjectPreview from  "@/components/ProjectPreview.vue"
export default Vue.extend({
  name: 'Home',
  components: {
    ProjectPreview
  },
});
</script>
