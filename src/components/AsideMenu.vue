<template>
  <aside class="main-aside">
    <nav class="main-aside-nav">
      <router-link class="aside-nav-item" :to="{ name: 'home' }">
        <font-awesome-icon class="nav-item-icon" icon="fa-solid fa-bullhorn" />
      </router-link>
      <router-link class="aside-nav-item" :to="{ name: 'home' }">
        <font-awesome-icon class="nav-item-icon" icon="fa-solid fa-house" />
        <span class="nav-item-label">
          Accueil
        </span>
      </router-link>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'AsideMenu'
}
</script>

<style lang="scss">
.main-aside{
  width: 275px;
  position: absolute;
  margin: 30px;
  &-nav{
    //display: flex;
 }
}

.aside-nav-item{
  display: block;
  padding: 20px 30px;
  transition-duration: var(--transition-duration);
  border-radius: 100px;
  display: flex;
  align-items: center;
  &:hover{
    text-decoration: none;
    background-color: var(--grey-light);
  }
}

.nav-item-icon{
  margin-right: 10px;
}

.nav-item-label{
  font-size: 1.3rem;
}
</style>
