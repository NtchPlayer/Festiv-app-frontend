<template>
  <main class="main-container">
    <Header
      title="Publication"
    />
    <ItemPublication
      v-if="publication"
      :publication="publication"
    />
    <NavMenu />
  </main>
</template>

<script>
import Header from '@/components/Header'
import ItemPublication from '@/components/ItemPublication'
import NavMenu from '@/components/NavMenu'

export default {
  name: 'PublicationView',
  components: {
    NavMenu,
    ItemPublication,
    Header
  },
  data () {
    return {
      publication: null
    }
  },
  mounted () {
    this.__fetchPost(this.$route.params.publicationId)
  },
  methods: {
    async __fetchPost (id) {
      await this.axios.get(`publications/${id}`)
        .then((res) => {
          this.publication = res.data
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>

<style>

</style>
