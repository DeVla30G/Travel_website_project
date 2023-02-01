<template>
  <div class="container">
    <div v-if="this.token == null"><h1>Please login first</h1></div>

    <div
      v-if="this.token !== null"
      class="container shadow-lg p-3 mb-5 rounded"
    >
      <button
        @click="Back"
        href="#"
        type="button"
        id="crud"
        class="btn btn-outline-dark"
      >
        Back
      </button>
      <h1 class="mt-5 mb-5">Activity in your city</h1>
      <div class="containercards">
        <div class="card__header"></div>
        <div class="card__body">
          <h3>{{ activity.name }}</h3>
          <h3>{{ trip.id }}</h3>
          <h5>To : {{ activity.city_name }}</h5>
          <h5>Type : {{ activity.type }}</h5>
          <div class="user">
            <img
              src="http://www.flashtaville.com/upload/cat/icone_loisir.png"
              alt=""
              class="user__image"
              style="height: 50px; width: 50px"
            />
          </div>

          <div class="card__footer">
            <div style="display: inline" class="user__info">
              <div>
                <button
                  @click="AddToTrip"
                  href="#"
                  type="button"
                  id="crud"
                  class="btn btn-outline-dark" >
                  Add activities
                </button>
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
  name: "AddActivity",
  props: {},
  data() {
    return {
      id: "",
      activity: "",
      token: "",
      role: "",
      trip: {},
      act: [],
      trip: [],
      city_name: "",
      add: "",
      user_id: "",
      activity_name: "",
      activity_id: "",
      trip_id: "",
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.role = localStorage.getItem("role");
    this.city_name = localStorage.getItem("city_name");
    this.trip_id = localStorage.getItem("trip_id");
    axios
      .get(`http://localhost:3020/trip/` + this.trip_id, {})
      .then((response) => {
        this.trip = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:3020/activities/" + this.$route.params.id)
      .then((response) => {
        this.activity = response.data[0];
        console.log(response.data[0]);
      });
  },
  methods: {
    getActivity() {
      this.token = localStorage.getItem("token");
      this.role = localStorage.getItem("role");
      this.city_name = localStorage.getItem("city_name");
      axios
        .get("http://localhost:3020/activities/" + this.$route.params.id)
        .then((response) => {
          console.log(response.data);
          this.activity = response.data;
        });
    },
    AddToTrip() {
      this.user_id = localStorage.getItem("user_id");
      this.trip_id = localStorage.getItem("trip_id");
      this.activity_name = this.activity.name;
      this.activity_id = this.activity.id;
      axios
        .post("http://localhost:3020/addToTrip", {
          user_id: this.user_id,
          activity_name: this.activity_name,
          activity_id: this.activity_id,
          trip_id: this.trip_id,
        })
        .then((response) => {
          console.log(response.data);
          var result = response.data;
          if (result != null) {
            alert("Activity added to your trip !");
            window.location.href = "http://localhost:8080/profile";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
     Back() {
         window.location.href = "http://localhost:8080/ModalActivities/" + this.trip_id;
     }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap");

.containercards {
  font-family: "Quicksand", sans-serif;
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
.button{
  box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.2);
  border-radius:10px;
}
</style>