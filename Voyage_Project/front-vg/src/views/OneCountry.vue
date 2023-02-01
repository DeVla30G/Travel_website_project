<template>
<div>
<div class="fixed-top" style="max-width:inherit;margin:auto" ><NavBar/></div>
  <div class="country">


<!--Country card -->
<div class="country_card">
  <div class="card_header">
  </div>
    <div>
      <div class="card shadow">
        <div class="img-container">
        </div>
        <div class="content">
            {{ country.Code }}
          <h6>Destination: {{ country.Name }} </h6>
          <h2> </h2>
          <h5>Region:  </h5>
          <p>
          Bon voyage !
          </p>
          <div class="button-set">
            <button @click='popup' >Readmore</button>
            <button><icon-localisation/></button>
          </div>
        </div>
      </div>
    </div>
</div>
<div class='pop-up' v-if='showpopup'>
        <div class="pop_header">
         <button type="button" @click='close'>X</button>
        </div>
    <div class='pop-body'>

      <p>{{ country.Name}} is an exceptionnal place in {{ country.Region}} that one must discover in his lifetime. There are {{ country.Population}} inhabitants and its territory is {{ country.SurfaceArea}} km2</p>
             <p>Fact : {{ country.Name}} contains incredible biodiversity</p>

    </div>
    </div>
    <google-map id="map" style="height: 450px; width: 450px"/>
<!-- City card -->
<button @click="getCities" class="show_btn" >Hot spots from {{ country.Name }}</button>
<div class="second_section">
  <div v-for="cities in city" :key="cities.ID">
    <div class="cities_wrap" >
      <div class="card-city-wrapper">
          <div class="card-city">
            <img src='https://oudormirtop.com/wp-content/uploads/2021/04/oudormiradubrovnik-785x523.jpg' alt='doubrovnik'>
            <h3><a href="">A Super Wonderful Place</a></h3>
            <p> The most beautiful views from {{ country.Name }} </p>
            <p><router-view :to="{ name: 'OneCountry', params: { Name: city.Name } }"><a href="#"> {{ cities.Name }} </a> </router-view></p>

          </div>
      </div>
    </div>
  </div>
</div>
 <!-- end card -->
<!--Activity card -->
    <h1> Best activities in {{ country.Name }}</h1>
<div class="third_section">

    <div class="main-activities" v-for="activity in activities" :key="activity.location_id">
      <a href="#" class="card-a" style="background-image"> <!-- mettre background en props random-->
      <div class="inner">
        <h2 class="title">{{ activity.name }} </h2>
        <time class="subtitle">Go in family</time>
          <h6 class="adress">{{ activity.address_obj.address_string }} </h6>
      </div>
      </a>
    </div>

</div>
  <!--End activity card -->
  </div>

</div>
</template>

<script>
import axios from 'axios';

import NavBar from '@/components/NavBar.vue'
import IconLocalisation from '@/components/icons/IconLocalisation.vue'

