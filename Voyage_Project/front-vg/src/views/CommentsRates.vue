<template>
  <div class="containercards">
    <div v-if="this.token == null"><h1>Please login first</h1></div>

    <div
      v-if="this.token !== null"
      class="container shadow-lg p-3 mb-5 rounded"
    >
      <section>
        <div id="intro" class="container w-50 p-5 text-center"></div>

        <div class="container">
          <!--Grid row-->
          <div class="text-center">
            <router-link to="/AllActivities">
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
          <h1 class="mt-5 mb-5 text-center">{{ activity.name }}</h1>
          <h4 class="text-center">Type : {{ activity.type }}</h4>
          <!--Grid column-->
          <div style="width: 50%" class="container">
            <!--Section: Post data-mdb-->
            <section class="border-bottom mb-4">
              <div class="picture">
                <img
                  v-if="activity.picture != null"
                  :src="activity.picture"
                  alt="picture of the activity"
                  class="img-thumbnail"
                  style="width: 100%; height: auto"
                  width="400"
                />
              </div>
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
              <div v-for="rate in rates" :key="rate.id">
                <h6>Average rating : {{ rate.rate }} /5</h6>
              </div>
            </section>

            <div class="card" v-for="rate in rates" :key="rate.id">
              <Rates />
            </div>

            <div class="containercards">
              Comments
              <div class="card" v-for="comment in comments" :key="comment.id">
                <h6>{{ comment.username }} : {{ comment.text }}</h6>
                <div class="picture">
                <img
                  :src="comment.image"
                  alt="picture of the activity"
                  width="200"
                  class="rounded" style="width:200px; height:auto">
                </div>
              </div>
            </div>
          </div>
          <Comments />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Comments from "../components/CommentsAndRates/Comments";
import Rates from "../components/CommentsAndRates/Rates";
export default {
  name: "ViewMyActivity",
  components: { Comments, Rates },
  props: ["id"],
  data() {
    return {
      //activities
      token: "",
      activity: {},
      //comments
      comments: {},
      rates: {},
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
    axios
      .get(`http://localhost:3020/commentActiv/` + this.$route.params.id, {})
      .then((response) => {
        console.log(response.data);
        this.comments = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:3020/rating/` + this.$route.params.id, {})
      .then((response) => {
        console.log(response.data);
        this.rates = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap");
#intro {
  /* Margin to fix overlapping fixed navbar */
  margin-top: 58px;
}
@media (max-width: 991px) {
}
.user__image {
  border-radius: 50%;
  height: auto;
}
.containercards {
  font-family: "Quicksand", Georgia, "Times New Roman", Times, serif;
  margin-top: 10px;
}
.button{
  box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.2);
  border-radius:10px;
}
.picture {
  display: flex;
  text-align: center;
  float:right;
}
.card {
  padding: 15px;
  box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 1em;
  background: #fcfcf3;
}
</style>