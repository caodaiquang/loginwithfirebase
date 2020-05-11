// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { store } from './store/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
// import { routes } from './router'  
import router from './router'
import { firebaseApp } from './firebase'





Vue.config.productionTip = false
/* eslint-disable no-new */



// firebaseApp.auth().onAuthStateChanged(user => {
//   if (true) {
//     // console.log('logined'); 
//     new Vue({
//       el: '#app',
//       router,
//       store: store,
//       components: { App },
//       template: '<App/>',
//     })
//   }

// })

new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>',
  created() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push("/todo")
      }
    })
  },
})



