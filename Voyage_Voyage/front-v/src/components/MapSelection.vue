<template>
<div class="map_wrap">
  <TravelHistory v-if="addpop" @close='closepop'/>
    <div id="map" class="map" @click="showpop()"></div> <br/>
    <form id="options-form" autocomplete="off">
      <div class="radio">
        <label>
          <input type="radio" name="interaction" value="draw" id="draw" checked>
          Point your last destination &nbsp;
        </label>
        <select name="draw-type" id="draw-type">
          <option value="Point">Point</option>
          <option value="Circle">Circle</option>
        </select>
      </div>
      <div class="radio">
        <label>
          <input type="radio" name="interaction" value="modify">
          Modify &nbsp;
        </label>
      </div>
      <div>
        <ul>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle"
              href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="ShowHistory">
              My Travel History
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="#" v-for="voyage in voyages" :key="voyage.index">{{voyage.destination}} - {{voyage.date}}</a>
              <a class="dropdown-item" href="#"  @click='popup'>{{voyage.destination}}</a>
            </div>
          </li>
        </ul>
      </div>
    </form>
</div>
<div class='pop-up' v-if='showpopup'>
        <div class="pop_header">
         <button type="button" @click='closepp'>X</button>
        </div>
    <div class='pop-body'>
      <p>{{voyage.date}}</p>
      <p> {{ voyage.destination }} </p>
    </div>
    </div>
</template>

<script >
const { v4: uuidv4 } = require('uuid')
uuidv4() // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {Draw, Modify, Select, Snap} from 'ol/interaction';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import IconPointer from '@/components/icons/IconPointer.vue';
import {composeCssTransform} from 'ol/transform';
import Layer from 'ol/layer/Layer';
import TravelHistory from '@/components/TravelHistory.vue'


export default {
name: 'MapSelection',
  components: {
    TravelHistory
  },
  props: {
      select: [],
      addpop: false
  },
  data() {
    return{
      destinations: [],
      addpop: '',
      voyage: '',
    voyages: [{
      index: uuidv4(),
      destination: '',
      date: '',
      notes: ''
    } ],
     showpopup: false,
  
    }
  },
  mounted () {
const raster = new TileLayer({
  source: new OSM(),
});

const vector = new VectorLayer({
  source: new VectorSource(),
  style: new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)',
    }),
    stroke: new Stroke({
      color: 'red',
      width: 5,
    }),
    image: new CircleStyle({
      radius: 10,
      fill: new Fill({
        color: 'red',
      }),
    }),
  }),
});

const map = new Map({
  layers: [raster, vector],
  target: 'map',
  view: new View({
    center: [0, 0],
    projection: 'EPSG:4326',
    zoom: 2,
  }),
});

const ExampleModify = {
  init: function () {
    this.select = new Select();
    map.addInteraction(this.select);

    this.modify = new Modify({
      features: this.select.getFeatures(),
    });
    map.addInteraction(this.modify);

    this.setEvents();
  },
  setEvents: function () {
    const selectedFeatures = this.select.getFeatures();

    this.select.on('change:active', function () {
      selectedFeatures.forEach(function (each) {
        selectedFeatures.remove(each);
      });
    });
  },
  setActive: function (active) {
    this.select.setActive(active);
    this.modify.setActive(active);
  },
};
ExampleModify.init();

const optionsForm = document.getElementById('options-form');

const ExampleDraw = {
  init: function () {
    map.addInteraction(this.Point);
    this.Point.setActive(false);
    map.addInteraction(this.Circle);
    this.Circle.setActive(false);
  },
  Point: new Draw({
    source: vector.getSource(),
    type: 'Point',
  }),
  Circle: new Draw({
    source: vector.getSource(),
    type: 'Circle',
  }),
  activeDraw: null,
  setActive: function (active) {
    if (this.activeDraw) {
      this.activeDraw.setActive(false);
      this.activeDraw = null;
    }
    if (active) {
      const type = optionsForm.elements['draw-type'].value;
      this.activeDraw = this[type];
      this.activeDraw.setActive(true);
    }
  },
};
ExampleDraw.init();

/**
 * Let user change the geometry type.
 * @param {Event} e Change event.
 */
