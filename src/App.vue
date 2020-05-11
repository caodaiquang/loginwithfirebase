<template>
  <div id="app">
    <!-- <div class="row"> -->
    <!-- <div class="col-sm-12 col-xs-12"> -->
    <img src="./assets/logo.png" class="logo" />
    <!-- <router-view/> -->
    <!-- <TodoList></TodoList> -->
    <!-- </div> -->
    <!-- <FormLogin></FormLogin> -->
    <!-- <Loggedin></Loggedin> -->
    <!-- </div> --> 
    <router-view />
    
  </div>
</template>

<script>
// import TodoList from "./components/todoList";
import FormLogin from "./components/users/formLogin";
import Loggedin from "./components/users/loggedin";

export default {
  name: "App",
  components: {
    // TodoList,
    FormLogin,
    Loggedin
  },
  data() {
    return {};
  }
};
</script>

<style>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
.logo {
  display: block;
  margin: auto;
  height: 100px;
  /* padding-top: 20px; */
}

/* .container {
  margin: 0 auto;
  color: #2c3e50;
  max-width: 600px;
} */

</style>
