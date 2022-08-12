<template>
  <div class="container-input">
    <label
      class="label"
      for="username"
    >
      Nom d'utilisateur
    </label>
    <input
      id="username"
      ref="input"
      v-model.trim="username"
      class="input input-shaping"
      :class="{'input-error': error}"
      type="text"
      :disabled="disabled"
      name="Field username"
      placeholder="Pickle"
      :autocomplete="autocomplete"
      minlength="2"
      maxlength="32"
    >
    <div v-if="errorChecker" v-show="error" class="container-warning-field">
      <span aria-hidden="true" class="color-red">
        <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
      </span>
      Votre nom d'utilisateur:
      <ul class="list-warning">
        <li
          v-show="usernameLengthMeet"
          class="item-list-warning"
          v-text="'Doit avoir entre 2 et 36 caractère.'"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import { useModelWrapper } from '@/utils/modelWrapper'

export default {
  props: {
    autocomplete: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    focus: { type: Boolean, default: false },
    modelValue: { type: String, default: '' },
    errorChecker: { type: Boolean, default: false }
  },
  computed: {
    usernameLengthMeet () {
      return this.username.trim().length < 2
    },
    nameIsValid () {
      return (!this.error && this.username !== '')
    },
    error () {
      return (this.usernameLengthMeet) && this.username !== ''
    }
  },
  watch: {
    nameIsValid () {
      this.$emit('usernameIsValid', this.nameIsValid)
    }
  },
  mounted () {
    if (this.focus) {
      this.$refs.input.focus()
    }
  },
  setup (props, { emit }) {
    return {
      username: useModelWrapper(props, emit)
    }
  }
}
</script>
