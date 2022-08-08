<template>
  <section class="modale item-container">
    <h1 class="main-title">Se connecter</h1>
    <form @submit.prevent="__submitLogin">
      <fieldset :disabled="loading">
        <FieldEmail
          v-model="email"
          :focus="true"
        />
        <FieldPassword
          v-model="password"
        />
        <p v-show="error" class="error-message" v-text="error"/>
        <input class="button-primary" type="submit" value="Suivant">
      </fieldset>
    </form>
    <p class="auth-link">
      Vous n'avez pas de compte ?
      <router-link :to="{ name: 'signup' }">
        Inscrivez-vous
      </router-link>
    </p>
  </section>
</template>

<script>
import FieldEmail from '@/components/fields/FieldEmail'
import FieldPassword from '@/components/fields/FieldPassword'

export default {
  name: 'LoginView',
  components: {
    FieldEmail,
    FieldPassword
  },
  data () {
    return {
      email: '',
      password: '',
      loading: false,
      error: null
    }
  },
  methods: {
    async __submitLogin () {
      this.loading = true
      this.error = null
      await this.$store
        .dispatch('auth/login', { email: this.email, password: this.password })
        .then(() => {
          this.$router.push({ name: 'home' })
          this.loading = false
        })
        .catch((error) => {
          this.loading = false
          this.__handleError(error.response.data)
        })
    },
    __handleError (error) {
      this.error = error.message
    }
  }
}
</script>
