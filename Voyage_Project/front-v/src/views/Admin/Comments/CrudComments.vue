<template>
<div>
  <div class="container">
    <div v-if="this.token == null"><h1>Please login first</h1></div>

    <div v-if="this.token !== null" class="container shadow-lg p-3 mb-1 rounded">
      <div v-if="this.role == 'admin'">
        <router-link to="/AccueilCrud">
            <button href="#" type="button" id="crud" class="btn btn-outline-dark">
                  Back </button></router-link>
        <h1 class="comments-wrap">Comments Admin panel</h1>
        <div class="container-comm">
       <table>
           <thead>
               <tr >
                <td class="entete"> id comments</td>
                <td class="entete">id user</td>
                <td class="entete"> content</td>
                <td class="entete">activity_id</td>
                <td class="entete">Publication date</td>
                <td class="entete">Updated at</td>
                <td class="entete"> Photo </td>
                <td colspan="3" class="entete"> Actions</td>
               </tr>
           </thead>
           <tbody>
            <tr v-for='comment in comments' :key='comment.id'>
                <td > {{ comment.id }} </td>
                <td> {{ comment.user_id }} </td>
                <td> {{ comment.text }} </td>
                <td> {{ comment.activity_id }} </td>
                <td> {{ comment.created_at }} </td>
                <td> {{ comment.update_at }} </td>
                <td> <img :src='comment.image' width="200"
                  class="rounded" style="width:200px; height:auto"/></td>
                <td>    <router-link :to="{ name: 'CommentsDetail', params: { id: comment.id } }">
                    <button href="#" type="button" id="crud" class="see-details">
                        See details
                      </button></router-link> 
                </td>
                <td> <router-link :to="{ name: 'CommentsModerate', params: { id: comment.id } }">
                    <button href="#" type="button" id="crud" class="moderate-btn">
                        Moderation 
                      </button></router-link> 
                 </td>
                <td> 
                <button class="delete-btn" v-on:click.prevent="deletecomment(comment)" type="button">
                      Delete
                 </button> </td>
            </tr>
           </tbody>
       </table>
    </div>
  </div>
    </div>
  </div>
</div>  
</template>

<script>
import axios from 'axios'

export default{
    name: 'CrudComments',
    props: {
        id: '',
        user_id: '',
        text: '',
        activity_id: '',
        created_at: ''
    },
    data () {
        return{
            comments: '',
            token: '',
            role: ''
        }
    },
  mounted() {
    this.token = localStorage.getItem("token");
    this.role = localStorage.getItem("role");
    axios
      .get("http://localhost:3020/comment")
      .then((response) => {
        console.log(response.data);
        this.comments = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods:{
  changeDate () {
    const date_creation = "";
  }, 
      deletecomment(comment) {
      this.token = localStorage.getItem("token");
      this.role = localStorage.getItem("role");
      console.log(comment);
      if (confirm("Delete this comment ?")) {
        axios
          .delete("http://localhost:3020/comment/" + comment.id, {})
          .then((response) => {
            console.log(this.id);
            this.comments = response.data;
            console.log(response.data);
          location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

  }
}

</script>


<style scoped>
.container{
  width:180%;
}
table{
    border: 2px solid brown;
    min-width: 50%;

}
thead{
     border: 2px solid brown;
}
tbody{
     border: 2px solid brown;
}
.entete{
  font-weight: 600 ;
  text-transform: uppercase;
  text-align: center;
  background-color: rgb(153, 143, 143) ;
  opacity: 50%;
  color: black;
}
td{
    border: 2px solid brown;
    height: auto;
    padding: .5em;
    text-align: center;
}
.delete-btn{
  background-color: rgb(245, 69, 69);
}
.see-details{
  background-color: rgb(132, 247, 166);
}
.moderate-btn {
  background-color: rgb(250, 208, 24);
}

</style>