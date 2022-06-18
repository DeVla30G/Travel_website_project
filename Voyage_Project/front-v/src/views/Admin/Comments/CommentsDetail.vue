<template>
  <div class="container">
    <div v-if="this.token == null"><h1>Please login first</h1></div>

    <div
      v-if="this.token !== null"
      class="container shadow-lg p-3 mb-5 rounded"
    >
      <div v-if="this.role == 'admin'">
        <section>
          <div id="intro" class="container w-50 p-5 text-center"></div>
          <!--Main Navigation-->

          <div class="container">
            <!--Grid row-->
            <h1>{{ comment.user_id }}</h1>
            <h4>{{ comment.text }}</h4>
            <h4></h4>
            <!--Grid column-->
            <div style="width: 50%" class="container">
              <!--Section: Post data-mdb-->
              <section class="border-bottom mb-4"></section>
              <!--Section: Post data-mdb-->

              <!--Section: Text-->
              <section>
                <h6>T {{ comment.user_id }}</h6>
                <h6>{{ comment.text }}</h6>
                <p>
                  <img
                    :src="comment.image"
                    width="200"
                    class="rounded"
                    style="width: 200px; height: auto"
                  />
                </p>
              </section>
              <router-link to="/CrudComments">
                <button class="btn btn-outline-dark">Back</button></router-link
              >
            </div>
            <h1 style="margin-top: 100px" v-if="this.role != 'admin'">
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
  name: "CommentsDetail",
  components: {},
  props: ["id"],
  data() {
    return {
      token: "",
      role: "",
      comment: {},
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.role = localStorage.getItem("role");
    axios
      .get(`http://localhost:3020/comment/` + this.$route.params.id, {})
      .then((response) => {
        console.log(response.data[0]);
        this.comment = response.data[0];
        console.log(reponse.data.text);
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