<template>
  <section v-if="user" class="container-modal" @click.self="__closeModal">
    <div class="modale">
      <div class="header-section">
        <div>
          <button
            class="button-round"
            :disabled="isLoading"
            @click.prevent="__closeModal"
          >
            <span class="button-round-icon">
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </span>
          </button>
          <h1 class="header-title">Édition du compte</h1>
        </div>
        <div>
          <LoaderItem :is-tiny="true" v-show="isLoading" />
          <button
            type="button"
            class="button-primary"
            :disabled="!formIsValid || isLoading"
            @click.prevent="__editUser"
          >
            Enregistrer
          </button>
        </div>
      </div>
      <form class="item-container">
        <fieldset :disabled="isLoading">
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
            @usernameIsValid="usernameIsValid = $event"
          />
          <FieldEmail
            v-model="user.email"
            :error-checker="true"
            :is-use="emailIsUse"
            @emailIsValid="emailIsValid = $event"
            @isUse="emailIsUse = $event"
          />
          <FieldBirthday
            v-model="user.birthday"
            @birthdayIsValid="birthdayIsValid = $event"
          />
          <TipTap
            label="Votre Bio"
            v-model="user.biography"
          />
          <template v-if="user.isProfessional">
            <h2 class="second-title">Information compte Pro.</h2>
            <FielsTags
              v-model="user.tags"
            />
          </template>
          <h2 class="second-title">Sécurité</h2>
          <FieldPassword
            v-model="oldPassword"
            :error-checker="true"
            label="Ancien mot de passe"
            warning-message="Votre nouveau mot de passe ne peux pas être le même que l'ancien."
            :password-to-check="newPassword"
            check-type="old"
            @isValid="oldPasswordIsValid = $event"
          />
          <FieldPassword
            v-model="newPassword"
            :error-checker="true"
            label="Nouveau mot de passe"
            @isValid="newPasswordIsValid = $event"
          />
          <FieldPassword
            v-model="confirmNewPassword"
            :error-checker="true"
            check-type="confirm"
            :password-to-check="newPassword"
            label="Confirmer nouveau mot de passe"
            @isValid="confirmNewPasswordIsValid = $event"
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
import TipTap from '@/components/fields/FieldTipTap'
import FielsTags from '@/components/fields/FielsTags'
import FieldPassword from '@/components/fields/FieldPassword'
import ProfilePicture from '@/components/profile/ProfilePicture'
import LoaderItem from '@/components/LoaderItem'

export default {
  name: 'ProfileEdit',
  data () {
    return {
      file: null,
      user: null,
      usernameIsValid: true,
      emailIsValid: true,
      emailIsUse: false,
      birthdayIsValid: true,
      oldPassword: '',
      oldPasswordIsValid: false,
      newPassword: '',
      newPasswordIsValid: false,
      confirmNewPassword: '',
      confirmNewPasswordIsValid: false,
      isLoading: false
    }
  },
  components: {
    LoaderItem,
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
      if (this.passwordInclude) {
        return this.usernameIsValid && this.emailIsValid && this.birthdayIsValid && this.newPasswordIsValid && this.confirmNewPasswordIsValid && this.oldPasswordIsValid && Boolean(this.oldPassword)
      } else {
        return this.usernameIsValid && this.emailIsValid && this.birthdayIsValid
      }
    },
    passwordInclude () {
      return Boolean(this.oldPassword) || Boolean(this.newPassword) || Boolean(this.confirmNewPassword)
    }
  },
  async mounted () {
    await this.axios.get('profile')
      .then((res) => {
        this.user = res.data.user
        if (!res.data.user.avatar) {
          this.user.avatar = {}
        }
        this.isLoading = false
      })
  },
  methods: {
    __emitFile (file) {
      this.file = file
      this.user.avatar.url = URL.createObjectURL(file)
    },
    __editUser () {
      if (!this.formIsValid) {
        return
      }
      this.emailIsUse = false
      this.isLoading = true
      this.axios
        .put('users/update', {
          username: this.user.username,
          email: this.user.email,
          birthday: this.user.birthday,
          biography: this.user.biography,
          tags: this.user.tags,
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        })
        .then(() => {
          if (this.file) {
            this.__updateAvatar(this.file)
          } else {
            this.$emit('close')
            this.$emit('getUser')
            this.isLoading = false
            this.$store.dispatch('notifications/emitNotification', {
              content: 'Votre compte a été mis à jour.',
              style: 'green'
            })
          }
        })
        .catch((e) => {
          this.__catchError(e.response.data)
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
          this.isLoading = false
          this.$store.state.auth.user.avatar = e.data.url
          this.$store.dispatch('notifications/emitNotification', {
            content: 'Votre compte et votre photo de profile ont été mis à jour.',
            style: 'green'
          })
        })
        .catch((e) => {
          this.__catchError(e.response.data)
        })
    },
    __catchError (error) {
      this.isLoading = false
      if (error.statusCode === 422 && error.message.includes('email')) {
        this.emailIsUse = true
      }
      this.$store.dispatch('notifications/emitNotification', {
        content: error.message,
        style: 'red'
      })
    },
    __closeModal () {
      if (this.isLoading) {
        return
      }
      this.$emit('close')
    }
  }
}
</script>
