<template>
  <div class="user-infos">
    <ProfilePicture name="IcePlayer" />
    <div>
      <span class="user-infos-username" v-text="$store.state.auth.user.username" />
      <span class="user-infos-email" v-text="$store.state.auth.user.email" />
    </div>
  </div>
</template>

<script>
import ProfilePicture from '@/components/ProfilePicture'

export default {
  name: 'UserInfos',
  components: {
    ProfilePicture
  }
}
</script>

<style lang="scss">

</style>
