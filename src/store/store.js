import Vue from "vue";
import Vuex from "vuex";

import firestore from '../firebase';
import { firebaseApp } from '../firebase'
import firebase from 'firebase/'
import router from '../router'
// import infoUser from '../test'


Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    filter: "all",
    todos: [],
    email: '',
    loader: false,
  },
  getters: {
    getLoader(state) {
      return state.loader;
    },
    getInfo(state) {
      return state.email;
    },
    todosFilter(state) {
      if (state.filter == "all") {
        return state.todos;
      }
      else if (state.filter == 'action') {
        return state.todos.filter(todo => !todo.status)
      }
      else if (state.filter == 'completed') {
        return state.todos.filter(todo => todo.status)
      }
    },
    remaining(state) {
      return state.todos.filter(todo => !todo.status).length;
    },
    anyRemaining(state, getters) {
      return getters.remaining != 0;
    },
    // showClearCompleted(state) {

    // }
  },
  actions: {
    addTodo({ commit }, todo) {
      firestore.collection('todos').add({
        title: todo.title,
        status: false,
        editing: false,
        timestamp: new Date(),
      })
        .then(docRef => {
          commit('ADD_TODO', {
            id: docRef.id,
            title: todo.title,
            status: false,
            editing: false,
            timestamp: new Date(),
          });
        })
    },
    removeItem({ commit }, id) {
      firestore.collection('todos').doc(id).delete()
        .then(() => {
          commit('REMOVE_ITEM', id);
        })
    },
    checkAll({ commit }, checked) {
      firestore.collection('todos').get()
        .then(checkall => {
          checkall.forEach(doc => {
            doc.ref.update({
              status: checked
            })
              .then(() => {
                commit('CHECK_ALL', checked);
              })
          })
        })
    },
    updateFilter({ commit }, filter) {
      commit('UPDATE_FILTER', filter);
    },
    clearCompleted({ commit }) {
      firestore.collection('todos').where('status', '==', true).get()
        .then(query => {
          query.forEach(doc => {
            doc.ref.delete()
              .then(() => {
                commit('CLEAR_COMPLETED');
              })
          })
        })
    },
    getTodos({ commit }, loader) {
      commit('LOADER', true)
      firestore.collection('todos').get()
        .then(resolve => {
          console.log(resolve);
          let tempTodos = []
          resolve.forEach(doc => {
            const data = {
              id: doc.id,
              title: doc.data().title,
              status: doc.status,
              timestamp: doc.data().timestamp,
              editing: doc.data().editing,

            }
            tempTodos.push(data)
          })
          const tempTodosSorted = tempTodos.sort((a, b) => {
            return a.timestamp.seconds - b.timestamp.seconds
          })
          commit('GET_TODOS', tempTodosSorted)
          commit('LOADER', false)
          // commit('GET_EMAIL', firebaseApp.auth().currentUser.email)
        })
    },
    updateTodo({ commit }, todo) {
      firestore.collection('todos').doc(todo.id).set({
        title: todo.title,
        status: todo.status,
        // timestamp: todo.timestamp,
      }, { merge: true })
        .then(() => {
          commit('UPDATE_TODO', todo)
        })
    },
    signUp({ commit }, account) {
      commit('LOADER', true)
      const user = firebaseApp
        .auth()
        .createUserWithEmailAndPassword(account.email, account.password)
        .then(data => {
          console.log(user);
          this.email = "";
          this.password = "";
          commit('LOADER', false)
          commit('SIGN_UP', {
            email: data.user.email,
          })
          alert("create user successful!, now you can login website");
          router.push('/todo')
        })
        .catch(error => {
          commit('LOADER', false)
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    },
    signIn({ commit }, account) {
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(account.email, account.password)
        .then(data => {
          console.log(data);
          commit('SIGN_IN', {
            email: data.email
          })
          router.replace({ name: "todo" });
        }).catch(error => {
          console.log(error);
        })

      // just test, not important
      // console.log(infoUser.displayName);

    },

    getEmail({ commit }) {
      commit("GET_EMAIL", firebaseApp.auth().currentUser.email)
    },
    // autoSignIn({ commit }, payload) {
    //   commit('SIGN_IN', payload.email)
    // }  

    
    // google signIn provider
    loginGoogles({ commit }, payload) {
      commit('LOGIN_GOOGLE', payload)
      // console.log('store', payload);
    }

  },
  mutations: {
    ADD_TODO(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        status: false,
        editing: false,
        timestamp: todo.timestamp,
      });
    },
    REMOVE_ITEM(state, id) {
      var index = state.todos.findIndex(todo => todo.id == id);
      state.todos.splice(index, 1);
    },
    CHECK_ALL(state, checked) {
      state.todos.forEach(todo => todo.status = checked);
    },
    UPDATE_FILTER(state, filter) {
      state.filter = filter;
    },
    CLEAR_COMPLETED(state) {
      state.todos = state.todos.filter(todo => !todo.status)
    },
    GET_TODOS(state, todos) {
      state.todos = todos
      // state.todos = todos
      // todos = tempTodos
    },
    UPDATE_TODO(state, todo) {
      const getIndex = state.todos.findIndex(x => x.id == todo.id)
      state.todos.splice(getIndex, 1, {
        id: todo.id,
        title: todo.title,
        status: todo.status,
        editing: todo.editing,
      })
    },
    SIGN_UP(state, account) {
      state.email = account.email
    },
    SIGN_IN(state, account) {
      state.email = account
    },
    LOADER(state, loader) {
      state.loader = loader
    },
    LOGIN_GOOGLE(state, loader) {
      state.email = loader
    },
    GET_EMAIL(state, email) {
      // console.log(email, 'fkkwhiewh');
      const userName = email.split('@')
      state.email = userName[0]
    }

  },

})