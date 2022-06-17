<template>
  <div class="container">
    <div v-if="this.token == null"><h1>Please login first</h1></div>

    <div
      v-if="this.token !== null"
      class="container shadow-lg p-3 mb-5 rounded"
    >
      <div v-if="this.role == 'admin'">
        <div class="container loginForm">
          <!-- Pills navs -->
          <h1>Update my informations</h1>
          <ul
            class="nav nav-pills nav-justified mb-3"
            id="ex1"
            role="tablist"
          ></ul>
          <!-- Pills navs -->

          <!-- Pills content -->
          <div class="tab-content shadow-lg p-3 mb-5 bg-white rounded">
            <form method="put">
              <!-- Email input -->
              <div class="form-outline mb-4">
                <input
                  v-model="email"
                  type="email"
                  id="registerEmail"
                  class="form-control"
                />
                <label class="form-label" for="registerEmail">Email</label>
              </div>

              <!-- Password input -->
              <div class="form-outline mb-4">
                <input
                  v-model="password"
                  type="password"
                  id="registerPassword"
                  class="form-control"
                />
                <label class="form-label" for="registerPassword"
                  >Password</label
                >
              </div>

              <!-- role input -->
              <div class="form-outline mb-4">
                <label>
                  Role
                  <select v-model="role" id="RegisterRole">
                    <option value="user" selected>user</option>
                    <option value="curateur">curateur</option>
                    <option value="admin">admin</option>
                  </select>
                </label>
              </div>

              <!-- Submit button -->
              <div class="button">
                <button
                  @click="update"
                  type="submit"
                  class="btn btn-outline-dark"
                >
                  Modify
                </button>
                <router-link :to="'/CrudUsers'"
                  ><button
                    href="#"
                    type="button"
                    id="crud"
                    class="btn btn-outline-dark"
                  >
                    Cancel
                  </button></router-link
                >
              </div>
            </form>
            <h1 style="margin-top: 100px" v-if="this.role == 'user'">
              You don't have admin rights
            </h1>
            <h1 style="margin-top: 100px" v-if="this.role == 'curateur'">
              You don't have admin rights
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CrudUpdateUser",
  components: {},
  props: ["id"],
  data: () => {
    return {
      email: "",
      password: "",
      token: "",
      role: "",
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.role = localStorage.getItem("role");
    axios
      .get("http://localhost:3020/users/" + this.$route.params.id, {})
      .then((response) => {
        console.log("getdataupdateuser");
        this.users = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    update(event) {
      event.preventDefault();
      this.token = localStorage.getItem("token");
      this.role = localStorage.getItem("role");
      axios
        .patch("http://localhost:3020/users/" + this.$route.params.id, {
          email: this.email,
          password: this.password,
          role: this.role,
        })
        .then((response) => {
          console.log("putdata");
          console.log(response.data);
          var result = response.data;
          if (result != null) {
            alert("User updated !");
            window.location.href = "http://localhost:8080/CrudUsers";
          }
        })
        .catch((error) => {
          console.log("errorputdata");
          console.log(error);
        });

      /*})
      .catch((error) => {
        console.log(error);
        console.log("error", error.response.data);
      })*/
    },
  },
};
</script>
<style>
.loginForm {
  width: 50%;
  margin-top: 150px;
}
.button{
  text-align: center;
}
button{
  margin: 10px;
}
</style>