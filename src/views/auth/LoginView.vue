<template>
  <section class="modale item-container">
    <h1 class="main-title">Se connecter</h1>
    <form @submit.prevent="__submitLogin">
      <fieldset :disabled="isLoading">
        <FieldEmail
          v-model="email"
          :focus="true"
        />
        <FieldPassword
          v-model="password"
        />
        <input
          class="button-primary"
          type="submit"
          value="Suivant"
          :disabled="isLoading"
        >
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
import { useHead } from '@vueuse/head'

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
      isLoading: false
    }
  },
  methods: {
    async __submitLogin () {
      if (!this.email && !this.password) {
        return
      }
      this.isLoading = true
      await this.$store
        .dispatch('auth/login', { email: this.email, password: this.password })
        .then(() => {
          this.$router.push({ name: 'home' })
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          this.$store.dispatch('notifications/emitNotification', {
            content: error.message,
            style: 'red'
          })
        })
    }
  },
  setup () {
    useHead({
      title: ' | Connexion'
    })
  }
}
</script>
