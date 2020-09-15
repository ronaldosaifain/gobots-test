<template>
  <div id="app">
  <b-form inline>
     <b-col md="6" sm="12" align="center" inline>
    <b-form-input type="text" v-model="cidade.nome" placeholder="Informe o nome da Cidade..." />
    <b-button @click="getPlaylist">Buscar</b-button>
     </b-col>
     </b-form>
    <ul >
    <h1>PlayList</h1>
    <li v-for="musica in playlists" :key="musica.track.album.artists.id">
     {{musica.track.album.artists[0].name}} - {{ musica.track.album.name }}
     </li>
    </ul>
 
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'App',
  components: {
  },
  data: function () {
    return {
    playlists: [],
    cidade: {},
    errors: [],
    }
  },
  methods:{
  getHashParams() {
      var hashParams = {};
      var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
      e = r.exec(q)
      while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
 }
 return hashParams;
},  
  getPlaylist(){
        const parametros = this.getHashParams();
        if(this.isEmpty(parametros)){
          window.location.href = 'http://localhost:8888/';
          return
        }
        const token = `Bearer ${parametros.access_token}`;

       if(this.cidade.nome){
        axios.defaults.headers.common['Authorization'] = token
        axios.get(`http://localhost:3000/playlist?cidade=${this.cidade.nome}`)
        .then(res => this.playlists = res.data)
       }
},
   isEmpty(obj) {
     return Object.keys(obj).length === 0;
}
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
