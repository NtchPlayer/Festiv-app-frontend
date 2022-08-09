<template>
  <router-link class="nav-item" :to="link">
    <font-awesome-icon class="nav-item-icon" :icon="icon" />
    <span class="nav-item-label" v-text="label" />
  </router-link>
</template>

<script>
export default {
  name: 'ButtonMainNav',
  props: {
    label: { type: String, required: true },
    icon: { type: String, required: true },
    link: { type: Object, required: true }
  }
}
</script>

<style lang="scss">
.nav-item{
  display: flex;
  padding: 10px 20px;
  width: calc(100% / 3);
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
}
</style>
