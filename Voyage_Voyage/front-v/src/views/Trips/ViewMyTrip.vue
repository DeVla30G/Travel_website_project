<template>
<NavBar/>
  <div class="container">
           <!--Section: back -->
            <router-link to="/profile">
              <button
                href="#"
                type="button"
                id="crud"
                class="btn btn-outline-dark" >
                Back
              </button></router-link>
    <div v-if="this.token == null"><h1>Please login first</h1></div>

    <div
      v-if="this.token !== null"
      class="container round shadow-lg p-3 mb-5 rounded"
    >
      <section>
        <div id="intro" class="container w-50 p-5 text-center">
          <!--v-if='login-admin' -->
          <!-- <h1 class="mb-0 h4"> {{post.title}}</h1> -->
        </div>
        <!--Main Navigation-->

        <div class="container">
          <!--Grid row-->
          <h1>{{ trip.name }}</h1>
          <h4>Start at : {{ trip.start_date }}</h4>
          <h4>End at : {{ trip.end_date }}</h4>
          <!--Grid column-->
          <div style="width: 50%" class="container">
            <!--Section: Post data-mdb-->
            <section class="border-bottom mb-4">
              <!--<img
            :src="user.avatar"
            alt="user__image"
            class="user__image"
          />-->
              <img
                src="https://img2.freepng.fr/20180406/vsq/kisspng-world-computer-icons-travel-globe-transport-tourist-5ac7b1c50ba3f0.9517427515230366130477.jpg"
                alt=""
                class="user__image"
                style="height: 50px; width: 50px"
              />
            </section>
            <!--Section: Post data-mdb-->

            <!--Section: Text-->
            <section>
              <h6>City : {{ trip.city_name }}</h6>
              <p>
                Description :
                {{ trip.description }}
              </p>

              <!--Section: Activity reserved -->
              activity reserved :
              <div
                class="card"
                v-for="activity in activities"
                :key="activity.id"
              >
                <p>{{ activity.activity_name }}</p>
                <button
                  v-on:click.prevent="deleteActivity(activity)"
                  href="#"
                  type="button"
                  id="crud"
                  class="btn btn-outline-dark"
                >
                  Delete
                </button>
              </div>
            </section>

     
             <button type="button" class="btn btn-outline-dark" @click="showmodal"> add to trip</button>
          <ModalActivities v-if="addmodal" @close='closemodal'/>
         </div>
        </div>
      </section>
    </div>
  </div>
  <FooterBar/>
</template>

<script>
import axios from "axios";
import ModalActivities from "@/views/ModalActivities.vue"
import NavBar from "@/components/NavBar.vue";
import FooterBar from '@/components/FooterBar.vue'

export default {
  name: "ViewMyTrip",
  components: { 
    ModalActivities,
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
    addmodal: false
  },
  data() {
    return {
      token: "",
      trip: {},
      id: "",
      activities: "",
      activity_name: "",
      addmodal:''
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    axios
      .get(`http://localhost:3020/trip/` + this.$route.params.id, {})
      .then((response) => {
        console.log(response.data);
        this.trip = response.data;
        console.log(response.data);
        const city_name = response.data.city_name;
        localStorage.setItem("city_name", city_name);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:3020/addToTrip/` + this.$route.params.id, {})
      .then((response) => {
        console.log(response.data);
        this.activities = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    deleteActivity(activity) {
      this.token = localStorage.getItem("token");
      console.log(activity);
      if (confirm("Delete this activity ?")) {
        axios
          .delete("http://localhost:3020/addToTrip/" + activity.activity_id, {
            data: {
              trip_id: activity.trip_id,
            },
          })
          .then((response) => {
            console.log(this.id);
            this.trip_id = response.data.trip_id;
            this.trips = response.data;
            console.log(response.data);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    showmodal () {
      this.addmodal = true
    },
    closemodal () {
      this.addmodal = false
    }
  },
};
</script>

<style scoped>
#intro {
  /* Margin to fix overlapping fixed navbar */
  margin-top: 58px;
  
}
@media (max-width: 991px) {
  #intro {
    /* Margin to fix overlapping fixed navbar */
    margin-top: 45px;
  }
}
.user__image {
  border-radius: 50%;
  height: auto;
}
#crud {
  margin-left: 10px;
  margin-top: 30px;
}
.card{
  font-size: 20px;
   box-shadow: 2px 3px 5px gray;
  padding: .5em;
 
}
.card p{
  border: 1px solid gray;
  box-shadow: 2px 3px 5px gray;
}
.round{
  border: 5px solid;
  border-image: linear-gradient(#f5ff2f, #914017, #fb2b02) 1;
  animation: rotate 2.5s ease-in infinite;
  background-color: white;
  opacity: 80%;
  z-index: 0;
  padding: 3em;
}
</style>