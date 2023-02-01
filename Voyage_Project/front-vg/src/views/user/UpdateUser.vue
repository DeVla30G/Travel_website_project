<template>

<div class="container"><!--v-if='login-admin' -->
  <div class="container loginForm">
  <!-- Pills navs -->
  <h1>Modifier mes informations</h1>
<ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
  
</ul>
<!-- Pills navs -->

<!-- Pills content -->
<div class="tab-content shadow-lg p-3 mb-5 bg-white rounded">

    <form method='put'>
       <!-- username input -->
      <div class="form-outline mb-4">
        <input v-model="username"  type="text" id="registerUsername" class="form-control" />
        <label class="form-label" for="registerUsername">Username</label>
      </div>

       <!-- lastname input -->
      <div class="form-outline mb-4">
        <input v-model="lastname"  type="text" id="registerLastname" class="form-control" />
        <label class="form-label" for="registerLastname">Lastname</label>
      </div>

      <!-- Email input -->
      <div class="form-outline mb-4">
        <input v-model="email"  type="email" id="registerEmail" class="form-control" />
        <label class="form-label" for="registerEmail">Email</label>
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <input v-model="password" type="password" id="registerPassword" class="form-control" />
        <label class="form-label" for="registerPassword">Password</label>
      </div>

      <!-- Submit button -->
      <div class="button">
      <button @click="update" type="submit" class="btn btn-outline-dark">Modify</button>
      <router-link :to="'/profile'"><button
                  href="#"
                  type="button"
                  id="crud"
                  class="btn btn-outline-dark"
                >
                  Cancel
                </button></router-link>
      </div>
    </form>

</div>
</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UpdateUser",
  components: {},
  data: () => {
    return {
      username: "",
      lastname: "",
      email: "",
      password: "",
      id:''
    };
  }, 
  mounted() {
        this.id = localStorage.getItem("user_id");
      axios.get('http://localhost:3020/users/' + this.id,{})
        .then((response) => {
          this.users = response.data;
            console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
    },
  methods: {
    update(event){
      event.preventDefault()
        this.id = localStorage.getItem("user_id");
      axios.patch('http://localhost:3020/updateUser/' + this.id, {
        username: this.username,
        lastname: this.lastname,
        email: this.email,
        password: this.password
      })
      .then((response) => {
        console.log(response.data);
        var result = response.data;
        if (result != null){
          alert("Utilisateur modifié !")
          window.location.href = 'http://localhost:8080/profile';
        }
      }).catch((error) => {
        console.log('errorputdata');
          console.log(error);
        })
      
      /*})
      .catch((error) => {
        console.log(error);
        console.log("error", error.response.data);
      })*/
    },
  }
};
</script>
<style>
.loginForm{
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