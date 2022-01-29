<template>
  <div class="home">
    <button  @click="showMessageForm = !showMessageForm" type="button" class="btn btn-warning mt-3 mb-3">Toggle Message Form</button>
    <form v-if="showMessageForm" @submit.prevent="addMessage" class="mb-3">
      <div v-if="error" class="alert alert-dismissible alert-warning">
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      <h4 class="alert-heading">Error!</h4>
      <p class="mb-0">{{error}}</p>
      </div>
  <div class="mb-3">
    <label for="username" class="form-label">Username</label>
    <input v-model="message.username" type="text" class="form-control" id="username" value="anonymous" aria-describedby="emailHelp" required>
  </div>
  <div class="mb-3">
    <label for="subject" class="form-label">Subject</label>
    <input v-model="message.subject" type="text" class="form-control" id="subject" placeholder="Enter a subject..." required>
  </div>
  <div class="mb-3">
    <label for="message" class="form-label">Message</label>
    <input v-model="message.message" type="text" class="form-control" id="message" placeholder="Enter a message..." required>
  </div>
  <div class="mb-3">
    <label for="imageURL" class="form-label">Image URL</label>
    <input v-model="message.imageURL" type="url" class="form-control" id="imageURL" placeholder="Enter an Image URL..." required>
  </div>
  <button type="submit" class="btn btn-primary">Add Message</button>
</form>
  <div class="list-unstyled"  v-for="message in reverseMessages" :key="message._id">
  <li class="media">
    <img v-if="message.imageURL" :src="message.imageURL" class="mr-3" :alt="message.subject">
    <div class="media-body">
      <h4 class="mt-0 mb-1">{{message.username}}</h4>
      <h5 class="mt-0 mb-1">{{message.subject}}</h5>
      {{message.message}}
      <br>
      <small>{{message.created}}</small>
    </div>
  </li>
  <hr>
  </div>
  </div>
</template>

<script>
const API_URL = "http://localhost:1337/messages";
export default {
  name: 'Home',
  data: () => ({
    showMessageForm: false,
    error: '',
    messages: [],
    message: {
      username: 'Anonymous',
      subject: '',
      message: '',
      imageURL: '',
    }
  }), 
  computed: {
    reverseMessages() {
      return this.messages.slice().reverse();
    }
  },
  mounted() {
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      this.messages = data
    })
  },
  methods: {
    addMessage(){
      console.log(this.message);
      fetch(API_URL ,{
        method: 'POST',
        body: JSON.stringify(this.message),
        headers: {
          'content-type': 'application/json'
        }
      }).then(res => res.json())
    .then(data => {
      if(data.details){
        const error = data.details.map(detail => detail.message).join(" . ");
        this.error = error;
        console.log(error)
      }else{
        this.error = '';
        this.showMessageForm = false;
      this.messages.push(data);
      }
    })
    }
  }
};
</script>

<style>
  img{
    max-width: 300px;
    height: auto;
    margin: 5px;
  }
  
  li{
    display: flex;
  }
</style>