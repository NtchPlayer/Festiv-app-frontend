<template>
  <div class="container-input">
    <label class="label" for="email">E-mail</label>
    <div class="input-warning">
      <input
        id="email"
        ref="input"
        v-model="email"
        class="input input-shaping"
        :class="{'input-error': error && email !== ''}"
        :type="errorChecker ? 'email' : 'text'"
        :disabled="disabled"
        name="Field Email"
        placeholder="exemple@mail.xyz"
        :autocomplete="autocomplete"
      >
      <font-awesome-icon v-show="isUse" class="input-warning-icon color-red" icon="fa-solid fa-circle-exclamation" />
    </div>
    <p
      v-if="errorChecker"
      v-show="error && (email !== '')"
      class="warning container-warning-field"
    >
      <span aria-hidden="true" class="color-red">
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
    errorChecker: { type: Boolean, default: false },
    isUse: { type: Boolean, default: false }
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
    },
    isUse () {
      this.$store.dispatch('notifications/emitNotification', {
        content: 'Cet email est déjà utilisé.',
        style: 'red'
      })
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
      email: useModelWrapper(props, emit)
    }
  }
}
</script>
