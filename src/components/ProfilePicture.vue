<template>
  <div class="container-profile-picture" :class="{ 'profile-picture-large': largeIcon }">
<!--    <router-link :to="{ name: 'profile', params: { user: name } }">-->
    <a href="/">
      <figure>
        <img
          class="profile-picture"
          alt="Photo de profile de l'utilisateur"
          :src="require('@/assets/default-profile-picture.jpg')"
        >
      </figure>
    </a>
<!--    </router-link>-->
  </div>
</template>

<script>
export default {
  name: 'ProfilePicture',
  props: {
    src: { type: String, default: '@/assets/default-profile-picture.jpg' },
    name: { type: String, required: true },
    largeIcon: { type: Boolean, default: false }
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
  &-large{
    width: 100px;
    min-width: 100px;
    max-width: 100px;
    height: 100px;
    min-height: 100px;
    max-height: 100px;
  }
  &:hover{
    filter: brightness(.8);
  }
}
</style>
