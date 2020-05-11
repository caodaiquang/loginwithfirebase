<template>
  <div>
    <div class="main-div">
      <h3>Web login</h3>
      <input @keyup.enter="login()" v-model="email" type="email" placeholder="Email..." />
      <input @keyup.enter="login()" v-model="password" type="password" placeholder="PassWord..." />
      <button @click="login()">Login to Account</button>
      <button @click="submit()" class="signup">Signup to create Account</button>
      <div class="signGoogle">
        <a class="signG" @click="loginGoogle()">or Sign in with Google</a>
      </div>
      <span class="iconGoogle">
        <img src="../../assets/logoG.png" alt />
      </span>
    </div>
    <!-- <button @click="toTodo()">
      click to todo
    </button> -->
  </div>
</template>

<script>
import { firebaseApp } from "../../firebase";
import firebase from "firebase/";
// import "firebase/auth";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["signUp", "signIn", "loginGoogles"]),

    submit() {
      this.signUp({
        email: this.email,
        password: this.password
      });
    },
    login() {
      this.signIn({
        email: this.email,
        password: this.password
      });
    },
    loginGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();
      
      firebaseApp
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          this.$router.replace("/todo")
          // this.$router.push("/loggedin")
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
          console.log(user.displayName);
          this.loginGoogles(user.displayName)
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          console.log(email);
        });
    },
    // toTodo() {
    //   this.$router.replace("/todo")
    // }
  }
};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;1,200;1,300&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700&display=swap");
/* @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;1,300&display=swap"); */
body {
  font-family: "Nunito", sans-serif;
  background: #fff;
  margin: 0xp;
  padding: 0xp;
}
.iconGoogle img {
  width: 50px;
  height: 39px;
  margin: 0 auto;
  display: block;
  margin-top: 15px;
}
.signGoogle {
  width: 180px;
  display: block;
  margin: 0 auto;
}
.signGoogle .signG {
  display: block;
  text-align: center;
  margin-top: 30px;
  /* border-bottom: 1px solid; */
  cursor: pointer;
}

input,
button {
  font-family: "Nunito", sans-serif;
}
.main-div {
  width: 50%;
  margin: 0px auto;
  /* margin-top: 90px; */
  padding: 20px;
}

.main-div input {
  display: block;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  padding: 15px;
  outline: none;
  width: 100%;
  margin-bottom: 20px;
}
.main-div button {
  margin: 0 auto;
  background: #5d8ffc;
  color: #fff;
  border: 0px;
  border-radius: 5px;
  padding: 15px;
  display: block;
  width: 70%;
  cursor: pointer;
  transition: 0.3s;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  margin-bottom: 20px;
}

.main-div button:hover {
  background: #fff;
  color: #2ecc71;
  border: 1px solid #5d8ffc;
}
.main-div input:focus {
  border: 1px solid #777;
}

/* @media only screen and (max-width: 576px) {
  .main-div {
    width: 80%;
    margin: 0px auto;
    margin-top: 150px;
    padding: 20px;
  }
} */
@media only screen and (max-width: 768px) {
  .main-div {
    width: 75%;
    margin: 0px auto;
    /* margin-top: 150px; */
    padding: 20px;
  }
}
@media only screen and (max-width: 900px) {
  .main-div {
    width: 83%;
  }
}
.signup {
  margin-top: 20px;
  /* background: yellowgreen !important; */
  background: #f6acc8 !important;
}
</style>
