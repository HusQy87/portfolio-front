<template>
<div>
  <div v-if="project.id" class="animated fadeInLeft">
    <h1>Un de mes projets </h1>
    <div class="card bg-dark-light mb-3" >
      <div class="row g-0">
        <div class="col-md-4">
          <img :src="$env.url + project.imagePath" style="width: 100%; max-height: 35vw; object-fit: cover" class="rounded-start" :alt='project.name'>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h3 class="card-title">{{project.name}}</h3>
            <p class="card-text">{{project.description}}</p>
            <p class="card-text"><small class="text-muted"></small></p>
          </div>
        </div>
      </div>
    </div>
    <router-link :to="{name: 'Projets'}">Tous mes projets</router-link>
  </div>

  <div v-else class="p-5 text-center">
    <div class="spinner-border text-white"></div>
  </div>
</div>
</template>

<script lang="ts">
import {defineComponent} from "@vue/composition-api"
import Project from "@/models/Project";
import {AxiosResponse} from "axios";
import {ErrorResponse, instanceOfProject} from "@/models/response";

export default defineComponent({
  name: "ProjectPreview",
  data() {
    return {
      project:{} as Project,
    }
  },

  mounted() {
    this.$axios.get<any,AxiosResponse<Project | ErrorResponse>>('/projects/random').then(r => {
      if (instanceOfProject(r.data)){
        this.project = r.data
      }else{
      }

        })
  }
})
</script>

<style scoped lang="scss">
@-webkit-keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeInLeft {
  -webkit-animation-name: fadeInLeft;
  animation-name: fadeInLeft;
}

.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
</style>
