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
    <div class="content-section">
      <section v-if="newPostModal" class="container-modal" @click.self="__closeModal">
        <div class="modale">
          <PublicationCreate
            @emitClose="__closeModal"
            @fetchPublications="__fetchPublications"
            @sendPost="sendPostIsLoading = $event"
          />
        </div>
      </section>
      <PublicationCreate @fetchPublications="__fetchPublications" />
      <section v-if="publications" class="section-height-full">
        <PublicationItem
          v-for="publication of publications"
          :key="publication.id"
          :publication="publication"
          @deletePublication="__fetchPublications"
          @fetchPublications="__fetchPublications"
        />
      </section>
      <LoaderItem v-else class="section-height-full" />
    </div>
    <NavMenu />
  </main>
</template>

<script>
import MainHeader from '@/components/MainHeader'
import NavMenu from '@/components/MainNav'
import PublicationCreate from '@/components/publication/PublicationCreate'
import PublicationItem from '@/components/publication/PublicationItem'
import LoaderItem from '@/components/LoaderItem'
import { useHead } from '@vueuse/head'

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
      isLoading: true,
      sendPostIsLoading: false
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
    },
    __closeModal () {
      if (this.sendPostIsLoading) {
        return
      }
      this.newPostModal = false
    }
  },
  setup () {
    useHead({
      title: ' | Accueil'
    })
  }
}
</script>
