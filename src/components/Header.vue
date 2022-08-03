<template>
  <header class="header-section">
    <div>
      <button v-if="buttonBackward" class="button-round" @click.prevent="$router.back()">
        <span class="button-round-icon">
          <font-awesome-icon icon="fa-solid fa-arrow-left" />
        </span>
      </button>
      <h1 class="header-title" v-text="title" />
    </div>
    <button
      v-if="button"
      class="button-round"
      :title="button.label"
      @click.prevent="$emit('emitClick')"
    >
      <span class="button-round-icon">
        <font-awesome-icon :icon="`fa-solid ${button.icon}`" />
      </span>
    </button>
  </header>
</template>

<script>
export default {
  name: 'HeaderSection',
  props: {
    title: { type: String, required: true },
    button: { type: Object, required: false },
    buttonBackward: { type: Boolean, default: true }
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
  align-items: center;
  justify-content: space-between;
  background-color: var(--header-color);
  > div{
    align-self: center;
    display: flex;
    &:first-child{
      button{
        margin-right: 20px;
      }
    }
  }
  .button-round{
    margin-right: 20px;
  }
}
.header-title{
  font-size: 1.3rem;
  align-self: center;
}
</style>
