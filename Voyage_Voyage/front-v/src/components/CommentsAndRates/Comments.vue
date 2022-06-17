<template>
  <div class="container loginForm">
    <div v-if="this.token == null"><h1>Please login first</h1></div>
    <div v-if="this.token !== null">
        <!-- Pills content -->
        <div class="card tab-content shadow-lg p-3 mb-5 rounded">
          <form method="put">
            <!-- comment input -->
            <div class="form-outline mb-4">
              <textarea
                v-model="text"
                type="textarea"
                id="registerText"
                class="form-control"
              />
              <label class="form-label" for="registerText">Comment</label>
            </div>
            <!-- Image Upload -->
            <div class="form-outline mb-4">
              <label style="float: left" class="form-label" for="image"
                >Choose your picture</label
              >
              <input
                accept="image/*"
                type="file"
                v-on:change="handleFileUpload"
                id="image"
                class="form-control border"
              />
            </div>
            <!-- Submit button -->
            <button @click="submit" type="submit" class="btn btn-outline-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Comments",
  components: {},
  data: () => {
    return {
      //comment
      text: "",
      image:'',
      user_id: "",
      username: "",
      activity_id: null,
      comment: [],
      token: "",
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.user_id = localStorage.getItem("user_id");
    this.username = localStorage.getItem("username");
    this.activity_id = this.$route.params.id;
    console.log(this.user_id);
    //get comments
    axios
      .get("http://localhost:3020/comment", {})
      .then((response) => {
        this.comment = response.data;
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
      this.token = localStorage.getItem("token");
      this.user_id = localStorage.getItem("user_id");
      this.username = localStorage.getItem("username");
      this.activity_id = this.$route.params.id;
      console.log(this.activity_id);
      console.log(this.user_id);
      event.preventDefault();
      let payload = new FormData();
      payload.append("image", this.picSelected);

      await axios
        .post(
          "https://api.imgbb.com/1/upload?expiration=90000000000&key=6b6ad1c37350ab18acf4f110ef18f65e",
          payload
        )
        .then((response) => {
          console.log("response", response);
          console.log("response URL", response.data.data.image.url);
          const pic = response.data.data.image.url;
          localStorage.setItem("pic", pic);
          console.log("success");
        })
        .catch((error) => {
          console.log("error", error);
          alert("try again");
        });
      this.pic = localStorage.getItem("pic");

      await axios
        .post("http://localhost:3020/comment", {
          text: this.text,
          image: this.pic,
          user_id: this.user_id,
          username: this.username,
          activity_id: this.activity_id,
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
.cardx {
  padding: 15px;
  box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 1em;
  background: #FCFCF3;
}
</style>