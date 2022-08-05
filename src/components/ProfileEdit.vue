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
          <ProfilePicture
            :name="userData.name"
            :src="avatar"
            :large-icon="true"
            :is-editable="true"
            class="container-input"
            @emitFile="__emitFile"
          />
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
import ProfilePicture from '@/components/ProfilePicture'

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
      avatar: this.userData.avatar?.url,
      file: null,
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
    ProfilePicture,
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
    __emitFile (file) {
      this.file = file
      this.avatar = URL.createObjectURL(file)
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
          if (this.file) {
            this.__updateAvatar(this.file)
          } else {
            this.$emit('close')
            this.$emit('getUser')
            this.loading = false
          }
        })
        .catch((e) => {
          this.__catchError(e)
        })
    },
    __updateAvatar (file) {
      const formData = new FormData()
      formData.append('avatar', file, file.name)
      this.axios
        .post(
          'medias/avatar',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
        .then(() => {
          this.$emit('close')
          this.file = null
          this.$emit('getUser')
          this.loading = false
        })
        .catch((e) => {
          this.__catchError(e)
        })
    },
    __catchError (e) {
      this.loading = false
      this.error = e.response.data.message
      throw e
    }
  }
}
</script>
