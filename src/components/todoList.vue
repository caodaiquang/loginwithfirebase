<template>
  <div class="todolist container">
    <h2 class="headertodo">My todos list</h2>
    <p> user :{{getInfo}}</p>
    <input
      v-model="newTodo"
      @keyup.enter="addTodos"
      class="inputTodo"
      type="text"
      placeholder="What needs to be done"
    />
    <ListItem
      class="todoItems"
      v-for="todo in todosFilter"
      :key="todo.id"
      :todo="todo"
      :checkAll="!anyRemaining"
    ></ListItem>
    <div class="checkall">
      <div>
        <CheckAll></CheckAll>
      </div>
      <div>
        <TodoItemRemaining></TodoItemRemaining>
      </div>
    </div>
    <div class="checkall">
      <TodoFiltered></TodoFiltered>
      <ClearCompleted></ClearCompleted>
    </div>
    <div class="loader" v-if="getLoader"></div>
    <button class="logout" @click="logout()">logOut</button>
  </div>
</template>

<script>
import { firebaseApp } from "../firebase";
import ListItem from "./listItem";
import CheckAll from "./checkAll";
import TodoItemRemaining from "./todoItemRemaining";
import TodoFiltered from "./todoFiltered";
import ClearCompleted from "./clearCompleted";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  components: {
    ListItem,
    CheckAll,
    TodoFiltered,
    TodoItemRemaining,
    ClearCompleted
  },
  data() {
    return {
      newTodo: ""
    };
  },
  computed: {
    ...mapGetters(["todosFilter", "anyRemaining", "getInfo", "getLoader", "getInfo"])
  },
  methods: {
    ...mapActions([
      "addTodo",
      // 'getTodos',
      // "getEmail"
    ]),
    addTodos() {
      if (this.newTodo.trim() == 0) {
        return;
      }
      this.addTodo({
        title: this.newTodo
      });
      this.newTodo = "";
    },
    logout() {
      try {
        const data = firebaseApp.auth().signOut();
        console.log(data);
        console.log("logOut success !!!");
        this.$router.replace("/");
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.$store.dispatch("getTodos");
    this.$store.dispatch("getEmail");
  }
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.todolist {
  margin: 0 auto;
  color: #2c3e50;
  max-width: 600px;
}

.loader {
  width: 35px;
  height: 35px;
  border: 5px solid;
  color: #3498db;
  border-radius: 50%;
  border-top-color: transparent;
  animation: loader linear infinite;
  /* justify-content: center; */
  margin: 0 auto;
  animation: loader 1.2s linear infinite;
}
@keyframes loader {
  25% {
    color: #2ecc71;
  }
  50% {
    color: #f1c40f;
  }
  75% {
    color: #e74c3c;
  }
  to {
    transform: rotate(360deg);
  }
}
.inputTodo {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
  /* display: flex; */
}
.inputTodo:focus {
  outline: 0;
}
.todoItems {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
  /* width: 100%; */
  /* height: 100%; */
}
.checkall {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid lightgrey;
  padding-top: 15px;
}
.headertodo {
  display: block;
  margin: 20px auto;
}

.logout {
  width: 100%;
  margin-top: 20px;
  height: 50px;
  background-color: #5d8ffc;
  cursor: pointer;
  border-radius: 5px;
}
.logout:hover {
  background: #fff;
  color: #5d8ffc;
}
</style>
