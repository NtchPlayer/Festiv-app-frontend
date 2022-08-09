<template>
  <section class="modale item-container">
    <h1 class="main-title">Se créer un compte</h1>
    <form @submit.prevent="__submitSignup">
      <fieldset :disabled="isLoading">
        <FieldUsername
          v-model="username"
          :focus="true"
          :errorChecker="true"
          @usernameIsValid="__updateUsernameIsValid"
        />
        <FieldEmail
          v-model="email"
          :errorChecker="true"
          :is-use="emailIsUse"
          @emailIsValid="__updateEmailIsValid"
        />
        <FieldName
          v-model="name"
          :error-checker="true"
          :is-use="nameIsUse"
          @nameIsValid="__updateNameIsValid"
        />
        <FieldPassword
          v-model="password"
          :errorChecker="true"
          @passwordIsValid="__updatePasswordIsValid"
        />
        <div class="container-input">
          <input type="checkbox" v-model="isFestivalAccount" id="festival-account" @keydown.enter.prevent="isFestivalAccount = !isFestivalAccount">
          <label for="festival-account">Créer un compte pour un festival.</label>
        </div>
        <FielsTags
          v-show="isFestivalAccount"
          :model-value="tags"
        />
        <p
          v-show="errorServer"
          class="error-message"
        >
          Oops, une erreur c'est produite ! Veuillez ressayer plus tard.
        </p>
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
      isFestivalAccount: false,
      tags: [],
      isLoading: false,
      errorServer: false
    }
  },
  computed: {
    isValidForm () {
      return this.usernameIsValid && this.emailIsValid && this.nameIsValid && this.passwordIsValid
    }
  },
  methods: {
    __updateUsernameIsValid (value) {
      this.usernameIsValid = value
    },
    __updatePasswordIsValid (value) {
      this.passwordIsValid = value
    },
    __updateEmailIsValid (value) {
      this.emailIsValid = value
    },
    __updateNameIsValid (value) {
      this.nameIsValid = value
    },
    __submitSignup () {
      if (!this.isValidForm) {
        return
      }
      this.isLoading = true
      this.emailIsUse = false
      this.nameIsUse = false
      this.errorServer = false
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
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          this.__handleError(error.response.data)
        })
    },
    __handleError (error) {
      if (error.statusCode === 422 && error.message.includes('Email')) {
        this.emailIsUse = true
      } else if (error.statusCode === 422 && error.message.includes('Name')) {
        this.nameIsUse = true
      } else {
        this.errorServer = true
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
