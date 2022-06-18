<template>
<NavBar/>
  <div class="act_cont">
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
      placeholder="search activity by city name or type of activity"
      v-model="searchQuery"
    />
    <h1 class="mt-5 mb-5 text-center">Most liked Activities</h1>
    <div class="containercards">
      <div class="card" v-for="activity in resultQuery" :key="activity.id">
        <!-- pictures API Voyage -->
        <img
          :src="activity.picture"
          alt="rio_carnaval"
          style="height: 350px; width: 350px"
        />
        <!-- -->
        <div class="card__header"></div>
        <div class="card__body">
          <h3>{{ activity.name }}</h3>
          <div class="user"></div>

          <div class="card__header"></div>
          <div class="card__body">
            <p class="city">
              City : <span>{{ activity.city_name }}</span>
            </p>

            <div class="card__footer">
              <div></div>
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
  name: "MostLikedAct",
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
    city: "",
    location_id: "",
  },
  data() {
    return {
      activities: [],
      token: "",
      role: "",
      searchQuery: "",
      activs: [],
      parcs: [],
      city: "",
      hotels: [],
      museums: [],
      user_id: "",
      activity_id: "",
      rate: "",
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.role = localStorage.getItem("role");
    axios
      .get("http://localhost:3020/activities")
      .then((response) => {
        this.activities = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  computed: {
    resultQuery() {
      return this.activities.filter((r) => {
        return (r.city_name || r.name)
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
    },
    resultQuery2() {
      return this.parcs.filter((p) => {
        return (p.address_obj.city || p.name)
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
    },
    resultQuery3() {
      return this.activs.filter((q) => {
        return (
          q.address_obj.city
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          q.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    },
    resultQuery4() {
      return this.hotels.filter((h) => {
        return (
          h.address_obj.city
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          h.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    },
    resultQuery5() {
      return this.museums.filter((m) => {
        return (
          m.address_obj.city
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          m.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap");

.containercards {
  font-family: "Quicksand", Georgia, "Times New Roman", Times, serif;
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
  margin-bottom: 15px;
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
.address {
  font-size: 16px;
}
.city span {
  font-weight: 800;
}
</style>