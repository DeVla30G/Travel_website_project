<template>

  <GMapMap
    :center="center"
    :zoom="10"
    map-type-id="terrain"
    style="width: 100vw; height: 20rem"
  >
    <GMapCluster :zoomOnClick="true">
      <GMapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />
    </GMapCluster>
  </GMapMap>

</template>

<script>
import {GMapMap, GMapCluster, GMapMarker} from '@fawmi/vue-google-maps'
export default {
  name: 'GoogleMap',
  components: {GMapMap, GMapCluster, GMapMarker },
  data() {
    return {
      center: { lat: 25.2711, lng:  55.3075 },
      markers: [
        {
          position: {
            lat: 25.2711,
            lng: 55.3075 ,
          },
        },
        {
          position: {
            lat:25.3245,
            lng: 55.3913,
          },
        },
        {
          position: {
            lat: 24.3815,
            lng: 54.523,
          },
        },
        {
          position: {
            lat: 23.3815,
            lng: 54.780,
          },
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>