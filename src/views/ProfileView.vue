<template>
  <main class="main-container profile-view">
    <template v-if="!loading">
      <Header :title="userData.username" />
      <section class="item-container">
        <div>
          <ProfilePicture
            :name="userData.username"
            :large-icon="true"
          />
          <h2 class="profile-username" v-text="userData.username" />
          <div v-html="userData.biography" />
        </div>
        <OptionMenu
          :actions="[{
            icon: 'fa-solid fa-arrow-right-from-bracket',
            label: 'Se déconnecter',
            function: 'logout'
          }, {
            class: 'red',
            icon: 'fa-regular fa-trash-can',
            label: 'Supprimer votre compte',
            function: 'deleteAccount'
          }]"
          @logout="__logout"
          @deleteAccount="__deleteAccount"
        />
      </section>
      <section>
        <ItemPublication
          v-for="publication of publications"
          :key="publication.id"
          :publication="publication"
          @fetchPublications="fetchPublications"
        />
      </section>
    </template>
    <template v-else>
      <div>Loading...</div>
    </template>
    <NavMenu />
  </main>
</template>

<script>
import ProfilePicture from '@/components/ProfilePicture'
import NavMenu from '@/components/NavMenu'
import Header from '@/components/Header'
import OptionMenu from '@/components/OptionMenu'
import ItemPublication from '@/components/ItemPublication'

export default {
  name: 'ProfileView',
  components: {
    Header,
    NavMenu,
    ProfilePicture,
    OptionMenu,
    ItemPublication
  },
  data () {
    return {
      userData: null,
      publications: null,
      loading: true
    }
  },
  async mounted () {
    await this.__fetchUser()
  },
  methods: {
    __logout () {
      this.$store
        .dispatch('auth/logout')
        .then(() => {
          this.$router.push({ name: 'login' })
        })
    },
    __deleteAccount () {
      console.log('delete Account')
    },
    __fetchUser () {
      this.loading = true
      return this.axios.get(`users/${this.$route.params.username}`)
        .then((res) => {
          this.loading = false
          this.userData = res.data
          this.__fetchUserPost(res.data.username)
        })
    },
    __fetchUserPost (username) {
      return this.axios.get(`publications?username=${username}`)
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

.profile-username{
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 15px;
}
</style>
