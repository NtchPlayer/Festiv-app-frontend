<template>
  <main class="main-container profile-view">
    <template v-if="!initLoading">
      <MainHeader :title="userData.username" />
      <div class="content-section">
        <section class="item-container flex flex-b">
          <div>
            <ProfilePicture
              :name="userData.name"
              :src="userData.avatar?.url"
              :large-icon="true"
            />
            <h2 class="profile-username">
              <span v-text="userData.username" />
              <span v-if="userData.isProfessional" class="text-label">Festival</span>
            </h2>
            <p class="profile-name" v-text="`@${userData.name}`" />
            <div class="publication-main" v-html="userData.biography" />
            <div v-if="userData.isProfessional" class="profile-tags">
              <p class="profile-tags-label">Hashtag de ce festival:</p>
              <p class="profile-tags-container">
              <span
                v-for="tag of userData.tags"
                :key="tag.id"
                class="text-label"
                v-text="tag.content"
              />
              </p>
            </div>
            <p class="profile-join">
              <font-awesome-icon icon="fa-solid fa-calendar-days" />
              A rejoint Festiv'App le {{ $filters.timeFilter(userData.createdAt, false, true) }}
            </p>
          </div>
          <OptionMenu
            v-if="userData.id === $store.state.auth.user?.id"
            :actions="[{
              icon: 'fa-solid fa-user-pen',
              label: 'Éditer votre profile',
              function: 'editAccount',
            }, {
              icon: 'fa-solid fa-arrow-right-from-bracket',
              label: 'Se déconnecter',
              function: 'logout'
            }, {
              class: 'color-red',
              icon: 'fa-regular fa-trash-can',
              label: 'Supprimer votre compte',
              function: 'deleteAccount'
            }]"
            @editAccount="__editAccount"
            @logout="__logout"
            @deleteAccount="confirmDelete = true"
          />
        </section>
        <ProfileEdit
          v-if="editAccount"
          @close="editAccount = false"
          @getUser="__fetchUser"
        />
        <section v-if="publications" class="section-height-full">
          <PublicationItem
            v-for="publication of publications"
            :key="publication.id"
            :publication="publication"
            @fetchPublications="__fetchUserPost"
            @deletePublication="__fetchUserPost"
          />
        </section>
        <LoaderItem v-else-if="isLoading" />
        <section v-else class="section-height-full void-section">
          <div class="void-container">
            <font-awesome-icon class="void-icon" icon="icon-solid fa-wind"/>
            <p class="void-description">Vous n'avez encore rien posté !</p>
          </div>
        </section>
        <ConfirmModale
          v-if="confirmDelete"
          message="Êtes-vous sur de vouloir supprimer votre compte ?"
          confirm="Supprimer"
          @cancel="confirmDelete = false"
          @confirm="__deleteAccount"
        />
      </div>
    </template>
    <template v-else>
      <LoaderItem class="section-height-full" />
    </template>
    <NavMenu />
  </main>
</template>

<script>
import ProfilePicture from '@/components/profile/ProfilePicture'
import NavMenu from '@/components/MainNav'
import MainHeader from '@/components/MainHeader'
import OptionMenu from '@/components/OptionMenu'
import PublicationItem from '@/components/publication/PublicationItem'
import { defineAsyncComponent } from 'vue'
import ConfirmModale from '@/components/ConfirmModale'
import LoaderItem from '@/components/LoaderItem'
import { useHead } from '@vueuse/head'

export default {
  name: 'ProfileView',
  components: {
    LoaderItem,
    ConfirmModale,
    ProfileEdit: defineAsyncComponent(() => import('@/components/profile/ProfileEdit')),
    MainHeader,
    NavMenu,
    ProfilePicture,
    OptionMenu,
    PublicationItem
  },
  data () {
    return {
      userData: null,
      publications: null,
      initLoading: true,
      isLoading: false,
      editAccount: false,
      confirmDelete: false
    }
  },
  mounted () {
    this.__fetchUser()
  },
  watch: {
    '$route.params.name' () {
      if (this.$route.params.name) {
        this.__fetchUser()
      }
    }
  },
  methods: {
    __editAccount () {
      this.editAccount = true
    },
    async __logout () {
      await this.$store
        .dispatch('auth/logout')
        .then(() => {
          this.axios.defaults.headers.common.Authorization = ''
          delete this.axios.defaults.headers.common.Authorization
          this.$router.push({ name: 'login' })
        })
    },
    async __deleteAccount () {
      await this.axios.delete('users')
        .then(() => {
          this.__logout()
          this.$store.dispatch('notifications/emitNotification', {
            content: 'Votre compte a bien été supprimée.',
            style: 'green'
          })
        })
        .catch(() => {
          this.$store.dispatch('notifications/emitNotification', {
            content: 'Une erreur est survenue.',
            style: 'red'
          })
        })
    },
    __fetchUser () {
      return this.axios.get(`users/${this.$route.params.name}`)
        .then((res) => {
          this.initLoading = false
          this.userData = res.data
          this.__fetchUserPost()
        })
        .catch(() => {
          this.$router.push({ name: 'home' })
          this.$store.dispatch('notifications/emitNotification', {
            content: "Cette utilisateur n'existe pas.",
            style: 'red'
          })
        })
    },
    __fetchUserPost () {
      this.isLoading = true
      return this.axios.get(`publications/user/${this.userData.name}`)
        .then((res) => {
          this.isLoading = false
          this.publications = res.data
        })
        .catch(() => {
          this.publications = null
          this.isLoading = false
        })
    }
  },
  setup () {
    useHead({
      title: ' | Compte'
    })
  }
}
</script>

<style lang="scss">
.profile-view{
  > .item-container{
    display: flex;
    justify-content: space-between;
  }
  > .section-height-full{
    height: calc(100vh - 87px);
  }
}

.profile-tags{
  margin-top: 20px;
  &-label{
    margin-bottom: 5px;
    font-size: .8rem;
    color: var(--grey-dark);
  }
  &-container{
    display: flex;
    flex-wrap: wrap;
  }
  li:first-child .text-label{
    margin-left: 0;
  }
}
</style>
