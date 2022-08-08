<template>
  <section v-if="user" class="container-modal" @click.self="$emit('close')">
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
            :disabled="!formIsValid || loading"
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
            :name="user.name"
            :src="user.avatar?.url"
            :large-icon="true"
            :is-editable="true"
            class="container-input"
            @emitFile="__emitFile"
          />
          <FieldUsername
            v-model="user.username"
            :error-checker="true"
            @usernameIsValid="__updateUsernameIsValid"
          />
          <FieldEmail
            v-model="user.email"
            :error-checker="true"
            @emailIsValid="__updateEmailIsValid"
          />
          <FieldBirthday
            v-model="user.birthday"
            @birthdayIsValid="__updateBirthdayIsValid"
          />
          <TipTap
            label="Votre Bio"
            v-model="user.biography"
          />
          <p
            v-show="error"
            class="error-message"
            v-text="error"
          />
          <template v-if="user.isProfessional">
            <h2 class="second-title">Information compte Pro.</h2>
            <FielsTags
              v-model="user.tags"
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
import FieldUsername from '@/components/fields/FieldUsername'
import FieldEmail from '@/components/fields/FieldEmail'
import FieldBirthday from '@/components/fields/FieldBirthday'
import TipTap from '@/components/fields/TipTap'
import FielsTags from '@/components/fields/FielsTags'
import FieldPassword from '@/components/fields/FieldPassword'
import ProfilePicture from '@/components/profile/ProfilePicture'

export default {
  name: 'ProfileEdit',
  data () {
    return {
      file: null,
      user: null,
      usernameIsValid: true,
      emailIsValid: true,
      birthdayIsValid: true,
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
  async mounted () {
    await this.axios.get('profile')
      .then((res) => {
        this.user = res.data.user
        if (!res.data.user.avatar) {
          this.user.avatar = {}
        }
        this.loading = false
      })
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
      this.user.avatar.url = URL.createObjectURL(file)
    },
    __editUser () {
      if (!this.formIsValid) {
        return
      }
      this.error = null
      this.loading = true
      this.axios
        .put('users/update', {
          username: this.user.username,
          email: this.user.email,
          birthday: this.user.birthday,
          biography: this.user.biography,
          tags: this.user.tags
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
        .then((e) => {
          this.$emit('close')
          this.file = null
          this.$emit('getUser')
          this.loading = false
          this.$store.state.auth.user.avatar = e.data.url
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
