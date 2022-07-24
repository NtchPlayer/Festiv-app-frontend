<template>
  <section class="modale">
    <h1 class="main-title">Se connecter</h1>
    <form @submit.prevent="submitLogin">
      <FieldEmail
        v-model="email"
      />
      <FieldPassword
        v-model="password"
      />
      <input class="button-primary" type="submit" value="Suivant">
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
      password: ''
    }
  },
  methods: {
    submitLogin () {
      console.log(this.username, this.email, this.password)
    }
  }
}
</script>
