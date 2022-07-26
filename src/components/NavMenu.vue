<template>
  <nav class="main-nav">
    <router-link class="nav-item" :to="{ name: 'home' }">
      <font-awesome-icon class="nav-item-icon" icon="fa-solid fa-house" />
      <span class="nav-item-label">
        Accueil
      </span>
    </router-link>
    <router-link class="nav-item" :to="{ name: 'home' }">
      <font-awesome-icon class="nav-item-icon" icon="fa-solid fa-magnifying-glass" />
      <span class="nav-item-label">
        Recherche
      </span>
    </router-link>
    <router-link class="nav-item" :to="{ name: 'home' }">
      <font-awesome-icon class="nav-item-icon" icon="fa-solid fa-message" />
      <span class="nav-item-label">
        Messages
      </span>
    </router-link>
    <router-link class="nav-item" :to="{ name: 'home' }">
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
  &-nav{
    //display: flex;
 }
}

.nav-item{
  display: block;
  padding: 10px 20px;
  width: 25%;
  transition-duration: var(--transition-duration);
  display: flex;
  align-items: center;
  flex-direction: column;
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
}
</style>
