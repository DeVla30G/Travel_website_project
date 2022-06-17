<template>
<div class="selector">
  <MDBNavbar light bg="dark" container>
    <form class="d-flex input-group w-auto">
      <input
        class="form-control"
        placeholder="Choose your country..."
        aria-label="Search"
        v-model="searchQuery" />
      <MDBBtn outline="primary"> Search </MDBBtn>
    </form>
    <div v-for="r of resultQuery" :key="r.id">{{r.title}}</div>
   </MDBNavbar>
</div>
</template>

<script>
import { MDBBtn, MDBNavbar } from 'mdb-vue-ui-kit'
import axios from 'axios'
import {ref, watch} from 'vue'

export default {
  components: {
    MDBBtn,
    MDBNavbar
  },

setup () {
    const searchedCountry = ref('');
    const data = ref([]);

    watch(
        () => searchedCountry,
        () => axios.get(`http://localhost:3300/search`)
        .then((res) => data.value = res.data)
    )
},
return: {
  searchQuery: null,
  infos: [],
  data: '',
  searchCountry: ''
},
computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.resources.filter(item => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(v => item.title.toLowerCase().includes(v));
        });
      } else {
        return this.resources;
      }
    }
  }
}

</script>

<style scoped>
.selector{
    margin-left: 4em;
    display: inline-flex;
}
input{
    height: 2em;
}
</style>
