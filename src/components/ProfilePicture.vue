<template>
  <div class="container-profile-picture">
    <router-link :to="{ name: 'profile', params: { user: name } }">
      <img
        class="profile-picture"
        alt="Photo de profile de l'utilisateur"
        :src="src"
      >
    </router-link>
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
