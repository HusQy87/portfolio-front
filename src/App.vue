<template>
  <div id="app" class="bg-dark">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">GALCERA | <span style="color: #fd7329">Thomas</span></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link"  exact-active-class="active" to="/">Accueil</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/contact">Contact</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/about">A propos</router-link>
            </li>
          </ul>
          <span class="navbar-text">
            <font-awesome-icon class="zoom mx-2" style="color: #1877f2; cursor: pointer" :icon="['fab','facebook']"></font-awesome-icon>
            <font-awesome-icon class="zoom mx-2" style="color: #0077b5; cursor: pointer" :icon="['fab','linkedin']"></font-awesome-icon>
          </span>
        </div>
      </div>
    </nav>
    <Console></Console>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {defineComponent} from "@vue/composition-api";
import Console from "@/components/Console.vue";


export default defineComponent({
  name: 'App',
  components: {Console},
});
</script>
<style lang="scss">

</style>
