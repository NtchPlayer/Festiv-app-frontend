<template>
  <nav class="main-nav">
    <ButtonMainNav
      label="Accueil"
      icon="fa-solid fa-house"
      :link="{ name: 'home' }"
    />
    <ButtonMainNav
      label="Recherche"
      icon="fa-solid fa-magnifying-glass"
      :link="{ name: 'search' }"
    />
    <ButtonMainNav
      v-if="$store.state.auth.status.loggedIn"
      label="Profil"
      icon="fa-solid fa-user"
      :link="{ name: 'profile', params: { name: $store.state.auth.user?.name } }"
    />
  </nav>
</template>

<script>
import ButtonMainNav from '@/components/buttons/ButtonMainNav'

export default {
  name: 'NavMenu',
  components: { ButtonMainNav }
}
</script>

<style lang="scss">
.main-nav{
  border-top: 1px solid var(--grey-light);
  position: sticky;
  width: 100%;
  bottom: 0;
  display: flex;
  background-color: var(--background-color);
  box-shadow: var(--shadow-menu);
  border-radius: var(--border-radius) var(--border-radius) 0 0;
}
</style>
