<template>
  <div>
    <input id="checkall" type="checkbox" :checked="!anyRemaining" @click="checkAlls">
    <label for="checkall"> Check All </label>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
     
    }
  },  
  computed: {
    ...mapGetters([
      'anyRemaining',
    ]),
  },
  methods: {
    ...mapActions([
      'checkAll',

    ]),
      checkAlls(){
        // this.$store.commit('checkAll', event.target.checked);
        this.checkAll(event.target.checked)
      }
  }
}
</script>

<style scoped>

</style>
