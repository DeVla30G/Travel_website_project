<template>
  <div class="container">
    <div v-if="this.token == null"><h1>Please login first</h1></div>

    <div
      v-if="this.token !== null"
      class="container shadow-lg p-3 mb-5 rounded"
    >
      <button type="button"  @click="$emit('close')">X</button>
      <h1 class="mt-5 mb-5">Activities in your city</h1>
      <div class="containercards">
        <div class="card" v-for="activity in activities" :key="activity.id">
          <div class="card__header"></div>
          <div class="card__body">
            <h3>{{ activity.name }}</h3>
            <h5>To : {{ activity.city_name }}</h5>
            <h5>Type : {{ activity.type }}</h5>
            <div class="user">
              <!--<img v-if="user.avatar !== null"
              :src="user.avatar"
              alt=""
              class="user__image"
              style="height: 50px; width: 50px;"
            />
             <img v-else
              src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
              alt=""
              class="user__image"
              style="height: 50px; width: 50px;"
            />-->
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
                  <router-link
                    :to="{
                      name: 'AddActivity',
                      params: { id: activity.id },
                    }"
                    ><button
                      href="#"
                      type="button"
                      id="crud"
                      class="btn btn-outline-dark"
                    >
                      See details
                    </button></router-link
                  >
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
props: ['addmodal']
export default {
  name: "ModalActivities",
  props: {
    id: "",
    name: "",
    user_id: "",
    city_name: "",
    type: "",
    description: "",
  },
  data() {
    return {
      activities: "",
      token: "",
      role: "",
      trip: {},
      act: [],
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
    axios
      .get("http://localhost:3020/cityActivity/" + this.city_name)
      .then((response) => {
        console.log(response.data);
        this.activities = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:3020/trip/` + this.$route.params.id, {})
      .then((response) => {
        console.log(response.data);
        this.trip = response.data;
        const trip_id = response.data.id;
        localStorage.setItem("trip_id", trip_id);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:3020/cityActivity/" + this.city_name)
      .then((response) => {
        console.log(response.data);
        this.act = response.data;
      });
  },
  methods: {
    getActivities() {
      this.token = localStorage.getItem("token");
      this.role = localStorage.getItem("role");
      this.city_name = localStorage.getItem("city_name");
      axios
        .get("http://localhost:3020/cityActivity/" + this.city_name)
        .then((response) => {
          console.log(response);
          this.activities = response.data;
        });
    },
    close() {
       this.add

      },
    AddToTrip() {
      this.user_id = localStorage.getItem("user_id");
      this.trip_id = this.$route.params.id;
      this.activity_name = this.act.name;
      this.activity_id = this.act.id;
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
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap");

.containercards {
  font-family: 'Quicksand', Georgia, 'Times New Roman', Times, serif;
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