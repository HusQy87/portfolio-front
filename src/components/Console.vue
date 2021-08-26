<template>

  <div v-if="ip" class="code bg-dark-light mt-3">
    <div  v-for="lastcommand in commands">
      <span class="text-primary">></span>
      <span class="text-white">{{lastcommand.ip}}</span>
      <span class="text-primary">@galcera.ovh</span>
      <span class= text-success>{{lastcommand.route}}:</span>
      <span class="text-white">{{lastcommand.command}}</span>
      <div class="text-white" v-if="lastcommand.error">{{lastcommand.error}}</div>
    </div>
    <span class="text-primary">></span>
    <span class="text-white">{{ip}}</span>
    <span class="text-primary">@galcera.ovh</span>
    <span class= text-success>{{route}}:</span>
    <form class="d-inline" @submit="exec" @keydown="getCommand">
    <input type="text" v-model="command" class="terminal-input" >
    </form>
  </div>
  <div v-else class=" code text-primary">Initialisation {{loading}} </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {defineComponent} from "@vue/composition-api";
import {AxiosResponse} from "axios";
import {ErrorResponse} from "@/models/response";
import {Command} from "@/models/command";

export default defineComponent({
  name: 'Console',
  data(){
    return {
      commands: [] as Command[],
      command:'' as string,
      route:'' ,
      loading:'...',
      ip:'' as string ,
      focused: false as boolean,
      actualCommand: 0
    }
  },
  methods: {
    focus(status: string): void {
      if (status === 'in'){
        this.focused = true
      }
    },
    exec(e: Event){
      e.preventDefault()
      let error = undefined
      let command = this.command.trim().split(' ')
      if (command[0].toLowerCase() === 'cd'){
        if (command.length === 1){
          this.$router.push("/")
        }else {
          if (command[1] === '-h' || command[1] === '--help'){
            let message = 'cd <RouteName> \n' +
                'Permet de se déplacer sur le sites \n' +
                'les routes disponibles sont : \n'
            this.$router.getRoutes().forEach(r => {
               message += `- ${r.name}\n`
            })
            alert(message)
          }else {
            let route = this.$router.getRoutes().find(r => r.name?.toLowerCase() == command[1].toLowerCase())
            console.log(route)
            if (route){
              if (!route.path.startsWith('/')){
                route.path = '/'+route.path
              }
              this.$router.push(route)
            }else{
              error = "Aucun chemin "+command[1]+" trouvé"
            }

          }
        }

      }
      let stringCommand = command.join(' ')
      this.commands.push({command: this.command, ip:this.ip, route:this.route ,error: error})
      this.command = ''
      this.actualCommand = 0
    },
    getCommand(e: KeyboardEvent) {

      if (e.code === "ArrowUp" && this.actualCommand < this.commands.length){
        this.command = this.commands[this.commands.length - this.actualCommand - 1 ].command
        this.actualCommand ++
      }else if(e.code === "ArrowDown" && this.actualCommand > 0){
        this.actualCommand--
        this.command = this.commands[this.commands.length - this.actualCommand - 1 ].command
      }
    }
  },
  computed:{
  },
  watch: {
    $route(to, from){
      this.route = to.fullPath
    }
  },
  mounted() {
    setInterval(() => {
      if (this.loading.length === 3){
        this.loading = ""
      }else
      {
        this.loading += '.'
      }
    }, 500)
    this.$axios.get('/ip').then(r => {
      this.ip = r.data.ip
    })
    this.route = this.$router.currentRoute.fullPath
  },
});
</script>

<style lang="scss">
  .code{
    font-family: monospace;
    font-weight: bold;
    text-align: start;
    overflow: auto;
    max-height: 150px;
  }
  ::-webkit-scrollbar{
    width: 10px;
  }
  .terminal-input{
    font-weight: bold;
    color: #F8F9FAFF;
    border: none;
    background: #2c3e50;
    outline: none;
    caret-color: #F8F9FAFF;
    caret-shape: block;
  }
</style>
