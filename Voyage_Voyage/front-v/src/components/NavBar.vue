<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="/"><img class="logo" src="../assets/Voyage-logo.png" alt="logo_voyage" /></a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="/"
              >Home <span class="sr-only">(current)</span></a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/countries">Countries</a>
          </li>
        </ul>
      </div>
      <!--LOGIN / REGISTER AUTH-->
      <div class="d-flex align-items-center">
        <div class="d-flex align-items-center">
          <ul v-if="this.token == null" class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link style="text-decoration: none" :to="'/register'">
                <a class="nav-link" href="#">Register</a></router-link
              >
            </li>

            <li class="nav-item">
              <router-link style="text-decoration: none" :to="'/login'">
                <a class="nav-link" href="#">Login</a></router-link
              >
            </li>
          </ul>
          <p
            v-if="this.token != null"
            style="margin-top: 15px; padding-right: 15px"
          >
            {{ user.username }}
          </p>
          <div v-if="this.token != null">
          <img
            class="avatar"
            v-if="user.avatar == null"
            src="https://img.20mn.fr/2U8AFAMgSRaJDHx2RQQsqyk/768x492_soleil-nice-depuis-palais-mediterranee-illustration"
            alt="user avatar"
          />
           <img
            class="avatar"
            v-if="user.avatar != null"
            :src="user.avatar"
            alt="user avatar"
          />
          </div>
          <div v-if="this.token != null" class="dropdown">
            <a class="align-items-center" href="#" role="button"> </a>
            <ul>
              <li class="nav-item dropdown">
                <a
                  v-if="this.token != null"
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Account settings
                </a>
                <div
                  class="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a class="dropdown-item" href="/profile">Profile</a>
                  <a
                    v-if="user.role == 'admin'"
                    class="dropdown-item"
                    href="/AccueilCrud"
                    >Admin</a
                  >
                  <a
                    v-if="this.role == 'curateur' || 'admin'"
                    class="dropdown-item"
                    href="/Activities"
                    >Create Activity</a
                  >
                  <a @click="logout" class="dropdown-item" href="/">Logout</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import axios from "axios";

export default {
  name: "NavBar",
  components: {},
  data() {
    return {
      searchQuery: "",
      resultQuery: [],
      infos: [],
      token: "",
      user: {},
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.id = localStorage.getItem("user_id");
    axios
      .get(`http://localhost:3020/users/` + this.id, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.user = response.data;
         console.log(response.data);
      });
  },
  methods: {
    logout() {
      axios.get("http://localhost:3020/users");
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      location.reload("/");
    },
    getResult() {
      axios
        .get(`http://localhost:3300/search`)
        .then((response) => {
          console.log(response.data.data);
          localStorage.setItem("locationId", response.data.data[0].location_id);
          console.log(response.data.data[0].location_id);
          this.searchQuery = response.data.data[0];
        })
        .catch((error) => {
          console.log(error);
        });
      this.$router.push("/result");
    },
  },
};
</script>

<style scoped>
.navbar {
  border: 2px solid rgb(29, 18, 18);
  position: relative;
}
p {
  color: white;
}
.nav-link {
  color: white;
}
ul {
  list-style: none;
}
li {
  list-style: none;
}
.avatar {
  width: 3em;
  height: 3em;
  border-radius: 50%;
}
.logo{
  width:90px;
  height: auto;
}
</style>