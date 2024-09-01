<template>
    <div>
      <h2>Posts</h2>
      <ul>
        <li v-for="post in posts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        posts: []
      };
    },
    async created() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        this.posts = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  };
  </script>
  In the code above, we first import Axios and then use the "created" lifecycle hook to fetch data from the JSON Placeholder API. We store the fetched data in the "posts" array and display it using the "v-for" directive.
  
  Step 4: Add the Posts Component to the App
  Finally, let's add the "Posts" component to the main App.vue file:
  
  <template>
    <div id="app">
      <Posts />
    </div>
  </template>
  
  <script>
  import Posts from './components/Posts.vue';
  
  export default {
    components: {
      Posts
    }
  };
  </script>