<template>
  <div class="logout">
    <h3>Welcome User</h3>
    <p>Welcome to firebase login example</p>
    <button @click="signOut()">logout</button>
  </div>
</template>

<script>
import { firebaseApp } from "../../firebase";


export default {
  data() {
    return {};
  },
  methods: {
    signOut() {
      try {
        const data = firebaseApp.auth().signOut();
        console.log(data);
        this.$router.replace({name: "home"})
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>

<style scoped>
.logout {
  /* display: block; */
  margin: 0 auto;
}

button {
  background: #5d8ffc;
  color: #fff;
  border: 0px;
  border-radius: 5px;
  padding: 15px;
  display: block;
  width: 50%;
  cursor: pointer;
  transition: 0.3s;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
}

button:hover {
  background: #fff;
  color: #5d8ffc;
  border: 1px solid #5d8ffc;
}
</style>