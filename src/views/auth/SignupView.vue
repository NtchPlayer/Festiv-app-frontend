<template>
  <section class="modale">
    <h1 class="main-title">Se créer un compte</h1>
    <form @submit.prevent="submitSignup">
      <fieldset :disabled="loading">
        <FieldUsername
          v-model="username"
          :focus="true"
          :errorChecker="true"
          @usernameIsValid="updateUsernameIsValid"
        />
        <FieldEmail
          v-model="email"
          :errorChecker="true"
          @emailIsValid="updateEmailIsValid"
        />
        <FieldPassword
          v-model="password"
          :errorChecker="true"
          @passwordIsValid="updatePasswordIsValid"
        />
        <div class="container-input">
          <input type="checkbox" v-model="isFestivalAccount" id="festival-account" @keydown.enter.prevent="isFestivalAccount = !isFestivalAccount">
          <label for="festival-account">Créer un compte pour un festival.</label>
        </div>
        <FielsTags
          v-show="isFestivalAccount"
          :tags="tags"
        />
        <input :disabled="!isValidForm" class="button-primary" type="submit" value="Suivant">
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
import FieldUsername from '@/components/field/FieldUsername'
import FieldEmail from '@/components/field/FieldEmail'
import FieldPassword from '@/components/field/FieldPassword'
import FielsTags from '@/components/field/FielsTags'

export default {
  name: 'SignupView',
  components: {
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
      password: '',
      passwordIsValid: false,
      isFestivalAccount: false,
      tags: [],
      loading: false
    }
  },
  computed: {
    isValidForm () {
      return this.usernameIsValid && this.emailIsValid && this.passwordIsValid
    }
  },
  methods: {
    updateUsernameIsValid (value) {
      this.usernameIsValid = value
    },
    updatePasswordIsValid (value) {
      this.passwordIsValid = value
    },
    updateEmailIsValid (value) {
      this.emailIsValid = value
    },
    submitSignup () {
      this.loading = true
      this.$store
        .dispatch('auth/signup', {
          username: this.username,
          email: this.email,
          password: this.password,
          isProfessional: this.isFestivalAccount,
          tags: this.tags
        })
        .then(() => {
          this.$router.push({ name: 'login' })
          this.loading = false
        })
        .catch((error) => {
          this.loading = false
          throw error
        })
    }
  }
}
</script>
