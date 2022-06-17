<template>
<div>
<div div class="fixed-top" style="max-width:inherit;margin:auto" >
    <NavBar />
    <nav class="navbar navbar-dark bg-dark">
  <form class="form-inline">
    <input class="form-control mr-md-8" type="search" placeholder="Which destination ? " aria-label="Search" v-model="searchQuery" >
    <button class="btn btn-outline-success my-2 my-sm-0" type="button" @click="getResult">Search</button>
  </form>
</nav>
</div>
<div class="containercards">
<div class="card" v-for="info in infos" v-bind:key="info.location_id" >
        <router-link :to="{ name: 'result', params: { name: info.name} }">  <p>
            {{ info.name }}
        </p></router-link>
</div>

</div>


  <div class="container-lg">
  <div class="box1">
  <MapWorld/>
  </div>
  <div class="box2" >
<TheWelcome/>
  </div>
  </div>
   <div class="container_footer">
     <FooterBar/>
   </div>
 </div>


</template>

<script>
import axios from 'axios'
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'

import MapWorld from '@/components/MapWorld.vue'
import TheWelcome from '@/components/TheWelcome.vue'

export default {
  name: 'HomeView',
  props: ['infos'],
  components: {
    TheWelcome,
    NavBar,
    MapWorld,
    FooterBar

   // CountryFilter
  },

  data () {

      return {
        searchQuery: '',
        infos: [],
        pics: [],
        location_id:'',
        name: ''
      }
    },

    methods: {
    getResult () {
    axios
      .get(`http://localhost:3300/search/`+ this.searchQuery)
      .then((response) => {
        console.log(response.data.data);
        localStorage.setItem('locationId', response.data.data[0].location_id);
        console.log(response.data.data[0].location_id)
        this.infos = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      })

     const locationId= localStorage.getItem('locationId');
     console.log(locationId);
     axios
      .get(`http://localhost:3300/pictures/`+ locationId)
      .then((response) => {

        console.log(response.data.data[0].images)
        this.pics = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      })
    },
    goDetails () {
          this.$router.push('/result')
    }
    }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap");

section {
  line-height: 1.5;
  max-height: 100vh;
}
.container-lg{
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1000px);
  grid-gap: 10px;
  margin-top: 5em;
}
.container.shadow-lg.p-3.mb-5.rounded{
  margin-top: 50px;
  width: 30%;
  display: flex;
  flex-direction: row;
}
nav{
  margin-bottom: 20px;
}
.containercards {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1400px;
  margin-top:50px;
  position: relative;
  padding-top: 100px;
}
.card {
  background-color: white;
  box-shadow: 0 4px 8px 5px rgba(0, 0, 0, 0.2);
  width: 12em;
  height: 6em;
  margin:2em;
  padding: 1em;
  border-radius: 10px;
  align-items: center;
  text-align: center;
  font-weight: 800;
  font-style: italic;
  font-family: 'Quicksand', Georgia, 'Times New Roman', Times, serif;
}
.box1{
  margin: 2em;
}
.box2{
  margin:2em;
}

@media (min-width: 1024px) {
section {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  section .wrapper {
    display: flex;
    place-items: center;
    flex-wrap: wrap;
  }
  img{
    width: 100%;
    height: auto;
    align-self: center;
  }
}
.button{
  box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.2);
  border-radius:10px;
}

p{
  color:black !important;
}

</style>
