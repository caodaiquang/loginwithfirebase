<template>
  <div>
    <button :class="{active : filter == 'all'}" @click="changeFilter('all')">All</button>
    <button :class="{active : filter == 'action'}" @click="changeFilter('action')">Action</button>
    <button :class="{active : filter == 'completed'}" @click="changeFilter('completed')">Completed</button>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    filter() {
      return this.$store.state.filter;
    }
  },
  methods: {
    ...mapActions(["updateFilter"]),
    changeFilter(filter) {
      // this.$store.commit('updateFilter', filter);
      this.updateFilter(filter);
    }
  }
};
</script>

<style scoped>
.active {
  background-color: aqua;
  /* border-radius: 50%; */
}
</style>
