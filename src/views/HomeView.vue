<template>
  <main class="main-container">
    <MainHeader
      title="Accueil"
      :button="{
        label: 'Nouveau Post',
        icon: 'fa-plus'
      }"
      :button-backward="false"
      @emitClick="__newPost"
    />
    <section v-if="newPostModal" class="container-modal" @click.self="newPostModal = false">
      <div class="modale">
        <PublicationCreate @emitClose="newPostModal = false" @fetchPublications="__fetchPublications" />
      </div>
    </section>
    <PublicationCreate @fetchPublications="__fetchPublications" />
    <section v-if="publications">
      <PublicationItem
        v-for="publication of publications"
        :key="publication.id"
        :publication="publication"
        @deletePublication="__fetchPublications"
      />
    </section>
    <LoaderItem v-else-if="isLoading" />
    <NavMenu />
  </main>
</template>

<script>
import MainHeader from '@/components/MainHeader'
import NavMenu from '@/components/MainNav'
import PublicationCreate from '@/components/publication/PublicationCreate'
import PublicationItem from '@/components/publication/PublicationItem'
import LoaderItem from '@/components/LoaderItem'

export default {
  name: 'HomeView',
  components: {
    PublicationItem,
    PublicationCreate,
    NavMenu,
    MainHeader,
    LoaderItem
  },
  data () {
    return {
      newPostModal: false,
      publications: null,
      isLoading: true
    }
  },
  mounted () {
    this.__fetchPublications()
  },
  methods: {
    __newPost () {
      this.newPostModal = true
    },
    __fetchPublications () {
      this.isLoading = true
      this.axios.get('publications')
        .then((e) => {
          this.isLoading = false
          this.publications = e.data
        })
    }
  }
}
</script>
