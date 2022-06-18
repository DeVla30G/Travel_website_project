<template>
  <div class="container">
    <div v-if="this.token == null"><h1>Please login first</h1></div>

    <div
      v-if="this.token !== null"
      class="container shadow-lg p-3 mb-5 rounded"
    >
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
                id="picture"
                class="img-thumbnail" style="width:100%; height:auto"
                width="400"
              />
              <img
                v-if="activity.picture == null"
                src="http://www.flashtaville.com/upload/cat/icone_loisir.png"
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
            <router-link to="/profile">
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
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ViewMyActivity",
  components: {},
  props: ["id", "img"],
  data() {
    return {
      token: "",
      activity: {},
      pic: "",
      picture: "",
      pict: "",
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");

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