<template>
  <main class="main-container profile-view">
    <template v-if="!initLoading">
      <Header :title="userData.username" />
      <section class="item-container">
        <div>
          <ProfilePicture
            :name="userData.username"
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
        </div>
        <OptionMenu
          :actions="[{
            icon: 'fa-solid fa-user-pen',
            label: 'Éditer votre profile',
            function: 'editAccount'
          }, {
            icon: 'fa-solid fa-arrow-right-from-bracket',
            label: 'Se déconnecter',
            function: 'logout'
          }, {
            class: 'red',
            icon: 'fa-regular fa-trash-can',
            label: 'Supprimer votre compte',
            function: 'deleteAccount'
          }]"
          @editAccount="__editAccount"
          @logout="__logout"
          @deleteAccount="__deleteAccount"
        />
      </section>
      <ProfileEdit
        v-if="editAccount"
        :user-data="userData"
        @close="editAccount = false"
        @getUser="__fetchUser"
      />
      <section>
        <ItemPublication
          v-for="publication of publications"
          :key="publication.id"
          :publication="publication"
          @fetchPublications="__fetchUserPost(this.userData.username)"
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
import ProfileEdit from '@/components/ProfileEdit'

export default {
  name: 'ProfileView',
  components: {
    ProfileEdit,
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
      initLoading: true,
      editAccount: false
    }
  },
  mounted () {
    this.__fetchUser()
  },
  watch: {
    '$route.query' () {
      this.__fetchUser()
    }
  },
  methods: {
    __editAccount () {
      this.editAccount = true
    },
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

.profile-username{
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 15px;
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