import GoogleMap from '@/components/GoogleMap.vue'
export default {
    name: 'OneCountry',
    components:{
      NavBar,
      IconLocalisation, GoogleMap
    },
    data () {
        return{
            Code: '',
            country: {},
            contries: [],
            city: [],
            cities: [],
            CountryCode: '',
            activities: [],
            Name: '',
            showpopup: false
            //image: []

        }
    },
    mounted () {
      //this.Code = localStorage.getItem('code');
      axios
        .get(`http://localhost:3020/countries/` + this.$route.params.Code )
        .then((response) => {
        console.log(response.data[0]);
        this.country = response.data[0];
        localStorage.setItem('code', response.data[0].Code)
        console.log(this.$route.params.Code)
        console.log(response.data[0].LocalName)
        localStorage.setItem('country', response.data[0].LocalName)
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods:{
    getCities () {
      const CountryCode = this.$route.params.Code;
      console.log(CountryCode)
      axios
        .get(`http://localhost:3020/allcity/` + CountryCode)
        .then((response) => {
          this.city = response.data;
          console.log(response.data);
          console.log(response.data[0].CountryCode)
          console.log(response.data[0].Name)
          console.log(response.data[1].Name)
          console.log(response.data[2].Name)
          console.log(response.data[3].Name)
          this.sec_city = response.data[1].Name
          if (this.city != null){
            this.county = localStorage.getItem('country')
        axios
          .get(`http://localhost:3300/search/`+ response.data[0].Name ) // this.county - response.data[0].Name
          .then((res) => {
            console.log(res.data.data);
            localStorage.setItem('locationId', res.data.data[0].location_id);
            console.log(res.data.data[0].location_id)
            this.activities = res.data.data;
          })
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    popup() {
      this.showpopup= true;
    },
    close (){
      this.showpopup =false;
      this.$emit('close')
    }

  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Raleway:100,300,400,700&display=swap");
html {
  font-family: 'Raleway', sans-serif;
}
/**big container country page */
.country {
    display: grid;
    grid-template-rows: repeat(5, auto);
    -ms-grid-row-align: center;
    padding: 3em;
  }
/**country wrap */
.country_card{
  margin:3em;
  width: 30%;
}
.img-container {
  background-image: url('../assets/images/dubai_marina.jpg');
  min-width: 50%;
  background-size: cover;
  background-position: center;
  border-radius: 10px 0 0 10px;
}
.shadow {
box-shadow: 2px 3px 5px rgb(99, 82, 82);
}
.card {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-color: #f0f0f0;
  border: 1px solid #dcd6d6;
  border-radius: 10px;
}
.content {
  padding: 15px;
  min-width: 350px;
  max-width: 500px;
}
.content h2 {
  text-transform: uppercase;
}
.content p {
  font-size: 20px;
  text-align: justify;
}
.button-set {
  padding-top: 40px;
}
button {
  background-color: transparent;
  border: 1px solid;
  padding: 0.8rem 1.2rem;
  cursor: pointer;
  font-weight: bold;
  margin: .2em;
  margin-top: 1em;
}
/**end country wrap */
/**cities */
.second_section{
  display: inline-flex;
  overflow-x: scroll;
  scroll-behavior: smooth;
  scrollbar-color: transparent;
 }
 ::-webkit-scrollbar {
 display:none;
  }
.card-city {
  background-color: #fff;
  margin:1em;
  border-radius: 0.5rem;
  box-shadow: 0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45);
  padding-bottom: 1rem;
  background-image: linear-gradient(
    var(--card-gradient),
    white max(9.5rem, 27vh)
  );
  overflow: hidden;
  box-shadow: 2px 3px 5px rgb(99, 82, 82);
  }
.card-city h3 {
  margin-top: 1rem;
  font-size: 1.25rem;
}
.card-city p {
  font-style: italic;
  color:#8f21b0;
}
.card-city a {
  color: inherit;
}
.card-city-wrapper {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30ch, 1fr));
  grid-gap: 1.5rem;
  max-width: 30em;
  width: 20em;
  padding-left: 1rem;
  padding-right: 1rem;
}
.show_btn{
  width: fit-content;
  position: center;
  box-shadow: 2px 3px 5px rgb(99, 82, 82);
}
.show_btn :hover{
  background-color: #181818;
  visibility: visible;
  color:inherit;
}
.map {
        width: 100%;
        height:400px;
      }
td {
        padding: 0 0.5em;
        text-align: right;
      }
/* end city wrap*/
  /**activities*/
h1{
  margin:2em;
}
.third_section{
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-gap: 2em;
}
.siteTitle {
  display: block;
  font-weight: 900;
  font-size: 30px;
  margin: 20px 0;
}
.card-a {
  height: 400px;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
  text-decoration: none;
  border: 6px solid #f5eef1;
  margin-bottom: 20px;
  background-image: url('https://images.unsplash.com/photo-1516051662687-567d7c4e8f6a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80');
  background-size: cover;
  border-radius: 10px;
  box-shadow: 2px 3px 5px rgb(99, 82, 82);
}
.button{
  box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.2);
  border-radius:10px;
}

.inner {
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  box-sizing: border-box;
  padding: 40px;
  border-radius: 10px;
}
.title {
  font-size: 24px;
  color: black;
  text-align: center;
  font-weight: 700;
  color: #181818;
  text-shadow: 0px 2px 2px #a6f8d5;
  position: relative;
  margin: 0 0 20px 0;
}
.subtitle {
  color: #b0215e;
  text-align: center;
}
.adress{
  color:#480c48;
  font-style: italic;
}
  /**end activities */
@media (min-width: 1024px) {
  .country {
    min-height: 100vh;
    display: grid;
    grid-template-rows: repeat(3, auto);
    align-items: center;
    padding: 3em;
  }
  .country_card{
  margin:3em;
  width: 30%;
}
}
  img {
    border-radius: 0.5rem 0.5rem 0 0;
    width: 100%;
    object-fit: cover;
    height: max(10rem, 25vh);
    max-height: max(10rem, 30vh);
    aspect-ratio: 4/3;
    mix-blend-mode: var(--card-blend-mode);
    }
   img ~ * {
      margin-left: 1rem;
      margin-right: 1rem;
    }
  img:hover,
  img:focus-within {
    --card-gradient: #24a9d5 max(8.5rem, 20vh);
  }
/* Additional demo display styles */
* {
  box-sizing: border-box;
}

.pop-up{
display: flex;
flex-direction: column;
width: 30em;
height: 20em;
background-color: white;
opacity: 75%;
border: 1px solid gray;
border-radius: 10px;
position: absolute;
top: 0;
z-index: 999;
font-size: 20px;
box-shadow: 2px 3px 3px  rgb(153, 153, 173);
right:0;
margin-right:300px;
margin-top:200px;
}
.pop-body{
display: flex;
flex-direction: column;
align-items: center;
padding:1em;
}
#map{
  margin-left:10em;
}
</style>