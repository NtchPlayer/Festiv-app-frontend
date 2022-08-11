<template>
  <div class="container-input">
    <label
      class="label"
      for="name"
    >
      Identifiant unique
    </label>
    <div class="input-warning">
      <input
        id="name"
        ref="input"
        v-model.trim="name"
        class="input input-shaping"
        :class="{'input-error': error}"
        type="text"
        :disabled="disabled"
        name="Field name"
        placeholder="NtchPlayer"
        :autocomplete="autocomplete"
        minlength="2"
        maxlength="32"
      >
      <font-awesome-icon v-show="isUse" class="input-warning-icon color-red" icon="fa-solid fa-circle-exclamation" />
    </div>
    <p
      v-show="isUse"
      class="error-message"
    >
      Cet identifiant est déjà utilisé.
    </p>
    <div v-if="errorChecker" v-show="error" class="container-warning-field">
      <span aria-hidden="true" class="color-red">
        <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
      </span>
      Votre identifiant:
      <ul class="list-warning">
        <li
          v-show="nameLengthMeet"
          class="item-list-warning"
          v-text="'Doit avoir entre 2 et 36 caractère.'"
        />
        <li
          v-show="nameHasSpecialCharacter"
          class="item-list-warning"
          v-text="'Ne doit pas contenir de caractère spécial'"
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
    errorChecker: { type: Boolean, default: false },
    isUse: { type: Boolean, default: false }
  },
  computed: {
    nameLengthMeet () {
      return this.name.trim().length < 2
    },
    nameHasSpecialCharacter () {
      return (!/^\w+$/g.test(this.name.toString()))
    },
    nameIsValid () {
      return (!this.error && this.name !== '')
    },
    error () {
      return (this.nameHasSpecialCharacter || this.nameLengthMeet) && this.name !== ''
    }
  },
  watch: {
    nameIsValid () {
      this.$emit('nameIsValid', this.nameIsValid)
    },
    modelValue () {
      this.$emit('isUse', false)
    }
  },
  mounted () {
    if (this.focus) {
      this.$refs.input.focus()
    }
  },
  setup (props, { emit }) {
    return {
      name: useModelWrapper(props, emit)
    }
  }
}
</script>
