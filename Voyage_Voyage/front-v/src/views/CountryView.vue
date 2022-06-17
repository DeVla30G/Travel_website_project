<template>
<div>
<div div class="fixed-top" style="max-width:inherit;margin:auto" ><NavBar/>
<input class="form-control mr-md-8" type="search" placeholder="search for a country or a continent" v-model="searchQuery"/></div>
<br>
<br>
<div class="all-countries">
<div class="country-wrap" v-for="country in resultQuery" :key="country.Name" >
  <div class="top-country">

       <div class="img_set">
    <img  v-if="country.Continent === 'Africa'" src="https://image.shutterstock.com/image-vector/concept-african-woman-face-profile-600w-1987477454.jpg" alt="african continent image"/>
    <img  v-if="country.Continent === 'Asia'" src="https://media.istockphoto.com/vectors/chinese-new-year-lantern-with-asian-culture-icons-vector-id623941278" alt="asia image"/>
    <img  v-if="country.Continent === 'Oceania'" src="https://www.bouger-voyager.com/wp-content/uploads/2019/02/que-faire-en-polyn%C3%A9sie-fran%C3%A7aise.jpg" alt="oceania"/>
    <img  v-if="country.Continent === 'South America'" src="https://www.southamerica.travel/wp-content/uploads/2021/03/south-america-travel-tours-l312a.jpg" alt="south america"/>
    <img  v-if="country.Continent === 'Europe'" src="https://www.coe.int/documents/21864805/25297638/CharlesV_870x489.jpg/982e0d8c-a0e6-f68a-887b-d65e74ea8712?t=1591635740000" alt="europe thumbnail"/>
    <img v-if="country.Continent === 'North America'" src="https://image.shutterstock.com/image-vector/vector-north-america-travel-flat-260nw-249560122.jpg" alt="north america thumbnail"/>
    <img v-if="country.Continent === 'Antarctica'" src="https://cdn.britannica.com/72/153472-050-4DF2D58F/Emperor-penguins-Antarctica.jpg" alt="pingouins"/>
    </div>
    <div class="content">
          <h6>Destination: {{ country.Continent }} </h6>
          <h5> {{country.Name}}</h5>
          <p>Region: {{ country.Region }} </p>
    </div>

   </div>
      <div class="button-set">
        <router-link :to="{ name: 'OneCountry', params: { Code: country.Code } }">
        <button v-on:click="setCode">Read more </button></router-link>
        <button><icon-localisation/></button>
      </div>
</div>
</div>
</div>
</template>

<script>
import axios from 'axios'
import IconLocalisation from '@/components/icons/IconLocalisation.vue'
import InteractiveMap from '@/components/InteractiveMap.vue'
import NavBar from '@/components/NavBar.vue'



export default {
  components: { IconLocalisation, InteractiveMap, NavBar},
  name: 'CountryView',
  data () {
    return {
      selectCountries: null,
      countries: [],
      code: '',
      searchQuery: ''
    }
  },

  mounted () {
    axios
      .get("http://localhost:3020/countries")
      .then((response) => {
        console.log(response.data);
        this.countries = response.data;
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  },
  methods: {
    getCountriesAsia (countries){
      return countries.filter(function (countries) {
        return countries.Continent.match('Asia')
      })
    },
    setCode (){
      localStorage.setItem('code', response.data[0].Code)
      console.log(response.data[0].Code)
    },
  },
  computed: {
    resultQuery() {
      return this.countries.filter((r) => {
        return r.Name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||  r.Continent.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
      }
  }
  }



</script>

<style scoped>
.all-countries{
display: grid;
grid-template-columns: repeat(5, 1fr);

margin-top:100px;
}

.country-wrap{
  background-color: white;
  box-shadow: 0 4px 8px 5px rgba(0, 0, 0, 0.2);
  width: 20em;
  height: 13em;
  margin:1.5em;
  padding: 1em;
  border-radius: 10px;
}
.button-set {
  display: inline-flex;
}

button {
  background-color: transparent;
  border: 1px solid gray;
  padding: 0 1.2rem;
  cursor: pointer;
  font-weight: 500;
  margin: .2em;
  height: 3em;
  box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.2);
  border-radius:10px;
}

.all-countries{
  display: grid;
}
.img_set{
  width: 6em;
  height: 6em;
}
img{
  vertical-align: middle;
  width: 5em;
  height: 5em;
  border-radius: 20%;
  object-fit:cover;
  margin-right: 2em;
  box-shadow: 3px 2px 5px rgb(146, 82, 82);
}
.top-country{
  display: inline-flex;
}
.content{
  margin-right:3em;
}
.form-control.mr-md-8{
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  position:relative;
  border: 1px solid black;
}

</style>
