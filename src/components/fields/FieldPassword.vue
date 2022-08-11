<template>
  <div class="container-input">
    <label class="label" for="password" v-text="label" />
    <div class="input-shaping input-shaping-button">
      <input
        id="password"
        ref="input"
        v-model="password"
        class="input"
        :type="typeInput"
        placeholder="Votre mot de passe"
        :disabled="disabled"
        name="Field Password"
        :minlength="errorChecker === false ? false : 8"
        :autocomplete="autocomplete"
      >
      <button type="button" class="button-round" @click.prevent="revealPassword = !revealPassword">
        <span class="button-round-icon">
          <font-awesome-icon :icon="iconButton" />
        </span>
      </button>
    </div>
    <template v-if="errorChecker">
      <p
        v-if="passwordToCheck"
        v-show="!isValid && this.modelValue !== ''"
        class="warning container-warning-field"
      >
        <span aria-hidden="true" class="color-red">
          <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
        </span>
        {{ warningMessage }}
      </p>
      <div v-else v-show="!isValid && modelValue !== ''" class="container-warning-field">
      <span class="color-red">
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
          v-show="!passwordLengthMet"
          class="item-list-warning"
          v-text="'avoir au moins 8 caractère'"
        />
        <li
          v-show="!passwordHasCap"
          class="item-list-warning"
          v-text="'avoir au moins une majuscule'"
        />
        <li
          v-show="!passwordHasNumber"
          class="item-list-warning"
          v-text="'avoir au moins un nombre'"
        />
        <li
          v-show="!passwordHasSpecialCharacter"
          class="item-list-warning"
          v-text="'avoir un caractère spécial'"
        />
      </ul>
    </div>
    </template>
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
    warningMessage: { type: String, default: 'Les deux mots de passe ne correspondent pas.' },
    errorChecker: { type: Boolean, default: false },
    checkType: { type: String, default: 'new' },
    // checkOld: { type: Boolean, default: false },
    // confirmPassword: { type: Boolean, default: false },
    passwordToCheck: { type: String, default: '' },
    label: { type: String, default: 'Mot de passe' }
  },
  computed: {
    passwordLengthMet () {
      return this.password.trim().length > 8
    },
    passwordHasCap () {
      return /[A-Z]/.test(this.password.toString())
    },
    passwordHasNumber () {
      return /\d/.test(this.password.toString())
    },
    passwordHasSpecialCharacter () {
      return /[&#@!?§%€$="+_:/,;'.-]/.test(this.password.toString())
    },
    passwordHasSpace () {
      return /\s+/.test(this.password.toString())
    },
    passwordIsSame () {
      return this.modelValue === this.passwordToCheck && this.passwordToCheck !== ''
    },
    isValid () {
      switch (this.checkType) {
        case 'old':
          return !this.passwordIsSame
        case 'confirm':
          return this.passwordIsSame
        case 'new':
          return this.passwordLengthMet && this.passwordHasCap && this.passwordHasNumber && !this.passwordHasSpace && this.passwordHasSpecialCharacter
        default:
          return true
      }
    },
    iconButton () {
      return this.revealPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'
    },
    typeInput () {
      return this.revealPassword ? 'text' : 'password'
    }
  },
  data () {
    return {
      revealPassword: false
    }
  },
  watch: {
    isValid () {
      this.$emit('isValid', this.isValid)
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
