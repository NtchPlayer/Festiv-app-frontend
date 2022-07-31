<template>
  <router-link
    :to="{name: 'search', query: { name: festival.name, q: undefined, hashtag: undefined}}"
    class="festival-item item-container"
  >
    <span class="festival-title" v-text="festival.username" />
    <span class="profile-name" v-text="`@${festival.name}`" />
    <span class="profile-tags-container">
      <span
        v-for="tag of festival.tags"
        :key="tag.id"
        class="text-label"
        v-text="tag.content"
      />
    </span>
  </router-link>
</template>

<script>
export default {
  name: 'FestivalItem',
  props: {
    festival: { type: Object, required: true }
  }
}
</script>

<style lang="scss">
.festival-item{
  display: block;
  color: inherit;
  cursor: pointer;
  border-bottom: 1px solid var(--grey-light);
  transition-duration: var(--transition-duration);
  &:hover{
    background-color: var(--hover-color);
    text-decoration: none;
  }
  &:first-child{
    border-top: 1px solid var(--grey-light);
  }
  .festival-title{
    font-size: 1.2rem;
    margin-bottom: 5px;
    display: block;
    font-weight: bold;
  }
  .profile-tags-container{
    display: block;
    margin: 10px 0;
  }
}
</style>
