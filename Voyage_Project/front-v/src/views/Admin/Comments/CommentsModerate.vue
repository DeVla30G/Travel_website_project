<template>
  <div class="container">
    <div v-if="this.token == null"><h1>Please login first</h1></div>

    <div v-if="this.token !== null" class="container shadow-lg p-3 mb-5 rounded">
      <div v-if="this.role == 'admin'">
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
              <div class="form-outline mb-4">
                <textarea v-model="comment.text" type="text" class="form-control" />  
                <label class="form-label" for="registerDescription">Comment</label>
              </div>

      <button @click="update_comm" type="submit" class="btn btn-primary btn-block mb-3">
          Update </button>
    </form>
            <h1 style="margin-top: 100px" v-if="this.role != 'admin'">
              You don't have admin rights
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import axios from "axios";
export default {
  name: "CommentsModerate",
  components: {},
  props: ["id"],
  data() {
    return {
      token:'',
      role:'',
      comment: {},
      text: ''
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.role = localStorage.getItem("role");
    axios
      .get(`http://localhost:3020/comment/` + this.$route.params.id, {})
      .then((response) => {
        console.log(response.data[0]);
        this.comment = response.data[0];
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
      update_comm(event) {
      this.token = localStorage.getItem("token");
      this.role = localStorage.getItem("role");
      event.preventDefault();
      axios
        .patch("http://localhost:3020/comment/" + this.$route.params.id, {
          text: this.text,
          // image: this.image
        })
        .then((response) => {
          console.log(response.data);
          var result = response.data;
          if (result != null) {
            alert("Trip updated !");
            window.location.href = "http://localhost:8080/CrudComments";
          }
        })
        .catch((error) => {
          console.log("errorputdata");
          console.log(error);
        });
      }
  }
};
</script>