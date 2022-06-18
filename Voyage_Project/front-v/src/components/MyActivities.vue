<template>
  <div class="container">
    <div v-if="this.token == null"><h1>Please login first</h1></div>

    <div
      v-if="this.token !== null"
      class="cont shadow-lg p-3 mb-5 rounded"
    >
      <div v-if="this.role == 'curateur' || 'admin'">
        <router-link :to="'/Activities'"
          ><button
            href="#"
            type="button"
            id="crud"
            class="btn btn-outline-dark"
          >
            Create an activity
          </button></router-link
        >
        <h1 class="mt-5 mb-5">My Activities</h1>
        <div class="containercards">
          <div class="card" v-for="activity in activities" :key="activity.id">
              <img
                  :src="activity.picture"
                  alt="activity picture"
                  style="height: 350px; width: 350px"
                />
            <div class="card__header"></div>
            <div class="card__body">
              <h3>{{ activity.name }}</h3>
              <h5>In {{ activity.city_name }}</h5>
              <h5>Type : {{ activity.type }}</h5>

              <div class="card__footer">
                <div style="display: inline" class="user__info">
                  <div>
                    <router-link
                      :to="{
                        name: 'ViewMyActivity',
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
                    <button
                      v-on:click.prevent="deleteActivity(activity)"
                      href="#"
                      type="button"
                      id="crud"
                      class="btn btn-outline-dark"
                    >
                      Delete
                    </button>
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
  name: "MyActivities",
  props: {
    id: "",
    name: "",
    user_id: "",
    city_name: "",
    description: "",
    type: "",
  },
  data() {
    return {
      activities: "",
      token: "",
      user_id: "",
      role: "",
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.user_id = localStorage.getItem("user_id");
    this.role = localStorage.getItem("role");
    axios
      .get("http://localhost:3020/myActivity/" + this.user_id)
      .then((response) => {
        console.log(response.data);
        this.activities = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    getActivity() {
      this.token = localStorage.getItem("token");
      this.user_id = localStorage.getItem("user_id");
      this.role = localStorage.getItem("role");
      axios
        .get("http://localhost:3020/myActivity/" + this.user_id)
        .then((response) => {
          console.log(response);
          this.activities = response.data;
        });
    },
    deleteActivity(activity) {
      this.token = localStorage.getItem("token");
      this.role = localStorage.getItem("role");
      console.log(activity);
      if (confirm("Delete this activity ?")) {
        axios
          .delete("http://localhost:3020/activities/" + activity.id, {})
          .then((response) => {
            console.log(this.id);
            this.activities = response.data;
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

.cont{
  border: 5px solid;
  border-image: linear-gradient(#f5ff2f, #914017, #fb2b02) 1;
  animation: rotate 2.5s ease-in infinite;
  background-color: white;
  opacity: 80%;
  z-index: 0;
  padding: 3em;
}

.containercards {
  font-family: "Quicksand", Georgia, "Times New Roman", Times, serif;
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