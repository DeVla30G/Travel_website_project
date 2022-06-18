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
            <h1>{{ activity.name }}</h1>
            <h4>Type : {{ activity.type }}</h4>
            <!--Grid column-->
            <div style="width: 50%" class="container">
              <!--Section: Post data-mdb-->
              <section class="border-bottom mb-4">
               <img
                v-if="activity.picture != null"
                :src="activity.picture"
                alt="picture of the activity"
                class="picture"
                id="picture"
                width="300"
              />
                <img
                 v-if="activity.picture == null"
                  src="https://img2.freepng.fr/20180406/vsq/kisspng-world-computer-icons-travel-globe-transport-tourist-5ac7b1c50ba3f0.9517427515230366130477.jpg"
                  alt=""
                  class="user__image"
                  style="height: 50px; width: 50px"
                />
              </section>
              <!--Section: Post data-mdb-->

              <!--Section: Text-->
              <section>
                <h6>City : {{ activity.city_name }}</h6>
                <p>
                  Description :
                  {{ activity.description }}
                </p>
              </section>
              <router-link to="/CrudActivitiesView">
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
  name: "CrudDetailActivity",
  components: {},
  props: ["id"],
  data() {
    return {
      token:'',
      role:'',
      activity: {},
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.role = localStorage.getItem("role");
    axios
      .get(`http://localhost:3020/activities/` + this.$route.params.id, {})
      .then((response) => {
        console.log(response.data[0]);
        this.activity = response.data[0];
        console.log(response.data[0]);
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