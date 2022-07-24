<template>
  <section class="modale">
    <h1 class="main-title">Se créer un compte</h1>
    <form @submit.prevent="submitLogin">
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
      <input class="button-primary" type="submit" value="Suivant">
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

export default {
  name: 'SignupView',
  components: {
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
      passwordIsValid: false
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
    submitLogin () {
      console.log(this.username, this.email, this.password)
    }
  }
}
</script>
