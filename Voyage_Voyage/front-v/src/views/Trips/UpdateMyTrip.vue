<template>
  <div class="container">
    <div v-if="this.token == null"><h1>Please login first</h1></div>

    <div
      v-if="this.token !== null"
      class="container shadow-lg p-3 mb-5 rounded"
    >
      <div class="container loginForm">
        <!-- Pills navs -->
        <ul
          class="nav nav-pills nav-justified mb-3"
          id="ex1"
          role="tablist"
        ></ul>
        <!-- Pills navs -->

        <!-- Pills content -->
        <div class="tab-content shadow-lg p-3 mb-5 bg-white rounded">
          <form method="put">
            <!-- start_date input -->
            <div class="form-outline mb-4">
              <input
                v-model="start_date"
                type="date"
                id="registerStart_date"
                class="form-control"
              />
              <label class="form-label" for="registerStart_date"
                >Start date</label
              >
            </div>

            <!-- end_date input -->
            <div class="form-outline mb-4">
              <input
                v-model="end_date"
                type="date"
                id="registerEnd_date"
                class="form-control"
              />
              <label class="form-label" for="registerEnd_date">End date</label>
            </div>

            <!-- description input -->
            <div class="form-outline mb-4">
              <textarea
                v-model="description"
                type="description"
                id="registerDescription"
                class="form-control"
              />
              <label class="form-label" for="registerDescription"
                >Description</label
              >
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
              <router-link :to="'/profile'"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UpdateMyTrip",
  components: {},
  props: ["id"],
  data: () => {
    return {
      start_date: "",
      end_date: "",
      description: "",
      token: "",
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    axios
      .get("http://localhost:3020/trip/" + this.$route.params.id, {})
      .then((response) => {
        console.log("getdataupdatetrip");
        this.trips = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    update(event) {
      this.token = localStorage.getItem("token");
      event.preventDefault();
      axios
        .patch("http://localhost:3020/trip/" + this.$route.params.id, {
          start_date: this.start_date,
          end_date: this.end_date,
          description: this.description,
        })
        .then((response) => {
          console.log("putdata");
          console.log(response.data);
          var result = response.data;
          if (result != null) {
            alert("Trip modifié !");
            window.location.href = "http://localhost:8080/CrudTrips";
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