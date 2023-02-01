<template>
  <div>
    <div class="container">
      <div v-if="this.token == null"><h1>Please login first</h1></div>
      <div
        v-if="this.token !== null"
        class="container shadow-lg p-3 mb-5 rounded"
      >
      <div v-if="this.role == 'curateur' || 'admin'" id="keyframes">
          <div class="container loginForm">
            <!-- Pills navs -->
            <h1>Create an activity</h1>
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
                    >Name of the Activity</label
                  >
                </div>
                <div>
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
                  <!-- Image Upload -->
                  <div class="form-outline mb-4">
                    <label style="float: left" class="form-label" for="picture"
                      >Choose your picture</label
                    >
                    <input
                      accept="image/*"
                      type="file"
                      v-on:change="handleFileUpload"
                      id="picture"
                      class="form-control border"
                    />
                  </div>
                </div>
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
                <!-- type input -->
                <label for="Type">Activity Type :</label>

                <select name="Type" id="Type" v-model="type">
                  <option value="">--Please choose a Type--</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="tours">Tours</option>
                  <option value="walks">Walks</option>
                  <option value="amusement park">Amusement park</option>
                  <option value="national parks">National parks</option>
                  <option value="cultural visits">Cultural visits</option>
                  <option value="cooking classes">Cooking classes</option>
                  <option value="sports activities">Sports activities</option>
                  <option value="family">Family</option>
                  <option value="nightlife">Nightlife</option>
                  <option value="other">Other activities</option>
                </select>
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Activities",
  components: {},
  data: () => {
    return {
      //trip
      id:'',
      name: "",
      user_id: "",
      description: "",
      picture: "",
      city_name: "",
      type: "",
      trip: "",
      //cities
      city: [],
      token: "",
      role: "",
      image: "",
      pic:'',
      picSelected: null,
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.user_id = localStorage.getItem("user_id");
    this.role = localStorage.getItem("role");
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
    handleFileUpload(e) {
      this.picSelected = e.target.files[0];
      console.log(this.picSelected);
      this.image = URL.createObjectURL(this.picSelected);
      console.log(this.image);
      console.log(this.picSelected);
    },

    async submit(event) {
      event.preventDefault();
      this.token = localStorage.getItem("token");
      this.user_id = localStorage.getItem("user_id");
      this.role = localStorage.getItem("role");
      console.log(this.user_id);
      event.preventDefault();

      
      let payload = new FormData();
      payload.append("image", this.picSelected);
      payload.append("name", this.name);

      await axios
        .post(
          "https://api.imgbb.com/1/upload?expiration=90000000000&key=6b6ad1c37350ab18acf4f110ef18f65e",
          payload
        )
        .then((response) => {
          console.log("response", response);
          console.log("response URL", response.data.data.image.url);
          const pic = response.data.data.image.url
          localStorage.setItem("pic", pic);
          console.log("success");
        })
        .catch((error) => {
          console.log("error", error);
          alert("try again");
        });
        this.pic = localStorage.getItem("pic");
      await axios
        .post("http://localhost:3020/activities", {
          name: this.name,
          user_id: this.user_id,
          description: this.description,
          city_name: this.city_name,
          type: this.type,
          picture: this.pic
        })
        .then((response) => {
          console.log(response.data);
          var result = response.data;
          if (result != null) {
            alert("Activity created !");
            window.location.href = "/profile";
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

<style >
.container{
 
}
.loginForm {
  width: 50%;
  margin-top: 150px;
}
#keyframes {
  border: 5px solid;
  border-image: linear-gradient(#f5ff2f, #914017, #fb2b02) 1;
  animation: rotate 2.5s ease-in infinite;
  background-color: white;
  opacity: 80%;
  z-index: 0;
}
button {
  background-color: transparent;
  box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.2);
  border-radius:10px;
}
</style>