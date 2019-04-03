<template>
  <div>
    <Header></Header>
    <Loading :show="loadingShow"></Loading>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/header/header'
import Loading from '@/components/loading/loading'
import {mapState} from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      show: false
    }
  },
  components: {
    Header,
    Loading
  },
  computed: {
    ...mapState([
      'loadingShow'
    ])
  }
}
</script>

<style lang="stylus">

</style>
