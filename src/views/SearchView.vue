<template>
  <main class="main-container">
    <section class="header-section">
      <button
        v-if="!defaultView"
        type="button"
        class="button-round"
        @click.prevent="$router.back()"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
      </button>
      <div class="search-bar">
        <font-awesome-icon class="search-bar-icon" icon="fa-solid fa-search" />
        <input
          type="search"
          placeholder="Recherche sur festiv'app"
          v-model="q"
          @keydown.enter.prevent="__makeSearch"
        >
      </div>
    </section>
    <section v-if="results.length === 0 && !defaultView" class="void-section">
      <div class="void-container">
        <font-awesome-icon class="void-icon" icon="icon-solid fa-search" />
        <p class="void-description">Aucun résultat n'a été trouvé !</p>
      </div>
    </section>
    <section v-else>
      <PublicationItem
        v-for="result of results"
        :key="result.id"
        :publication="result"
      />
    </section>
    <section v-if="defaultView">
      <FestivalItem
        v-for="festival of festivals"
        :key="festival.id"
        :festival="festival"
      />
    </section>
    <NavMenu />
  </main>
</template>

<script>
import NavMenu from '@/components/NavMenu'
import FestivalItem from '@/components/FestivalItem'
import PublicationItem from '@/components/publication/PublicationItem'

export default {
  name: 'SearchView',
  components: {
    PublicationItem,
    FestivalItem,
    NavMenu
  },
  data () {
    return {
      q: '',
      isHashtagSearch: false,
      results: [],
      festivals: [],
      loading: false
    }
  },
  computed: {
    hashtag () {
      return this.$route.query.hashtag ?? null
    },
    name () {
      return this.$route.query.name ?? null
    },
    content () {
      return this.$route.query.q ?? null
    },
    defaultView () {
      return !this.name && !this.content && !this.hashtag
    },
    searchUrl () {
      const name = this.name ? `name=${this.name}` : ''
      const hashtag = this.hashtag ? `&hashtag=%23${this.hashtag}` : ''
      const q = this.q && !this.isHashtagSearch ? `&q=${this.q}` : ''
      return `publications?${name}${hashtag}${q}`
    }
  },
  async mounted () {
    await this.__fetchFestivals()
    this.q = this.content
    if (!this.defaultView) {
      await this.__search()
    } else {
      this.$router.push({ name: 'search' })
    }
  },
  watch: {
    '$route.query' () {
      this.q = this.$route.query.q
      this.__search()
    }
  },
  methods: {
    async __fetchFestivals () {
      this.loading = true
      await this.axios
        .get('users/festivals')
        .then((e) => {
          this.loading = false
          this.festivals = e.data
        })
        .catch((e) => {
          this.loading = false
          throw e
        })
    },
    async __search () {
      if (!this.hashtag && !this.name && !this.content) {
        this.results = []
        return
      }
      this.loading = true
      this.isHashtagSearch = false
      if (this.hashtag) {
        this.q = `#${this.hashtag}`
        this.isHashtagSearch = true
      }
      if (this.name) {
        this.q = ''
      }
      await this.axios
        .get(this.searchUrl)
        .then((e) => {
          this.loading = false
          this.results = e.data
        })
        .catch((e) => {
          console.log(e)
          this.results = []
        })
    },
    __makeSearch () {
      if (!this.q) {
        return
      }
      this.$router.push({ query: { q: this.q } })
    }
  }
}
</script>

<style lang="scss">
.search-bar{
  padding: 8px 15px;
  width: 100%;
  border-radius: 30px;
  background-color: var(--grey-light);
  align-items: center;
  border: 1px solid transparent;
  transition-duration: var(--transition-duration);
  input{
    background: transparent;
    width: 100%;
    font-size: 1rem;
    &:focus{
      outline: none;
    }
  }
  &:focus-within{
    border-color: var(--blue-light-color);
    background-color: transparent;
    .search-bar-icon{
      color: var(--blue-light-color);
    }
  }
  &-icon{
    transition-duration: var(--transition-duration);
    margin-right: 10px;
  }
}
</style>
