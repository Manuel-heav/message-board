<template>
  <div class="home">
    <form>
  <div class="mb-3">
    <label for="username" class="form-label">Username</label>
    <input type="text" class="form-control" id="username" value="anonymous" aria-describedby="emailHelp" required>
  </div>
  <div class="mb-3">
    <label for="subject" class="form-label">Subject</label>
    <input type="text" class="form-control" id="subject" placeholder="Enter a subject..." required>
  </div>
  <div class="mb-3">
    <label for="message" class="form-label">Message</label>
    <input type="text" class="form-control" id="message" placeholder="Enter a message..." required>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
  <div class="list-unstyled"  v-for="message in messages" :key="message._id">
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
    messages: [],
  }), 
  mounted() {
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      this.messages = data
    })
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