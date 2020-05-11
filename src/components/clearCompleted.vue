<template>
  <div>
    <button @click="clearC()">Clear Completed</button>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
     
    }
  },
  methods: {
    ...mapActions({
      clearC: 'clearCompleted'
    }),
    // clearC(){
    //   // this.clearCompleted
    //   // console.log('click');
    //   this.$store.dispatch('clearComoleted')
    // }
  }
}
</script>

<style scoped>

</style>
