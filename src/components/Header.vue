<template>
  <header class="header-section">
    <h1 class="main-title" v-text="title" />
    <button
      v-if="button"
      class="button-round"
      :title="button.label"
      @click.prevent="$emit('emitClick')"
    >
      <font-awesome-icon :icon="`fa-solid ${button.icon}`" />
    </button>
  </header>
</template>

<script>
export default {
  name: 'HeaderSection',
  props: {
    title: { type: String, required: true },
    button: { type: Object, required: false }
  }
}
</script>

<style lang="scss">
.header-section{
  padding: 10px 20px;
  position: sticky;
  z-index: 7;
  top: 0;
  display: flex;
  justify-content: space-between;
  background-color: var(--header-color);
}
</style>
