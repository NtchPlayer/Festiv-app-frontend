<template>
  <main class="main-container">
    <Header
      title="Accueil"
      :button="{
        label: 'Nouveau Post',
        icon: 'fa-plus'
      }"
      :button-backward="false"
      @emitClick="newPost"
    />
    <section v-if="newPostModal" class="container-modal" @click.self="newPostModal = false">
      <div class="modale">
        <CreatePublication @emitClose="newPostModal = false" @fetchPublications="fetchPublications" />
      </div>
    </section>
    <CreatePublication @fetchPublications="fetchPublications" />
    <section>
      <ItemPublication
        v-for="publication of publications"
        :key="publication.id"
        :publication="publication"
        @fetchPublications="fetchPublications"
      />
    </section>
    <NavMenu />
  </main>
</template>

<script>
import Header from '@/components/Header'
import NavMenu from '@/components/NavMenu'
import CreatePublication from '@/components/CreatePublication'
import ItemPublication from '@/components/ItemPublication'

export default {
  name: 'HomeView',
  components: {
    ItemPublication,
    CreatePublication,
    NavMenu,
    Header
  },
  data () {
    return {
      newPostModal: false,
      publications: null
    }
  },
  mounted () {
    this.fetchPublications()
  },
  methods: {
    newPost () {
      this.newPostModal = true
    },
    fetchPublications () {
      this.axios.get('publications')
        .then((e) => {
          this.publications = e.data
        })
    }
  }
}
</script>
