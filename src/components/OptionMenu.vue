<template>
  <div class="options-menu-container">
    <button class="button-round" type="button" @click.prevent="optionsMenu = true">
      <font-awesome-icon icon="fa-solid fa-ellipsis" />
    </button>
    <div v-show="optionsMenu" class="options-menu-button-container">
      <button
        v-for="(action, i) of actions"
        :key="i"
        class="options-menu-button"
        :class="action.class"
        type="button"
        @click.prevent="emitFunction(action.function)"
      >
        <font-awesome-icon class="options-menu-button-icon" :icon="action.icon" />
        <span class="options-menu-button-label" v-text="action.label" />
      </button>
    </div>
    <div v-show="optionsMenu" class="options-menu-mask" @click.prevent="optionsMenu = false"/>
  </div>
</template>

<script>
export default {
  name: 'OptionMenu',
  props: {
    actions: { type: Array, required: true }
  },
  data () {
    return {
      optionsMenu: false
    }
  },
  methods: {
    emitFunction (value) {
      this.optionsMenu = false
      this.$emit(value)
    }
  }
}
</script>

<style lang="scss">
.options-menu{
  &-container{
    position: relative;
  }
  &-mask{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }
  &-button-container{
    position: absolute;
    background-color: var(--background-color);
    box-shadow: rgba(101, 119, 134, 0.2) 0 0 15px, rgba(101, 119, 134, 0.15) 0 0 3px 1px;
    border-radius: 5px;
    z-index: 5;
    min-width: 280px;
    right: 0;
    top: 0;
    overflow: hidden;
  }
  &-button{
    display: flex;
    align-items: center;
    padding: 15px 20px;
    transition-duration: var(--transition-duration);
    width: 100%;
    &:hover{
      background-color: var(--hover-color);
    }
    &-icon{
      margin-right: 10px;
    }
  }
}

.options-menu-container{

}
</style>
