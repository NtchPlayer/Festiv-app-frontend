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
    <NavMenu />
  </main>
</template>

<script>
import MainHeader from '@/components/MainHeader'
import NavMenu from '@/components/NavMenu'
import PublicationCreate from '@/components/publication/PublicationCreate'
import PublicationItem from '@/components/publication/PublicationItem'

export default {
  name: 'HomeView',
  components: {
    PublicationItem,
    PublicationCreate,
    NavMenu,
    MainHeader
  },
  data () {
    return {
      newPostModal: false,
      publications: null
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
      this.axios.get('publications')
        .then((e) => {
          this.publications = e.data
        })
    }
  }
}
</script>
