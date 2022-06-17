<template>
<div>
  <nav class="navbar navbar-dark bg-dark">
  <form class="form-inline">
    <input class="form-control mr-md-8" type="search" placeholder="Which destination ? " aria-label="Search" v-model="searchQuery" >
      <router-link :to="{ name: 'result', params: { id: searchQuery.id } }">
        <button class="btn btn-outline-success my-2 my-sm-0" type="button" @click="getResult">Search</button>
      </router-link>
  </form>


</nav>

</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'SearchBar',

    data () {

      return {
        searchQuery: '',
        infos: []
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
        this.$router.push({name: 'result', params:{location_id: this.$route.params.location_id}})
    }
}

}
</script>

<style scoped>

</style>

