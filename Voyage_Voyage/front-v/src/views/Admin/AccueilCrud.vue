<template>
  <div class="container">
    <div v-if="this.token == null"> <h1>Please login first</h1></div>

    <div v-if="this.token !== null" class="container shadow-lg p-3 mb-5 rounded">
      <div v-if="this.role == 'admin'">
      <h1 class="admin">Admin Dashboard</h1>
      <router-link :to="'/'"
        ><button 
        href="#" 
        type="button" 
        id="crud" 
        class="btn btn-dark mt-3">
          Back to Home
        </button></router-link
      >
      <router-link :to="'/CrudUsers'"
        ><button
          href="#"
          type="button"
          id="crud"
          class="btn btn-outline-dark mt-3"
        >
          Users
        </button></router-link
      >
      <router-link :to="'/CrudTrips'"
        ><button
          href="#"
          type="button"
          id="crud"
          class="btn btn-outline-dark mt-3"
        >
          Trips
        </button></router-link
      >
      <router-link :to="'/CrudActivitiesView'"
        ><button
          href="#"
          type="button"
          id="crud"
          class="btn btn-outline-dark mt-3"
        >
          Activities
        </button></router-link
      >
       <router-link :to="'/CrudComments'"
        ><button
          href="#"
          type="button"
          id="crud"
          class="btn btn-outline-dark mt-3"
        >
          Comments
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
</div>
</template>

<script>
import axios from "axios";
export default {
  name: "AccueilCrud",
  data: () => {
    return {
      token:'',
      role:'',
      user: {},
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.role = localStorage.getItem("role");
    axios
      .get("http://localhost:3020/users", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        this.user = response.data;
      });
  },
};
</script>

<style scoped>
.footerHome {
  margin-top: 150px;
}
#crud {
  margin-left: 10px;
  margin-top: 30px;
}
.admin {
  margin-top: 80px;
  margin-bottom: 30px;
}
</style>