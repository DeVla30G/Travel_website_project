<template>
  <div class="container">
    <div v-if="this.token == null"><h1>Please login first</h1></div>

    <div
      v-if="this.token !== null"
      class="container shadow-lg p-3 mb-5 rounded"
    >
      <div v-if="this.role == 'admin'">
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
                <h6>To {{ trip.country_name }}</h6>
                <h6>City : {{ trip.city_name }}</h6>
                <p>
                  Description :
                  {{ trip.description }}
                </p>
              </section>
              <router-link to="/CrudTrips">
                <button
                  href="#"
                  type="button"
                  id="crud"
                  class="btn btn-outline-dark"
                >
                  Back
                </button></router-link
              >
            </div>
            <h1 style="margin-top: 100px" v-if="this.role == 'user'">
              You don't have admin rights
            </h1>
            <h1 style="margin-top: 100px" v-if="this.role == 'curateur'">
              You don't have admin rights
            </h1>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CrudDetailTrip",
  components: {},
  props: ["id"],
  data() {
    return {
      token:'',
      role:'',
      trip: {},
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.role = localStorage.getItem("role");
    axios
      .get(`http://localhost:3020/trip/` + this.$route.params.id, {})
      .then((response) => {
        console.log(response.data);
        this.trip = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
</style>