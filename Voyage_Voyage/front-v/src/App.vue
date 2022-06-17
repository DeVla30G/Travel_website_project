<template>
  <router-view/>
</template>

<style>
@import '@/assets/base.css';
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap");
body{
  background: no-repeat center center fixed url("assets/background-travel.png");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  width: 100%;
  height: 100%;
  overflow: scroll;
  font-family: 'Quicksand', Georgia, 'Times New Roman', Times, serif;
}
#app{

  width:100%;
  height:100%;
  font-size: 20px;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}
@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }
}
</style>