optionsForm.onchange = function (e) {
  const type = e.target.getAttribute('name');
  if (type == 'draw-type') {
    ExampleModify.setActive(false);
    ExampleDraw.setActive(true);
    optionsForm.elements['interaction'].value = 'draw';
  } else if (type == 'interaction') {
    const interactionType = e.target.value;
    if (interactionType == 'modify') {
      ExampleDraw.setActive(false);
      ExampleModify.setActive(true);
    } else if (interactionType == 'draw') {
      ExampleDraw.setActive(true);
      ExampleModify.setActive(false);
    }
  }
};

ExampleDraw.setActive(true);
ExampleModify.setActive(false);

// The snap interaction must be added after the Modify and Draw interactions
// in order for its map browser event handlers to be fired first. Its handlers
// are responsible of doing the snapping.
const snap = new Snap({
  source: vector.getSource(),
});
map.addInteraction(snap);


const svgContainer = document.createElement('div');
const xhr = new XMLHttpRequest();
xhr.open('GET', 'data/world.svg');
xhr.addEventListener('load', function () {
  const svg = xhr.responseXML.documentElement;
  svgContainer.ownerDocument.importNode(svg);
  svgContainer.appendChild(svg);
});
xhr.send();

// récupération coordonées map world
svgContainer.onclick = function(e){
    e.preventDefault();
    const x = e.offsetX;
    const y = e.offsetY;
    const selector = svgContainer.innerHTML;
    svgContainer.innerHTML = `${x}, ${y}`

    console.log(`${x}, ${y}`)

if (selector != 0){

  const selectors = JSON.parse(localStorage.getItem('selecteurs')) || [];
  selectors.push(selector);
  const JsonSel = JSON.stringify(selectors)

  localStorage.setItem('selectors', JsonSel );
  localStorage.getItem('selectors')
  console.log(selectors)

  // const destination = prompt("New destination? Enter a country name ...")

  const destinations = JSON.parse(localStorage.getItem('destinations')) || [];
  destinations.push(destination)
  const JsonDest = JSON.stringify(destinations);

  localStorage.setItem('destinations', JsonDest);
  localStorage.getItem('destinations')

  console.log(destinations)
  }
}

/**
 * const pointer = localStorage.getItem('selector');
 */

const width = 2560;
const height = 1280;
const svgResolution = 360 / width;
svgContainer.style.width = width + 'px';
svgContainer.style.height = height + 'px';
svgContainer.style.transformOrigin = 'top left';
svgContainer.className = 'svg-layer';

map.addLayer(
  new Layer({
    render: function (frameState) {
      const scale = svgResolution / frameState.viewState.resolution;
      const center = frameState.viewState.center;
      const size = frameState.size;
      const cssTransform = composeCssTransform(
        size[0] / 2,
        size[1] / 2,
        scale,
        scale,
        frameState.viewState.rotation,
        -center[0] / svgResolution - width / 2,
        center[1] / svgResolution - height / 2
      );
      svgContainer.style.transform = cssTransform;
      svgContainer.style.opacity = this.getOpacity();
      return svgContainer;
    },
  })
);

  },
  methods: {
setTravelHistory(){
    this.user = localStorage.setItem('username')
    this.selector = localStorage.setItem('selector')
          //alert("Hello " + this.user + "!");
    },
 ShowHistory(){
      if (localStorage.getItem('voyages')) {
      this.voyages = JSON.parse(localStorage.getItem('voyages'))
      }
    },
    showpop () {
      this.addpop = true
    },
    closepop () {
      this.addpop = false
    },
  showpopup() {
    this.showpopup= true;
    },
    closepp (){
      this.showpopup =false;
      this.$emit('close')
    }
  }
}
   </script>

   <style scoped>
   .map_wrap{
       width: 100%;
       height: 60%;
       display: flex;
       align-items: center;
       justify-content: center;
       flex-direction: column;
       margin-bottom: 3em;
   }
    .map {
    width: 90%;
    height:800px;
    cursor: crosshair;
   }

   #options-form{
       display: inline-flex;
   }
   .nav-item a{
    text-decoration: none;
    color: rgb(108, 44, 44);
    font-size: 25px;
    font-weight: 600;
   }

   </style>