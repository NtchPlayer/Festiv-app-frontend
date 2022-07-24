<template>
  <div class="container-input">
    <label class="label" for="password">
      Mot de passe
    </label>
    <input
      id="password"
      ref="input"
      v-model="password"
      class="input"
      :class="{'input-error': error}"
      type="password"
      placeholder="Votre mot de passe"
      :disabled="disabled"
      name="Field Password"
      minlength="8"
      :autocomplete="autocomplete"
    >
    <div v-if="errorChecker" v-show="error" id="container-warning-field">
      <span class="red">
        <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
      </span>
      Votre mot de passe doit contenir:
      <ul class="list-warning">
        <li
          v-show="passwordHasSpace"
          class="item-list-warning"
          v-text="'aucun espace'"
        />
        <li
          v-show="passwordLengthMet"
          class="item-list-warning"
          v-text="'avoir au moins 8 caractère'"
        />
        <li
          v-show="passwordHasCap"
          class="item-list-warning"
          v-text="'avoir au moins une majuscule'"
        />
        <li
          v-show="passwordHasNumber"
          class="item-list-warning"
          v-text="'avoir au moins un nombre'"
        />
        <li
          v-show="passwordHasSpecialCharacter"
          class="item-list-warning"
          v-text="'avoir un caractère spécial'"
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
    modelValue: { type: String, default: false },
    errorChecker: { type: Boolean, default: false }
  },
  computed: {
    passwordLengthMet () {
      return (this.password.trim().length < 8)
    },
    passwordHasCap () {
      return !(/[A-Z]/.test(this.password))
    },
    passwordHasNumber () {
      return !(/\d/.test(this.password))
    },
    passwordHasSpecialCharacter () {
      return !(/[&#@!?§%€$="+_:/,;'.-]/.test(this.password))
    },
    passwordHasSpace () {
      return (/\s+/.test(this.password))
    },
    error () {
      return (this.passwordLengthMet || this.passwordHasCap || this.passwordHasNumber || this.passwordHasSpace || this.passwordHasSpecialCharacter) && this.password !== ''
    },
    passwordIsValid () {
      return !this.error && this.password !== ''
    }
  },
  watch: {
    passwordIsValid () {
      this.$emit('passwordIsValid', this.passwordIsValid)
    }
  },
  mounted () {
    if (this.focus) {
      this.$refs.input.focus()
    }
  },
  setup (props, { emit }) {
    return {
      password: useModelWrapper(props, emit)
    }
  }
}
</script>
