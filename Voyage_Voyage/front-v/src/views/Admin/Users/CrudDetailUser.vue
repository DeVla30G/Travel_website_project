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

          <!--Grid row-->
          <h2>{{ user.username }}</h2>
          <h1>{{ user.lastname }}</h1>
          <!--Grid column-->
          <div style="width: 50%" class="container">
            <!--Section: Post data-mdb-->
            <section class="border-bottom mb-4">
            <img
                v-if="user.avatar != null"
                :src="user.avatar"
                alt="picture of the activity"
                class="user__image"
                  style="height: 70px; width: 70px"
              />
                <img
                 v-if="user.avatar == null"
                  src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                  alt=""
                  class="user__image"
                  style="height: 50px; width: 50px"
                />
            </section>
            <!--Section: Post data-mdb-->

            <!--Section: Text-->
            <section>
              <h6>From {{ user.country }}</h6>
              User id : {{ user.id }}
              <h6>User role : {{ user.role }}</h6>
              <p>
                Email :
                {{ user.email }}
              </p>
            </section>
            <router-link to="/CrudUsers">
              <button
                href="#"
                type="button"
                id="crud"
                class="btn btn-outline-dark"
              >
                Back
              </button></router-link
            >
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
  name: "CrudDetailUser",
  components: {},
  props: ["id"],
  data() {
    return {
      user: {},
      token: "",
      role: "",
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.role = localStorage.getItem("role");
    axios
      .get(`http://localhost:3020/users/` + this.$route.params.id, {})
      .then((response) => {
        console.log(response.data);
        this.user = response.data;
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
  height: 100px;
}
</style>