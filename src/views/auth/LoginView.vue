<template>
  <section class="modale">
    <h1 class="main-title">Se connecter</h1>
    <form @submit.prevent="submitLogin">
      <fieldset :disabled="loading">
        <FieldEmail
          v-model="email"
          :focus="true"
        />
        <FieldPassword
          v-model="password"
        />
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
import FieldEmail from '@/components/field/FieldEmail'
import FieldPassword from '@/components/field/FieldPassword'

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
      loading: false
    }
  },
  methods: {
    submitLogin () {
      console.log(this.email, this.password)
      this.loading = true
      this.$store
        .dispatch('auth/login', { email: this.email, password: this.password })
        .then(() => {
          this.$router.push({ name: 'home' })
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
