<template>
  <div>
    {{ remaining }} items left
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
      remaining(){
          return this.$store.getters.remaining;
      } 
  },
}
</script>

<style scoped>

</style>
