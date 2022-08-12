<template>
  <section class="modale item-container">
    <h1 class="main-title">Se créer un compte</h1>
    <form @submit.prevent="__submitSignup">
      <fieldset :disabled="isLoading">
        <FieldUsername
          v-model="username"
          :focus="true"
          :errorChecker="true"
          @usernameIsValid="usernameIsValid = $event"
        />
        <FieldEmail
          v-model="email"
          :errorChecker="true"
          :is-use="emailIsUse"
          @emailIsValid="emailIsValid = $event"
          @isUse="emailIsUse = $event"
        />
        <FieldName
          v-model="name"
          :error-checker="true"
          :is-use="nameIsUse"
          @nameIsValid="nameIsValid = $event"
          @isUse="emailIsUse = $event"
        />
        <FieldPassword
          v-model="password"
          :errorChecker="true"
          @isValid="passwordIsValid = $event"
        />
        <FieldPassword
          v-model="confirmPassword"
          :errorChecker="true"
          check-type="confirm"
          :password-to-check="password"
          label="Confirmation mot de passe"
          @isValid="confirmPasswordIsValid = $event"
        />
        <div class="container-input">
          <input type="checkbox" v-model="isFestivalAccount" id="festival-account" @keydown.enter.prevent="isFestivalAccount = !isFestivalAccount">
          <label for="festival-account">Créer un compte pour un festival.</label>
        </div>
        <FielsTags
          v-show="isFestivalAccount"
          :model-value="tags"
        />
        <input :disabled="!isValidForm || isLoading" class="button-primary" type="submit" value="Suivant">
      </fieldset>
    </form>
    <p class="auth-link">
      Vous avez déjà un compte ?
      <router-link :to="{ name: 'login' }">
        Connectez-vous
      </router-link>
    </p>
  </section>
</template>

<script>
import FieldUsername from '@/components/fields/FieldUsername'
import FieldEmail from '@/components/fields/FieldEmail'
import FieldPassword from '@/components/fields/FieldPassword'
import FielsTags from '@/components/fields/FielsTags'
import FieldName from '@/components/fields/FieldName'
import { useHead } from '@vueuse/head'

export default {
  name: 'SignupView',
  components: {
    FieldName,
    FielsTags,
    FieldUsername,
    FieldEmail,
    FieldPassword
  },
  data () {
    return {
      username: '',
      usernameIsValid: false,
      email: '',
      emailIsValid: false,
      emailIsUse: false,
      name: '',
      nameIsValid: false,
      nameIsUse: false,
      password: '',
      passwordIsValid: false,
      confirmPassword: '',
      confirmPasswordIsValid: false,
      isFestivalAccount: false,
      tags: [],
      isLoading: false
    }
  },
  computed: {
    isValidForm () {
      return this.usernameIsValid && this.emailIsValid && this.nameIsValid && this.passwordIsValid && this.confirmPasswordIsValid
    }
  },
  methods: {
    __submitSignup () {
      if (!this.isValidForm) {
        return
      }
      this.isLoading = true
      this.emailIsUse = false
      this.nameIsUse = false
      this.$store
        .dispatch('auth/signup', {
          username: this.username,
          email: this.email,
          name: this.name,
          password: this.password,
          isProfessional: this.isFestivalAccount,
          tags: this.tags.length === 0 ? null : this.tags
        })
        .then(() => {
          this.$router.push({ name: 'login' })
          this.$store.dispatch('notifications/emitNotification', {
            content: 'Votre compte a bien été créé ! Vous pouvez maintenant vous connecter.',
            style: 'green'
          })
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          this.__handleError(error.response.data)
        })
    },
    __handleError (error) {
      if (error.statusCode === 422 && error.message.includes('email')) {
        this.emailIsUse = true
      } else if (error.statusCode === 422 && error.message.includes('Name')) {
        this.nameIsUse = true
      } else if (error.statusCode === 422 && error.message.includes('nom')) {
        this.$store.dispatch('notifications/emitNotification', {
          content: error.message,
          style: 'red'
        })
      } else {
        this.$store.dispatch('notifications/emitNotification', {
          content: 'Oops, une erreur c\'est produite ! Veuillez ressayer plus tard.',
          style: 'red'
        })
      }
    }
  },
  setup () {
    useHead({
      title: ' | Inscription'
    })
  }
}
</script>
