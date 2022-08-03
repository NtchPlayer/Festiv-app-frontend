<template>
  <section class="container-modal" @click.self="$emit('close')">
    <div class="modale">
      <div class="header-section">
        <div>
          <button
            class="button-round"
            @click.prevent="$emit('close')"
          >
            <span class="button-round-icon">
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </span>
          </button>
          <h1 class="header-title">Édition du compte</h1>
        </div>
        <div>
          <button
            type="button"
            class="button-primary"
            :disabled="!formIsValid"
            @click.prevent="__editUser"
          >
            Enregistrer
          </button>
        </div>
      </div>
      <form class="item-container">
        <fieldset :disabled="loading">
          <h2 class="second-title">Information utilisateur</h2>
          <FieldUsername
            v-model="username"
            :error-checker="true"
            @usernameIsValid="__updateUsernameIsValid"
          />
          <FieldEmail
            v-model="email"
            :error-checker="true"
            @emailIsValid="__updateEmailIsValid"
          />
          <FieldBirthday
            v-model="birthday"
            @birthdayIsValid="__updateBirthdayIsValid"
          />
          <TipTap
            label="Votre Bio"
            v-model="biography"
          />
          <p
            v-show="error"
            class="error-message"
            v-text="error"
          />
          <template v-if="userData.isProfessional">
            <h2 class="second-title">Information compte Pro.</h2>
            <FielsTags
              v-model="tags"
            />
          </template>
          <h2 class="second-title">Sécurité</h2>
          <FieldPassword
            v-model="password"
            :error-checker="true"
          />
        </fieldset>
      </form>
    </div>
  </section>
</template>

<script>
import FieldUsername from '@/components/field/FieldUsername'
import FieldEmail from '@/components/field/FieldEmail'
import FieldBirthday from '@/components/field/FieldBirthday'
import TipTap from '@/components/field/TipTap'
import FielsTags from '@/components/field/FielsTags'
import FieldPassword from '@/components/field/FieldPassword'
export default {
  name: 'ProfileEdit',
  props: {
    userData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      username: this.userData.username,
      usernameIsValid: true,
      email: this.userData.email,
      emailIsValid: true,
      birthday: this.userData.birthday,
      birthdayIsValid: true,
      biography: this.userData.biography,
      tags: this.userData.tags,
      password: '',
      loading: false,
      error: null
    }
  },
  components: {
    FieldPassword,
    FielsTags,
    TipTap,
    FieldBirthday,
    FieldEmail,
    FieldUsername
  },
  computed: {
    formIsValid () {
      return this.usernameIsValid && this.emailIsValid && this.birthdayIsValid
    }
  },
  methods: {
    __updateUsernameIsValid (value) {
      this.usernameIsValid = value
    },
    __updateEmailIsValid (value) {
      this.emailIsValid = value
    },
    __updateBirthdayIsValid (value) {
      this.birthdayIsValid = value
    },
    __editUser () {
      if (!this.formIsValid) {
        return
      }
      this.error = null
      this.loading = true
      this.axios
        .put('users/update', {
          username: this.username,
          email: this.email,
          birthday: this.birthday,
          biography: this.biography,
          tags: this.tags
        })
        .then(() => {
          this.loading = false
          this.$emit('getUser')
          this.$emit('close')
        })
        .catch((e) => {
          this.loading = false
          this.error = e.response.data.message
          throw e
        })
    }
  }
}
</script>
