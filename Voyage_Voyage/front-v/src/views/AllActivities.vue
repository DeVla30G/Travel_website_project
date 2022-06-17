<template>
<NavBar/>
  <div class="act_cont">
      <router-link to="/">
        <button href="#" type="button" id="crud" class="btn btn-outline-dark">
          Back </button></router-link>
      <input class="form-control mr-md-8" type="search" placeholder="search activity by city name or type of activity" v-model="searchQuery"/>
      <h1 class="mt-5 mb-5">All Activities</h1>
      <div class="containercards">

        <div class="card" v-for="activity in resultQuery" :key="activity.id">
            <img :src='activity.picture'
                alt="rio_carnaval"  style="height: 350px; width: 350px" />
          <div class="card__header"></div>
          <div class="card__body">
            <h3>{{ activity.name }}</h3>
            <p class="city">City:<span>{{ activity.city_name }}</span> </p>
            <p>Type : {{ activity.type }}</p>

                <div class="card__footer">

                    <div>
                      <router-link :to="{ name: 'CommentsRates', params: { id: activity.id }}">
                        <button href="#" type="button" id="crud" class="btn btn-outline-dark">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
</svg></button> </router-link>
                  </div>
                </div>
          </div>
        </div>

<!-- Tripadvisor API activities card -->
        <div class="card" v-for="activ in resultQuery3" :key="activ.location_id">
          <img src="../assets/images/restaurant.jpg"
                alt="rio_carnaval"  style="height: 350px; width: 350px" />
          <div class="card__body">
            <h3>{{ activ.name }}</h3>
            <p class="city">City : <span>{{ activ.address_obj.city }}</span></p>
            <p>Country : {{ activ.address_obj.country}}</p>
            <p class="address"> {{ activ.address_obj.address_string }} </p>
     <div class="card__footer">
                  <div style="display: inline" class="user__info">
                    <div>
                       <div>
                      <router-link :to="{ name: 'CommentsRates', params: { id: activ.location_id } }">
                        <button href="#" type="button" class="btn btn-outline-dark">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
</svg> </button> </router-link>
                    </div>
                    </div>
                  </div>
                </div>
          </div>
        </div>

<!-- TRip Advisor parcs-->

         <div class="card" v-for="parc in resultQuery2" :key="parc.location_id">
            <img v-if="parc.address_obj.city === 'Barcelona'" src="../assets/images/parc-guell.jpg"
                alt="rio_carnaval"  style="height: 350px; width: 350px" />
            <img v-if="parc.address_obj.city != 'Barcelona'" src="../assets/images/city_park.jpg"
                alt="rio_carnaval"  style="height: 350px; width: 350px" />
          <div class="card__body">
            <h3>{{ parc.name }}</h3>
            <p class="city">City : <span>{{ parc.address_obj.city }}</span></p>
            <p>Country : {{ parc.address_obj.country}}</p>
            <p class="address"> {{ parc.address_obj.address_string }} </p>
     <div class="card__footer">
                  <div style="display: inline" class="user__info">
                    <div>
                       <div>
                      <router-link :to="{ name: 'CommentsRates', params: { id: parc.location_id } }">
                        <button href="#" type="button" id="crud" class="btn btn-outline-dark">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
</svg> </button> </router-link>
                    </div>
                    </div>
                  </div>
                </div>
          </div>
        </div>


    <!-- TRip Advisor hotels-->

         <div class="card" v-for="hotel in resultQuery4" :key="hotel.location_id">
             <img src="../assets/images/hotel.jpg"
                alt="rio_carnaval"  style="height: 350px; width: 350px" />
          <div class="card__body">
            <h3>{{ hotel.name }}</h3>
            <p class="city">City : <span>{{ hotel.address_obj.city }}</span></p>
            <p>Country : {{ hotel.address_obj.country}}</p>
            <p class="address"> {{ hotel.address_obj.address_string }} </p>
     <div class="card__footer">
                  <div style="display: inline" >
                    <div>
                       <div>
                      <router-link :to="{ name: 'CommentsRates', params: { id: hotel.location_id } }">
                        <button href="#" type="button" id="crud" class="btn btn-outline-dark">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
