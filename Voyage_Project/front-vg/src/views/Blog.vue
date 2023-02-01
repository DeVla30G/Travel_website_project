<template>
<NavBar/>
<div class="page">
<div class="loader">
        <span class="letter">C</span>
        <span class="letter">O</span>
        <span class="letter">M</span>
        <span class="letter">I</span>
        <span class="letter">N</span>
        <span class="letter">G</span>
        <span class="let">____</span>
        <span class="letter">S</span>
        <span class="letter">O</span>
        <span class="letter">O</span>
        <span class="letter">N</span>

    </div>
<h1>Travel Blog</h1>
<div class="container ">
    <h1 class="mt-5 mb-5">Never stop exploring</h1>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio provident ea laudantium officiis ab, delectus nam sint, quos enim ipsum praesentium aut cupiditate similique, accusantium nihil optio ad velit ullam!</p>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio provident ea laudantium officiis ab, delectus nam sint, quos enim ipsum praesentium aut cupiditate similique, accusantium nihil optio ad velit ullam!</p>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio provident ea laudantium officiis ab, delectus nam sint, quos enim ipsum praesentium aut cupiditate similique, accusantium nihil optio ad velit ullam!</p>
</div>
<div class="containercards">
        <div class="card" >
          <div class="card__header"></div>
          <div class="card__body">
          <h3></h3>
         <img
                src="../assets/images/grotte.jpg"
                alt=""

                style="height: 450px; width: 450px"
              />
            </div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio provident ea laudantium officiis ab, delectus nam sint, quos enim ipsum praesentium aut cupiditate similique, accusantium nihil optio ad velit ullam!</p>
            <div class="card__footer">
              <div style="display: inline" class="user__info">
                <div>
                  <button
                      href="#"
                      type="button"
                      id="crud"
                      class="btn btn-outline-dark"
                    >
                      Read More...
                    </button>
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="card" >
          <div class="card__header"></div>
          <div class="card__body">
          <h3></h3>
         <img
                src="../assets/images/savane.jpg"
                alt=""

                style="height: 450px; width: 450px"
              />
            </div>
            <div class="card__footer">
              <div style="display: inline" class="user__info">
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio provident ea laudantium officiis ab, delectus nam sint, quos enim ipsum praesentium aut cupiditate similique, accusantium nihil optio ad velit ullam!</p>
                <div>
                  <button
                      href="#"
                      type="button"
                      id="crud"
                      class="btn btn-outline-dark"
                    >
                      Read More...
                    </button>
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="card" >
          <div class="card__header"></div>
          <div class="card__body">
          <h3></h3>
         <img
                src="../assets/images/trip.jpg"
                alt=""

                style="height: 450px; width: 450px"
              />
            </div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio provident ea laudantium officiis ab, delectus nam sint, quos enim ipsum praesentium aut cupiditate similique, accusantium nihil optio ad velit ullam!</p>
            <div class="card__footer">
              <div style="display: inline" class="user__info">
                <div>
                  <button
                      href="#"
                      type="button"
                      id="crud"
                      class="btn btn-outline-dark"
                    >
                      Read More...
                    </button>
                  >
                </div>
              </div>
            </div>
          </div>
  </div>
</div>
<FooterBar/>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'
export default {
name: 'Blog',
components: {
  NavBar,
  FooterBar
}
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap");

.page{
  text-align: center;
}
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
  width: 500px;
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

p{
    padding: 2em;
}

.container{

    border-radius:10px;
    background-color: white;
    opacity: 0.8;
}
/**loader*/
.letter {
    color: #484848;
    font-size: 50px;
    font-family: "Candara";
    font-weight: 30%;
    letter-spacing: 15px;
    animation: flash 1.5s linear infinite;
}

@keyframes flash {
    0% {
        color: #fff900;
        text-shadow: 0 0 7px #fff900;
    }
    90% {
        color: #484848;
        text-shadow: none;
    }
    100% {
        color: #fff900;
        text-shadow: 0 0 7px #fff900;
    }
}

.letter:nth-child(1) {
    animation-delay: 0.1s;
}

.letter:nth-child(2) {
    animation-delay: 0.2s;
}

.letter:nth-child(3) {
    animation-delay: 0.3s;
}

.letter:nth-child(4) {
    animation-delay: 0.4s;
}

.letter:nth-child(5) {
    animation-delay: 0.5s;
}

.letter:nth-child(6) {
    animation-delay: 0.6s;
}

.letter:nth-child(7) {
    animation-delay: 0.7s;
}
.letter:nth-child(8) {
    animation-delay: 0.8s;
}
.letter:nth-child(9) {
    animation-delay: 0.9s;
}
.letter:nth-child(10) {
    animation-delay: 1s;
}
.letter:nth-child(11) {
    animation-delay: 1.1s;
}
.let{
  color: transparent;
}


/*loader*/

.loader {
    display: flex;
    background-color: beige;
    opacity: 80%;
    width:50%;
    justify-items: center;
    padding-left: 12em;
}
</style>