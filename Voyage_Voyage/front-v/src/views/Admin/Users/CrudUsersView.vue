<template>
  <div class="container">
    <div v-if="this.token == null"><h1>Please login first</h1></div>

    <div
      v-if="this.token !== null"
      class="container shadow-lg p-3 mb-5 rounded"
    >
      <div v-if="this.role == 'admin'">
         <router-link to="/AccueilCrud">
                <button
                  href="#"
                  type="button"
                  id="crud"
                  class="btn btn-outline-dark"
                >
                  Back
                </button></router-link
              >
        <h1 class="mt-5 mb-5">CRUD Users</h1>
        <div class="containercards">
          <div class="card" v-for="user in users" :key="user.id">
            <div class="card__header"></div>
            <div class="card__body">
              <h3>{{ user.username }}</h3>
              <h5>{{ user.lastname }}</h5>
              <h5>{{ user.avatar }}</h5>
              <div class="user">
               <img
                v-if="users.avatar != null"
                :src="user.avatar"
                alt="picture of the activity"
                class="user__image"
                  style="height: 50px; width: 50px"
              />
                <img
                 v-if="users.avatar == null"
                  src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                  alt=""
                  class="user__image"
                  style="height: 50px; width: 50px"
                />
              </div>

              <div class="card__footer">
                <div style="display: inline" class="user__info">
                  <div>
                    <router-link
                      :to="{ name: 'CrudDetailUser', params: { id: user.id } }"
                      ><button
                        href="#"
                        type="button"
                        id="crud"
                        class="btn btn-outline-dark"
                      >
                        See details
                      </button></router-link
                    >
                    <router-link
                      :to="{ name: 'CrudUpdateUser', params: { id: user.id }}"
                      ><button
                        href="#"
                        type="button"
                        id="crud"
                        class="btn btn-outline-dark"
                      >
                        Update
                      </button></router-link
                    >
                    <button
                      v-on:click.prevent="deleteUser(user)"
                      href="#"
                      type="button"
                      id="crud"
                      class="btn btn-outline-dark"
                    >
                      Delete
                    </button>
                    <h1 style="margin-top: 100px" v-if="this.role == 'user'">
                      You don't have admin rights
                    </h1>
                    <h1
                      style="margin-top: 100px"
                      v-if="this.role == 'curateur'"
                    >
                      You don't have admin rights
                    </h1>
                  </div>
                </div>
              </div>
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
  name: "CrudUsers",
  props: {
    id: "",
    username: "",
    lastname: "",
    avatar:'',
    email: "",
    role: "",
  },
  data() {
    return {
      users: "",
      token: "",
      role: "",
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.role = localStorage.getItem("role");
    axios
      .get("http://localhost:3020/users")
      .then((response) => {
        console.log(response.data);
        this.users = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    getUser() {
      this.token = localStorage.getItem("token");
      this.role = localStorage.getItem("role");
      axios.get("http://localhost:3020/users").then((response) => {
        console.log(response);
        this.posts = response.data;
      });
    },
    deleteUser(user) {
      console.log(user);
      if (confirm("Delete this user ?")) {
        this.token = localStorage.getItem("token");
        this.role = localStorage.getItem("role");
        axios
          .delete("http://localhost:3020/users/" + user.id, {})
          .then((response) => {
            console.log(this.id);
            this.posts = response.data;
            console.log(response.data);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap");
body {
  font-family: "Quicksand", sans-serif;
  display: grid;
  place-items: center;
  height: 100vh;
  background: #7f7fd5;
  background: linear-gradient(to right, #91eae4, #86a8e7, #7f7fd5);
}
.containercards {
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
</style>