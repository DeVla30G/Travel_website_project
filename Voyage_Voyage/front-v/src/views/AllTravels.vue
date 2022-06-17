<template>
  <div class="container">
     <div class="text-center">
    <router-link to="/">
      <button href="#" type="button" id="crud" class="btn btn-outline-dark">
        Back
      </button></router-link
    >
     </div>
    <input
      class="form-control mr-md-8"
      type="search"
      placeholder="search trip by city name"
      v-model="searchQuery"
    />
    <h1 class="mt-5 mb-5 text-center">All Trips</h1>
    <div class="containercards">
      <div class="card" v-for="trip in resultQuery" :key="trip.id">
        <div class="card__header"></div>
        <div class="card__body">
          <h3>{{ trip.name }}</h3>
          <h5>To : {{ trip.city_name }}</h5>

          <div class="user">
            <!--<img v-if="user.avatar !== null"
              :src="user.avatar"
              alt=""
              class="user__image"
              style="height: 50px; width: 50px;"
            />
             <img v-else
              src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
              alt=""
              class="user__image"
              style="height: 50px; width: 50px;"
            />-->
            <img
              src="http://www.flashtaville.com/upload/cat/icone_loisir.png"
              alt=""
              class="user__image"
              style="height: 50px; width: 50px"
            />
          </div>
          <h5>Start at : {{ trip.start_date }}</h5>
          <h5>End at : {{ trip.end_date }}</h5>
          <h5>Description : {{ trip.description }}</h5>
          <div class="card__footer">
            <div style="display: inline" class="user__info">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AllTravels",
  props: {
    id: "",
    name: "",
    user_id: "",
    city_name: "",
    start_date: "",
    end_date: "",
    description: "",
    type: "",
  },
  data() {
    return {
      trips: [],
      token: "",
      role: "",
      searchQuery: "",
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.role = localStorage.getItem("role");
    axios
      .get("http://localhost:3020/trip")
      .then((response) => {
        console.log(response.data);
        this.trips = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    getTrips() {
      this.token = localStorage.getItem("token");
      this.role = localStorage.getItem("role");
      axios.get("http://localhost:3020/trip").then((response) => {
        console.log(response);
        this.trips = response.data;
      });
    },
  },
  computed: {
    resultQuery() {
      return this.trips.filter((r) => {
        return r.city_name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap");

.containercards {
  font-family: "Quicksand", sans-serif;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
  margin-block: 2rem;
  gap: 2rem;
}
img {
  max-width: 100%;
  display: block;
  object-fit: cover;
  margin-left: auto;
  margin-right: auto;
}
.card {
  display: flex;
  flex-direction: column;
  width: clamp(20rem, calc(20rem + 2vw), 15rem);
  overflow: hidden;
  box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 1em;
  background: #ece9e6;
  background: linear-gradient(to right, #ffffff, #ece9e6);
}
.card__body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.tag {
  align-self: flex-start;
  padding: 0.25em 0.75em;
  border-radius: 1em;
  font-size: 0.75rem;
}
.tag + .tag {
  margin-left: 0.5em;
}
.tag-blue {
  background: #56ccf2;
  background: linear-gradient(to bottom, #2f80ed, #56ccf2);
  color: #fafafa;
}
.tag-brown {
  background: #d1913c;
  background: linear-gradient(to bottom, #ffd194, #d1913c);
  color: #fafafa;
}
.tag-red {
  background: #cb2d3e;
  background: linear-gradient(to bottom, #ef473a, #cb2d3e);
  color: #fafafa;
}
.card__body h4 {
  font-size: 1.5rem;
  text-transform: capitalize;
}
.card__footer {
  display: flex;
  padding: 1rem;
  margin-top: auto;
}
.user {
  display: flex;
  gap: 0.5rem;
}
.user__image {
  border-radius: 50%;
  height: 50px;
}
.user__info > small {
  color: #666;
}
#crud {
  margin-top: 5px;
  margin-left: 5px;
}

.form-control.mr-md-8 {
  width: 50%;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
}
.button{
  box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.2);
  border-radius:10px;
}
</style>