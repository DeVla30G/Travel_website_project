import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CountryView from '../views/CountryView.vue'
import CrudUsers from '../views/Admin/Users/CrudUsersView'
import CrudDetailUser from '../views/Admin/Users/CrudDetailUser'
import CrudUpdateUser from '../views/Admin/Users/CrudUpdateUser'
import CrudTrips from '../views/Admin/Trips/CrudTripsView'
import CrudUpdateTrip from '../views/Admin/Trips/CrudUpdateTrip'
import CrudDetailTrip from '../views/Admin/Trips/CrudDetailTrip'
import CrudActivitiesView from '../views/Admin/Activities/CrudActivitiesView'
import CrudDetailActivity from '../views/Admin/Activities/CrudDetailActivity'
import AccueilCrud from '../views/Admin/AccueilCrud'
import OneCountry from '../views/OneCountry.vue'
import Travels from '../views/Travels'
import login from '../views/user/login'
import register from '../views/user/register'
import profile from '../views/user/profile'
import UpdateUser from '../views/user/UpdateUser'
import CityView from '../views/CityView.vue'
import FilterResult from '../views/FilterResult.vue'
import UpdateMyTrip from '../views/Trips/UpdateMyTrip'
import ViewMyTrip from '../views/Trips/ViewMyTrip'
import Activities from '../views/Activities'
import ViewMyActivity from '../views/Activities/ViewMyActivity'
import AllActivities from '../views/AllActivities'
import CommentsRates from '../views/CommentsRates'
import ModalActivities from '../views/ModalActivities'
import AddActivity from '../views/AddActivity'
import CrudComments from '../views/Admin/Comments/CrudComments.vue'
import CommentsDetail from '../views/Admin/Comments/CommentsDetail.vue'
import CommentsModerate from '../views/Admin/Comments/CommentsModerate.vue'
import termsAndConditions from '../views/termsAndConditions.vue'
import AllTravels from '../views/AllTravels'
import MostLikedAct from '../views/MostLikedAct'
import Blog from '../views/Blog.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/countries',
    name: 'countries',
    component: CountryView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/CrudUsers',
    name: 'CrudUsers',
    component: CrudUsers
  },
  {
    path: '/CrudDetailUser/:id',
    name: 'CrudDetailUser',
    component: CrudDetailUser
  },
  {
    path: '/CrudUpdateUser/:id',
    name: 'CrudUpdateUser',
    component: CrudUpdateUser
  },
  {
    path: '/CrudUpdateTrip/:id',
    name: 'CrudUpdateTrip',
    component: CrudUpdateTrip
  },
  {
    path: '/CrudDetailTrip/:id',
    name: 'CrudDetailTrip',
    component: CrudDetailTrip
  },
  {
    path: '/CrudTrips',
    name: 'CrudTrips',
    component: CrudTrips
  },
  {
    path: '/CrudDetailActivity/:id',
    name: 'CrudDetailActivity',
    component: CrudDetailActivity
  },
  {
    path: '/CrudActivitiesView',
    name: 'CrudActivitiesView',
    component: CrudActivitiesView
  },
  {
    path: '/AccueilCrud',
    name: 'AccueilCrud',
    component: AccueilCrud
  },
  {
    path: '/country/:Code',
    name: 'OneCountry',
    component: OneCountry
  },
  {
    path: '/Travels',
    name: 'Travels',
    component: Travels
  },
  {
    path: '/city/:id',
    name: 'city',
    component: CityView
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/profile',
    name: 'profile',
    component: profile
  },
  {
    path: '/UpdateUser',
    name: 'UpdateUser',
    component: UpdateUser
  },
  {
    path: '/UpdateMyTrip/:id',
    name: 'UpdateMyTrip',
    component: UpdateMyTrip
  },
  {
    path: '/ViewMyTrip/:id',
    name: 'ViewMyTrip',
    component: ViewMyTrip
  },
  {
    path: '/Activities',
    name: 'Activities',
    component: Activities
  },
  {
    path: '/ViewMyActivity/:id',
    name: 'ViewMyActivity',
    component: ViewMyActivity
  },
  {
    path: '/result',
    name: 'result',
    component: FilterResult
  },
  {
    path: '/AllActivities',
    name: 'AllActivities',
    component: AllActivities
  },
  {
    path: '/AllTravels',
    name: 'AllTravels',
    component: AllTravels
  },
  {
    path: '/CommentsRates/:id',
    name: 'CommentsRates',
    component: CommentsRates
  },
  {
    path: '/ModalActivities/:id',
    name: 'ModalActivities',
    component: ModalActivities
  },
  {
    path: '/AddActivity/:id',
    name: 'AddActivity',
    component: AddActivity
  },
  {
    path: '/CrudComments',
    name: 'CrudComments',
    component: CrudComments
  },
  {
    path: '/CommentsDetail/:id',
    name: 'CommentsDetail',
    component: CommentsDetail
  },
  {
    path: '/CommentsModerate/:id',
    name: 'CommentsModerate',
    component: CommentsModerate
  },
  {
    path: '/termsandconditions',
    name: 'terms_conditions',
    component: termsAndConditions
  },
  {
    path: '/MostLikedAct',
    name: 'MostLikedAct',
    component: MostLikedAct
  },
  {
    path: '/Blog',
    name: 'Blog',
    component: Blog
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
