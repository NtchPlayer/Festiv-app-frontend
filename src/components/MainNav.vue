<template>
  <nav class="main-nav">
    <router-link class="nav-item" :to="{ name: 'home' }">
      <font-awesome-icon class="nav-item-icon" icon="fa-solid fa-house" />
      <span class="nav-item-label">
        Accueil
      </span>
    </router-link>
    <router-link class="nav-item" :to="{ name: 'search' }">
      <font-awesome-icon class="nav-item-icon" icon="fa-solid fa-magnifying-glass" />
      <span class="nav-item-label">
        Recherche
      </span>
    </router-link>
    <span class="nav-item nav-item-preview">
      <font-awesome-icon class="nav-item-icon" icon="fa-solid fa-message" />
      <span class="nav-item-label">
        Messages
      </span>
      <span class="text-label">Bientôt</span>
    </span>
    <router-link v-if="$store.state.auth.status.loggedIn" class="nav-item" :to="{ name: 'profile', params: { name: $store.state.auth.user?.name } }">
      <font-awesome-icon class="nav-item-icon" icon="fa-solid fa-user" />
      <span class="nav-item-label">
        Profile
      </span>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'NavMenu'
}
</script>

<style lang="scss">
.main-nav{
  border-top: 1px solid var(--grey-light);
  position: fixed;
  width: inherit;
  bottom: 0;
  display: flex;
  background-color: var(--background-color);
  box-shadow: var(--shadow-menu);
  border-radius: var(--border-radius) var(--border-radius) 0 0;
}

.nav-item{
  display: flex;
  padding: 10px 20px;
  width: 25%;
  transition-duration: var(--transition-duration);
  align-items: center;
  flex-direction: column;
  &:first-child{
    border-radius: var(--border-radius) 0 0 0;
  }
  &:last-child{
    border-radius: 0 var(--border-radius) 0 0;
  }
  &.router-link-exact-active{
    font-weight: bold;
  }
  &:hover{
    text-decoration: none;
    background-color: var(--grey-light);
  }
  &-icon{
    margin-bottom: 10px;
  }
  &-label{
    font-size: .9rem;
  }
  &-preview{
    cursor: not-allowed;
    position: relative;
    &:hover{
      background-color: inherit;
    }
    .text-label{
      position: absolute;
      left: 0;
      top: 0;
      font-size: .7rem;
      margin: 0;
      transform: translate(0, -25%);
    }
  }
}
</style>
