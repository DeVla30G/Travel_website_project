<template>
<NavBar/>
  <div class="container">
    <div class="container">
      <div class="container loginForm">
        <div class="tab-content">
          <div
            class="tab-pane fade show active"
            id="pills-login"
            role="tabpanel"
            aria-labelledby="tab-login"
          >
            <form>
              <div class="table-sit" id="table-sit">Register</div>
              <div class="form-group">
                <input
                  type="text"
                  name="username"
                  id="title-content"
                  placeholder="Username"
                  v-model="username"
                  required
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  name="lastname"
                  id="title-content"
                  placeholder="Lastname"
                  v-model="lastname"
                  required
                  class="form-control"
                />
              </div>
              <!-- Image Upload -->
              <div class="form-outline mb-4">
                <label style="float: left" class="form-label" for="image"
                  >Choose your avatar</label
                >
                <input
                  accept="image/*"
                  type="file"
                  v-on:change="handleFileUpload"
                  id="image"
                  class="form-control border"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  name="country"
                  id="title-content"
                  placeholder="Country"
                  v-model="country"
                  required
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <input
                  type="email"
                  name="email"
                  id="title-content"
                  placeholder="Email"
                  v-model="email"
                  required
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  name="password"
                  id="title-content"
                  placeholder="Password"
                  v-model="password"
                  required
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  name="password_confirm"
                  id="title-content"
                  placeholder="Confirm password"
                  v-model="confirm_password"
                  required
                  class="form-control"
                />
              </div>
              <div>
                <input
                  type="checkbox"
                  id="checkbox-1"
                  v-model="status"
                  name="checkbox-1"
                  value="accepted"
                  unchecked-value="not_accepted"
                  required
                />
                I accept the
                <router-link :to="'/termsandconditions'"
                  >User Comment Terms and Conditions</router-link
                >
                and I confirm that I have read the
                <router-link :to="'/termsandconditions'"
                  >Privacy Policy</router-link
                >
                <div class="validator" v-if="status == false">
                  You have to accept the Policies first!
                </div>
              </div>

              <button
                id="button-save"
                class="btn btn-outline-dark"
                @Click.prevent="createUser"
              >
                <i class="fa fa-paper-plane"></i>Submit
              </button>
              <div class="text-center">
                <p>
                  Allready member ?
                  <router-link :to="'/login'">Login</router-link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterBar/>
</template>

<script>
import axios from "axios";
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'

export default {
  name: "register",
  components: {
    NavBar,
    FooterBar
  },
  data() {
    return {
      users: [],
      status: "not_accepted",
    };
  },
  methods: {
    handleFileUpload(e) {
      this.picSelected = e.target.files[0];
      console.log(this.picSelected);
      this.image = URL.createObjectURL(this.picSelected);
      console.log(this.image);
      console.log(this.picSelected);
    },
    async createUser() {
      if (
        this.username &&
        this.lastname &&
        this.country &&
        this.email &&
        this.password
      ) {
        if (this.password === this.confirm_password) {
          this.users.push({
            username: this.username,
            lastname: this.lastname,
            avatar: this.pic,
            country: this.country,
            email: this.email,
            password: this.password,
          });
          try {
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
            console.log(this.pic)

            await axios
              .post("http://localhost:3020/register", {
                username: this.username,
                lastname: this.lastname,
                avatar: this.pic,
                country: this.country,
                email: this.email,
                password: this.password,
              })
              .then((response) => {
                var result = response.data;
                if (result != null) {
                  alert(
                    "Well done ! Please check your email to confirm your account."
                  );
                  this.$router.push("/");
                }
              })
              .catch((err) => console.log(err));
          } catch (e) {
            console.log(e);
          }
        }
      } else {
        alert(
          "Please verify your request includes a username, a lastname, a country, an email and a password"
        );
      }
    },
  },
};
</script>
<style scoped>
.validator {
  color: red;
  font-weight: bold;
}
.loginForm{
  border: 5px solid;
  border-image: linear-gradient(#f5ff2f, #914017, #fb2b02) 1;
  animation: rotate 2.5s ease-in infinite;
  background-color: white;
  opacity: 80%;
  z-index: 0;
  padding: 3em;
}
</style>