</svg></button> </router-link>
                    </div>
                    </div>
                  </div>
                </div>
          </div>
        </div>

      <!-- TRip Advisor museums-->

         <div class="card" v-for="museum in resultQuery5" :key="museum.location_id">
            <img src="../assets/images/museum.jpg"
                alt="rio_carnaval"  style="height: 350px; width: 350px" />
          <div class="card__body">
            <h3>{{ museum.name }}</h3>
            <p class="city">City : <span>{{ museum.address_obj.city }}</span></p>
            <p>Country : {{ museum.address_obj.country}}</p>
            <p class="address"> {{ museum.address_obj.address_string }} </p>
     <div class="card__footer">
                  <div style="display: inline" class="user__info">
                    <div>
                       <div>
                      <router-link :to="{ name: 'CommentsRates', params: { id: museum.location_id } }">
                        <button href="#" type="button" id="crud" class="btn btn-outline-dark">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
</svg> </button> </router-link>
                    </div>
                    </div>
                  </div>
                </div>
          </div>
        </div>
      </div>
  </div>
<FooterBar/>
</template>

<script>
import axios from "axios";
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'

export default {
  name: "AllActivities",
  components: {
    NavBar,
    FooterBar
  },
  props: {
    id: "",
    name: "",
    user_id: "",
    city_name: "",
    description: "",
    type: "",
    city:"",
    location_id:''
  },
  data() {
    return {
      activities: [],
      token: "",
      role: "",
      searchQuery: '',
      activs: [],
      parcs: [],
      city:'',
      hotels: [],
      museums: []
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.role = localStorage.getItem("role");
    axios
      .get("http://localhost:3020/activities")
      .then((response) => {
        console.log(response.data);
        this.activities = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:3300/search/`+ 'restaurants' )
      .then((res) => {
        console.log(res.data.data);
        localStorage.setItem('locationId', res.data.data[0].location_id);
        console.log(res.data.data[0].location_id)
        this.activs = res.data.data;
          })
    axios
      .get(`http://localhost:3300/search/`+ 'parc' )
      .then((res) => {
        console.log(res.data.data);
        localStorage.setItem('locationId', res.data.data[0].location_id);
        console.log(res.data.data[0].location_id)
        this.parcs = res.data.data;
          })
     axios
      .get(`http://localhost:3300/search/`+ 'hotel' )
      .then((res) => {
        console.log(res.data.data);
        localStorage.setItem('locationId', res.data.data[0].location_id);
        console.log(res.data.data[0].location_id)
        this.hotels = res.data.data;
          })
       axios
      .get(`http://localhost:3300/search/`+ 'museum' )
      .then((res) => {
        console.log(res.data.data);
        localStorage.setItem('locationId', res.data.data[0].location_id);
        console.log(res.data.data[0].location_id)
        this.museums = res.data.data;
          })
  },
  computed: {
    resultQuery() {
      return (this.activities).filter((r) => {
        return ((r.city_name)|| (r.name))
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());

      });},
    resultQuery2() {
      return (this.parcs).filter((p) => {
        return ((p.address_obj.city) || (p.name))
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());

      });},
      resultQuery3() {
      return (this.activs).filter((q) => {
        return ((q.address_obj.city)
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()) || (q.name)
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()));

      });},
      resultQuery4() {
      return (this.hotels).filter((h) => {
        return ((h.address_obj.city)
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()) || (h.name)
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()))

      });},
      resultQuery5() {
      return (this.museums).filter((m) => {
        return ((m.address_obj.city)
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()) || (m.name)
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()))

      });}


  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap");

.act_cont{
  justify-content: center;
  text-align: center;
}

.containercards {
  font-family: 'Quicksand', Georgia, 'Times New Roman', Times, serif;
  width: 100%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}
img {
  max-width: 100%;
  display: block;
  object-fit: cover;
}
.card {
  display: flex;
  flex-direction: column;
  width: clamp(20rem, calc(20rem + 2vw), 15rem);
  overflow: hidden;
  box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 1em;
  background: #ece9e6;
}
.card__body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.card__footer {
  display: flex;
  margin-top: auto;
}

.form-control.mr-md-8 {
  width: 50%;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
}
.address{
  font-size: 16px;
}
.city span{
  font-weight: 800;
}
</style>