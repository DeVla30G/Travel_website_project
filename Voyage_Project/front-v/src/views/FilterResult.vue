<template>
<div>
<div div class="fixed-top" style="max-width:inherit;margin:auto" >
    <NavBar />
</div>
  <div class="third_section"  >
    <div class="main-activities" >
      <a href="#" class="card-a" style="background-image"> <!-- mettre background en props random-->
      <div class="inner">
        <h2 class="title">{{info.name}}</h2>
          <h6 class="adress"> {{ adress }} </h6>
          <h6 class="adress"> {{ city }} </h6>
           <h6 class="adress"> {{ country}} </h6>
           <p> Book now ! </p>
      </div>
      </a>
    </div>
</div>
<FooterBar/>
</div>

</template>

<script>
import axios from 'axios'
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'

export default {
    name: 'result',
    propos: ['infos'],
    components: {
        NavBar,
        FooterBar
    },
    data (){
        return {
            info: '',
            location_id:'',
            name:'',
            street :'',
            country: '',
            city: '',
            adress:'',
            infos: [],
            searchQuery: '',
            pics: []
        }
    },
     mounted () {
     axios
      .get(`http://localhost:3300/search/`+ this.$route.params.name)
      .then((response) => {
        console.log(response.data.data[0])
        console.log(response.data.data[0].location_id)
        this.info = response.data.data[0];
        console.log(response.data.data[0].address_obj.city)
        this.city = response.data.data[0].address_obj.city
        this.adress = response.data.data[0].address_obj.address_string
         this.country = response.data.data[0].address_obj.country


      })
      .catch((error) => {
        console.log(error);
      })

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
    }
    }
}


</script>

<style scoped>
.third_section{
display: center;
grid-template-columns: repeat(3, 1fr);
grid-gap: 2em;
margin-top: 10em;
margin-left:auto;
margin-right: auto;
width: 50%;
height: 80%;
}

.siteTitle {
  display: block;
  font-weight: 900;
  font-size: 30px;
  margin: 20px 0;
}

.card-a {
  height: 700px;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
  text-decoration: none;
  border: 4px solid #b0215e;
  margin-bottom: 20px;
  background-image: url('../assets/images/trip.jpg');
  background-size: cover;
  margin-left:50px;
  border-radius: 10px;
}

.inner {
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  box-sizing: border-box;
  padding: 40px;
  border-radius: 10px;
}
.button {
    box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.2);
  border-radius:10px;
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
    width: 20%;
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
</style>