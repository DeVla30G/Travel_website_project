<template>
    <div class='pop-up' >
        <div class="pop_header">
         <button type="button"  @click="$emit('close')">Close</button>
        </div>
    <div class='pop-body'>
      <form id='voyages' contenteditable> <!--Object -->
        <input type="text" v-model="destination" v-on:submit='saveHistory' Placeholder="Destination..." > <!-- value in Object -->
        <label for="date">Date end of travel</label>
        <input name="date" v-model="date" placeholder="mm-yyyy"/>
        <textarea class="notes" v-model="notes" cols="20" wrap="hard" placeholder="Some notes for later..." > </textarea> <!-- value in Object -->
        <button class='save-button' type='submit' @click='saveHistory'> Save my memories </button>
      </form>
    </div>
    </div>
</template>

<script>
const { v4: uuidv4 } = require('uuid')
uuidv4() // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

export default {
    name: 'TravelHistory',
    data(){
        return{
            id: '',
            voyages: [{
                index: uuidv4(),
                destination: '',
                date: '',
                notes: ''
                } ],
            newTravel: ''
        }
    },
      mounted () {
    if (localStorage.getItem('voyages')) {
      this.voyages = JSON.parse(localStorage.getItem('voyages'))
    }
/*
    jSuites.calendar(document.getElementById('calendar'), {
    type: 'year-month-picker',
    format: 'MMM-YYYY',
    validRange: [ '2000-02-01', '2022-12-31' ]
});*/

  },
    watch: {
    voyages: {
      handler (newTravel) {
        console.log('new travel')
        localStorage.voyages = JSON.stringify(newTravel)
      },
      deep: true
    }
  },
   methods: {
    saveHistory () {
      const voyages = JSON.parse(localStorage.getItem('voyages')) || []
      const newTravel = { index: uuidv4(), destination: this.destination,date: this.date, notes: this.notes }
      this.voyages.push(newTravel)
      localStorage.setItem('voyages', JSON.stringify(voyages))
      localStorage.getItem('voyages')
    //this.$router.push('/profile')
      alert('Memories saved')
    },
      close() {
       this.add
      },
  }
}
</script>

<style scoped>
.pop-up{
display: flex;
flex-direction: column;
width: 20em;
height: 15em;
background-color: white;
opacity: 75%;
border: 1px solid gray;
border-radius: 10px;
position: absolute;
top: 0;
z-index: 999;
font-size: 20px;
box-shadow: 2px 3px 3px  rgb(153, 153, 173);
}
.pop-body{
display: flex;
flex-direction: column;
align-items: center;
}
#voyages{
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
font-size: 20px;
}
button{
    border-radius: 10px;
    font-size:12px;
}
.pop_header{
    display: inline-flex;
    align-items: flex-end;
}
input{
    width: 80%;
    border-radius: 5px;
    box-shadow: 2px 3px 3px  rgb(153, 153, 173);
}
textarea{
    width: 80%;
    border-radius: 5px;
    box-shadow: 2px 3px 3px  rgb(153, 153, 173);
}
</style>