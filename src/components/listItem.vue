<template>
  <div>
    <div class="listTodo">
      <input type="checkbox" v-model="status" @change="doneEdit()" />
      <div
        v-if="!editing"
        @dblclick="editTodo()"
        class="todoItem"
        :class="{state: status}"
      >{{title}}</div>
      <input
        type="text"
        @blur="doneEdit()"
        @keyup.esc="cancelEdit()"
        @keyup.enter="doneEdit()"
        class="todoEdit"
        v-model="title"
        v-else
      />
    </div>
    <div class="removeItem" @click="removeTodo(todo.id)">&times;</div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  props: {
    todo: {
      type: Object,
      require: true
    },
    checkAll: {
      type: Boolean,
      require: true
    }
  },
  data() {
    return {
      beforTitle: "",
      id: this.todo.id,
      title: this.todo.title,
      status: this.todo.status,
      editing: this.todo.editing,
      timestamp: this.todo.timestamp,
      
    };
  },
  
  methods: {
    ...mapActions(["removeItem", "updateTodo"]),
    removeTodo(id) {
      this.removeItem(id);
    },
    editTodo() {
      this.beforTitle = this.title;
      this.editing = true;
    },
    doneEdit() {
      if (this.title.trim() == "") {
        this.title = this.beforTitle;
      }
      this.editing = false;
      this.updateTodo({
        id: this.id,
        title: this.title,
        status: this.status
        // editing: this.editing,
        // timestamp: this.timestamp,
      });
    },
    cancelEdit() {
      this.title = this.beforTitle;
      this.editing = false;
    }
  },
  watch: {
    checkAll() {
      if (this.checkAll) this.status = true;
      else this.status = this.todo.status;
    },
    todo() {
      this.status = this.todo.status;
    }
  }
};
</script>

<style scoped>
.listTodo {
  display: flex;
  align-items: center;
}
.todoItem {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
  font-size: 18px;
  /* word-break: break-all; */
}
.state {
  text-decoration: line-through;
  color: gray;
}
.removeItem {
  cursor: pointer;
  margin-left: 14px;
}
.todoEdit {
  font-size: 18px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.todoEdit:hover {
  outline: none;
}
</style>
