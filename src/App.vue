<template>
  <AsideMenu v-if="isAuth" />
  <router-view/>
</template>

<script>
import AsideMenu from '@/components/AsideMenu'

export default {
  name: 'App',
  components: {
    AsideMenu
  },
  computed: {
    isAuth () {
      return this.$store.state.auth.status.loggedIn
    }
  }
}

</script>

<style src="./style/reset.css" />
<style lang="scss" src="./style/main.scss" />
