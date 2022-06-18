import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueGoogleMaps from "@fawmi/vue-google-maps";
createApp(App).use(store).use(router).use(VueGoogleMaps, {
    load: {
      key: "AIzaSyAcDpk5mLvm673YPo2xgd-Oa4chrXIE7gY"
    }
  }).mount('#app')

