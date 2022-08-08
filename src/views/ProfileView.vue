<template>
  <main class="main-container profile-view">
    <template v-if="!initLoading">
      <MainHeader :title="userData.username" />
      <section class="item-container">
        <div>
          <ProfilePicture
            :name="userData.username"
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
            <ul class="profile-tags-container">
              <li v-for="tag of userData.tags" :key="tag.id">
                <span class="text-label" v-text="tag.content" />
              </li>
            </ul>
          </div>
          <p class="profile-join">
            <font-awesome-icon icon="fa-solid fa-calendar-days" />
            A rejoint Festiv'app le {{ $filters.timeFilter(userData.createdAt, false, true) }}
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
      <section v-if="publications">
        <ItemPublication
          v-for="publication of publications"
          :key="publication.id"
          :publication="publication"
          @fetchPublications="__fetchUserPost(this.userData.username)"
        />
      </section>
      <section v-else class="void-section">
        <div class="void-container">
          <font-awesome-icon class="void-icon" icon="icon-solid fa-wind"/>
          <p class="void-description">Vous rien encore poster !</p>
        </div>
      </section>
      <ConfirmModale
        v-if="confirmDelete"
        message="Êtes-vous sur de vouloir supprimer votre compte ?"
        confirm="Supprimer"
        @cancel="confirmDelete = false"
        @confirm="__deleteAccount"
      />
    </template>
    <template v-else>
      <div>Loading...</div>
    </template>
    <NavMenu />
  </main>
</template>

<script>
import ProfilePicture from '@/components/profile/ProfilePicture'
import NavMenu from '@/components/NavMenu'
import MainHeader from '@/components/MainHeader'
import OptionMenu from '@/components/OptionMenu'
import ItemPublication from '@/components/publication/ItemPublication'
import { defineAsyncComponent } from 'vue'
import ConfirmModale from '@/components/ConfirmModale'

export default {
  name: 'ProfileView',
  components: {
    ConfirmModale,
    ProfileEdit: defineAsyncComponent(() => import('@/components/profile/ProfileEdit')),
    MainHeader,
    NavMenu,
    ProfilePicture,
    OptionMenu,
    ItemPublication
  },
  data () {
    return {
      userData: null,
      publications: null,
      initLoading: true,
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
          this.$router.push({ name: 'login' })
        })
    },
    async __deleteAccount () {
      await this.axios.delete('users')
        .then(() => {
          this.__logout()
        })
        .catch((e) => {
          throw e
        })
    },
    __fetchUser () {
      return this.axios.get(`users/${this.$route.params.name}`)
        .then((res) => {
          this.initLoading = false
          this.userData = res.data
          this.__fetchUserPost(res.data.name)
        })
    },
    __fetchUserPost (name) {
      return this.axios.get(`publications/user/${name}`)
        .then((res) => {
          this.publications = res.data
        })
    }
  }
}
</script>

<style lang="scss">
.profile-view{
  > .item-container{
    display: flex;
    justify-content: space-between;
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
