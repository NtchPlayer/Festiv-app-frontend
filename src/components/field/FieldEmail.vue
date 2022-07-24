<template>
  <div class="container-input">
    <label class="label" for="email">E-mail</label>
    <input
      id="email"
      ref="input"
      v-model="email"
      class="input"
      :class="{'input-error': error && email !== ''}"
      type="email"
      :disabled="disabled"
      name="Field Email"
      placeholder="E-mail"
      :autocomplete="autocomplete"
    >
    <p
      v-if="errorChecker"
      v-show="error && (email !== '')"
      id="container-warning-field"
      class="warning"
    >
      <span aria-hidden="true" class="red">
        <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
      </span>
      Votre email n'est pas valide.
    </p>
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
    emailIsValid () {
      return (/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/.test(this.email.toString())) && this.email !== ''
    },
    error () {
      return (!this.emailIsValid)
    }
  },
  watch: {
    emailIsValid () {
      this.$emit('emailIsValid', this.emailIsValid)
    }
  },
  mounted () {
    if (this.focus) {
      this.$refs.input.focus()
    }
  },
  setup (props, { emit }) {
    return {
      email: useModelWrapper(props, emit)
    }
  }
}
</script>
