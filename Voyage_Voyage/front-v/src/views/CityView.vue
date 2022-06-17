<template>
<div>
<NavBar/>
<div class="cities_wrap" >
<ul class="card-city-wrap per" >
  <li class="card-city">
    <img src='https://oudormirtop.com/wp-content/uploads/2021/04/oudormiradubrovnik-785x523.jpg' alt='doubrovnik'>
    <h3><a href="">A Super Wonderful Headline</a></h3>
    <p>{{ city.Name }} The most beatiful views from {{country.Name}}</p>
  </li>
</ul>
</div>
</div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
    name: 'CityView',
    components: {
        NavBar
    },
    data () {
        return {
            city: []
        }
    },
    mounted () {
       axios
        .get(`http://localhost:3020/cities/` + this.$route.params.ID, {})
        .then((response) => {
            console.log(response.data);
            this.city = response.data;
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }

}
</script>