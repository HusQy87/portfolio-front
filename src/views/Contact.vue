<template>
<div class="bg-dark text-white">
  <h2 class="text-start fw-bolder">Me contacter</h2>
  <div class="p-4"><form class="p-4 border text-start" @submit="submit">

    <label for="email" class="text-start">Email : </label>
    <input type="text" id="email" :class="{'is-invalid': v$.email.$error}" class="form-control" v-model="email" @blur="v$.email.$touch()">
    <div class="invalid-feedback text-start" v-if="v$.email.$error">
      <div v-for="error in  v$.email.$errors">
        {{error.$message}}
      </div>
    </div>

    <label for="message" class="text-start mt-4">Un message : </label>
    <textarea type="text" id="message" :class="{'is-invalid': v$.message.$error}" class="form-control" v-model="message" @blur="v$.message.$touch()"></textarea>
    <div class="invalid-feedback text-start" v-if="v$.message.$error">
      <div v-for="error in  v$.message.$errors">
        {{error.$message}}
      </div>
    </div>
    <vue-recaptcha class="mt-4" @verify="setCaptcha" @expired="" sitekey="6LdtvPMUAAAAABy1FrZsmg8hhFyILWuHaJWggNf-"></vue-recaptcha>
    <input class="btn btn-primary text-white mt-2" type="submit" value="Envoyer">
  </form></div>

</div>
</template>

<script lang="ts">
import Vue from 'vue';
import useVuelidate from '@vuelidate/core'
import VueRecaptcha from "vue-recaptcha";
import {required, email, helpers, maxLength} from '@vuelidate/validators'
import {defineComponent} from "@vue/composition-api";
import {ErrorResponse, Response, Codes} from "@/models/response";
import {AxiosResponse} from "axios";

export default defineComponent({
  components: {
    VueRecaptcha,
  },
  setup() {
    return {v$:useVuelidate()}
  },
  name: 'Contact',
  data() {
    return {
      email: '',
      message: '',
      captchaToken: '',
    }
  },validations () {
    return {
      email: {
        required: helpers.withMessage('Email requis', required),
        email: helpers.withMessage('Email invalide', email)
      },
      message: {
        required:helpers.withMessage("Un message est requis", required),
        maxLength:helpers.withMessage("Le message est trop long", maxLength(2000)),
      }
    }
  },
  methods: {
    setCaptcha(e: string){
      this.captchaToken = e
      console.log(e)
    },
    resetCaptcha(){
      this.captchaToken = ''
    },
    /**
     *
     * @param {Event} e
     */
    async submit(e: Event){
      e.preventDefault()
      const isCorrect = await this.v$.$validate()
      if (isCorrect){
        let fd = new FormData()
        fd.append('email',this.email);
        fd.append('message',this.message);
        fd.append('captcha',this.captchaToken);
        this.$axios.post('/', fd).then(r => {
          if (r.data.code == Codes.VALID){

          }
        })
      }else {
      }
    }
  }
});
</script>

<style scoped>

</style>
