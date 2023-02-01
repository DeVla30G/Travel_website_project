<template>
  <div class="container">
     <div class="text-center">
      <router-link :to="'/profile'">
        <button href="#" type="button" class="btn btn-outline-dark">
          Back
        </button></router-link
      >
    </div>
    <div v-if="this.token == null"><h1>Please login first</h1></div>
    <div
      v-if="this.token !== null"
      class="container shadow-lg p-3 mb-5 rounded"
    >
      <div class="container loginForm">
        <!-- Pills navs -->
        <h1>Create a trip</h1>
        <ul
          class="nav nav-pills nav-justified mb-3"
          id="ex1"
          role="tablist"
        ></ul>
        <!-- Pills navs -->

        <!-- Pills content -->
        <div class="tab-content shadow-lg p-3 mb-5 bg-white rounded">
          <form method="put">
            <!-- name input -->
            <div class="form-outline mb-4">
              <input
                v-model="name"
                type="text"
                id="registerName"
                class="form-control"
              />
              <label class="form-label" for="registerName"
                >Name of the Trip</label
              >
            </div>
            <div>
              <!-- city input -->
              <div class="form-outline mb-4">
                <label class="form-label" for="city_name">City</label>
                <select
                  class="ui dropdown"
                  name="city_name"
                  id="city_name"
                  v-model="city_name"
                >
                  <option
                    v-for="cities in city"
                    :value="cities.Name"
                    :key="cities.Name"
                  >
                    {{ cities.Name }}
                  </option>
                </select>
              </div>
              <!-- country input -->
              <div class="form-outline mb-4">
                <label class="form-label" for="city_name">Country</label>
                <select
                  class="ui dropdown"
                  name="city_name"
                  id="city_name"
                  v-model="LocalName"
                >
                  <option
                    v-for="cities in city"
                    :value="cities.Name"
                    :key="cities.Name"
                  >
                    {{ cities.LocalName }}
                  </option>
                </select>
              </div>
            </div>
            <!-- start date input -->
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

            <!-- end date input -->
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
                type="textarea"
                id="registerDescription"
                class="form-control"
              />
              <label class="form-label" for="registerDescription"
                >Description</label
              >
            </div>
            <!-- Submit button -->
            <div>
              <button
                @click="submit"
                type="submit"
                class="btn btn-outline-dark"
              >
                Submit
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
  name: "Travels",
  components: {},
  data: () => {
    return {
      //trip
      name: "",
      user_id: "",
      LocalName: "",
      city_name: "",
      start_date: "",
      end_date: "",
      description: "",
      trip: "",
      //cities
      city: [],
      token: "",
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.user_id = localStorage.getItem("user_id");
    console.log(this.user_id);
    //get cities
    axios
      .get("http://localhost:3020/CountryCity", {})
      .then((response) => {
        this.city = response.data;
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
      console.log(this.user_id);
      event.preventDefault();
      axios
        .post("http://localhost:3020/trip", {
          name: this.name,
          user_id: this.user_id,
          city_name: this.city_name,
          LocalName: this.LocalName,
          start_date: this.start_date,
          end_date: this.end_date,
          description: this.description,
        })
        .then((response) => {
          console.log(response.data);
          var result = response.data;
          if (result != null) {
            alert("Trip created !");
            window.location.href = "http://localhost:8080/profile";
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
  box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.2);
  border-radius:10px;
}
</style>