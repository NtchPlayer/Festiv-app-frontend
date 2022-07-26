<template>
  <div class="container-profile-picture">
<!--    <router-link :to="{ name: 'profile', params: { user: name } }">-->
    <a href="/">
      <img
        class="profile-picture"
        alt="Photo de profile de l'utilisateur"
        :src="require('@/assets/default-profile-picture.jpg')"
      >
    </a>
<!--    </router-link>-->
  </div>
</template>

<script>
export default {
  name: 'ProfilePicture',
  props: {
    src: { type: String, default: '@/assets/default-profile-picture.jpg' },
    name: { type: String, required: true }
  }
}
</script>

<style lang="scss">
.container-profile-picture{
  width: 45px;
  min-width: 45px;
  max-width: 45px;
  height: 45px;
  min-height: 45px;
  max-height: 45px;
  border-radius: 50%;
  overflow: hidden;
}

.profile-picture{
  display: block;
  object-fit: contain;
  width: 100%;
  transition-duration: var(--transition-duration);
  &:hover{
    filter: brightness(.8);
  }
}
</style>
