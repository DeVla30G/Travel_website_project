<template>
<NavBar/>
  <div class="container">
    <div class="container">
      <div class="cont_form loginForm">
        <!-- Pills content -->
        <div class="tab-content">
          <div
            class="tab-pane fade show active"
            id="pills-login"
            role="tabpanel"
            aria-labelledby="tab-login"
          >
            <form>
              <div class="table-sit" id="table-sit">Login</div>
              <!-- Email input -->
              <div class="form-group">
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Email..."
                />
              </div>

              <!-- Password input -->
              <div class="form-group">
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Password"
                />
              </div>

              <!-- 2 column grid layout -->
              <div class="row mb-4">
                <div class="col-md-6 d-flex justify-content-center">
                  <!-- Checkbox -->
                  <div class="form-check mb-3 mb-md-0">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="loginCheck"
                      checked
                    />
                    <label class="form-check-label" for="loginCheck">
                      Remember me
                    </label>
                  </div>
                </div>

                <div class="col-md-6 d-flex justify-content-center">
                  <!-- Simple link -->
                  <a href="#!">Forgot password?</a>
                </div>
              </div>

              <!-- Submit button -->
              <button
                @click="login"
                type="submit"
                class="btn btn-outline-dark"
              >
                Login
              </button>

              <!-- Register buttons -->
              <div class="text-center">
                <p>
                  Not a member?
                  <router-link :to="'/register'">Register</router-link>
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
const axios = require("axios");
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'

export default {
  name: "login",
    components: {
    NavBar,
    FooterBar
  },
  data: () => {
    return {
      email: "",
      password: "",
      user: "",
    };
  },
  methods: {
    login(event) {
      event.preventDefault();
      axios
        .post("http://localhost:3020/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response.data.username);
          console.log(response.data.id);
          console.log(response.data.jwt);

          const token = response.data.jwt;
          const user_id = response.data.id;
          const username = response.data.username;
          const role = response.data.role;

          localStorage.setItem("token", token);
          localStorage.setItem("user_id", user_id);
          localStorage.setItem("username", username);
          localStorage.setItem("role", role);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.cont_form{
  border: 5px solid;
  border-image: linear-gradient(#f5ff2f, #914017, #fb2b02) 1;
  animation: rotate 2.5s ease-in infinite;
  background-color: white;
  opacity: 80%;
  z-index: 0;
  padding: 3em;
}
</style>