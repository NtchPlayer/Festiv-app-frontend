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
      class="input"
      :class="{'input-error': error}"
      type="text"
      :disabled="disabled"
      name="Field username"
      placeholder="IcePlayer"
      :autocomplete="autocomplete"
      minlength="2"
      maxlength="32"
    >
    <div v-if="errorChecker" v-show="error" id="container-warning-field">
      <span aria-hidden="true" class="red">
        <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
      </span>
      Votre nom d'utilisateur:
      <ul class="list-warning">
        <li
          v-show="usernameLengthMeet"
          class="item-list-warning"
          v-text="'Doit avoir entre 2 et 36 caractère.'"
        />
        <li
          v-show="usernameHasSpace"
          class="item-list-warning"
          v-text="'Ne doit pas contenir d\'espace'"
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
    usernameHasSpace () {
      return (/\s+/.test(this.username))
    },
    nameIsValid () {
      return (!this.error && this.username !== '')
    },
    error () {
      return (this.usernameHasSpace || this.usernameLengthMeet) && this.username !== ''
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
