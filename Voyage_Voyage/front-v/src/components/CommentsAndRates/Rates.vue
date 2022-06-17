<template>
  <div class="container">
    <div v-if="this.token == null"><h1>Please login first</h1></div>
    <div v-if="this.token !== null">
      <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist"></ul>
      <!-- Pills content -->

      <form method="put">
        <!-- comment input -->
        <div>
          <label for="rate">Rate this activity :</label>
          <select name="rate" id="rate" v-model="rate">
            <option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          &nbsp;&nbsp;&nbsp;
          <button @click="submit" type="submit" class="btn btn-outline-dark">
            Submit
          </button>
        </div>
        <!-- Submit button -->
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Travels",
  components: {},
  data: () => {
    return {
      //comment
      user_id: "",
      activity_id: null,
      rate: 0,
      rating: [],
      token: "",
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.user_id = localStorage.getItem("user_id");
    this.activity_id = this.$route.params.id;
    console.log(this.user_id);
    //get rates
    axios
      .get("http://localhost:3020/rating", {})
      .then((response) => {
        this.rating = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    submit(event) {
      this.token = localStorage.getItem("token");
      this.user_id = localStorage.getItem("user_id");
      this.activity_id = this.$route.params.id;
      console.log(this.activity_id);
      console.log(this.user_id);
      event.preventDefault();
      axios
        .post("http://localhost:3020/rating", {
          user_id: this.user_id,
          activity_id: this.activity_id,
          rate: this.rate,
        })
        .then((response) => {
          console.log(response.data);
          var result = response.data;
          if (result != null) {
            window.location.reload();
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
label {
  display: block;
  font: 1rem "Fira Sans", sans-serif;
}

input,
label {
  margin: 0.4rem 0;
}
</style>