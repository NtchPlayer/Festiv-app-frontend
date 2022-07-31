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
          v-model="search"
          @keydown.enter.prevent="__search"
        >
      </div>
    </section>
    <section>
      <ItemPublication
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
import ItemPublication from '@/components/ItemPublication'

export default {
  name: 'SearchView',
  components: {
    ItemPublication,
    FestivalItem,
    NavMenu
  },
  data () {
    return {
      search: '',
      results: [],
      festivals: [],
      loading: false
    }
  },
  computed: {
    hashtag () {
      return this.$route.query.hashtag ? `#${this.$route.query.hashtag}` : undefined
    },
    name () {
      return this.$route.query.name
    },
    content () {
      return this.$route.query.q
    },
    defaultView () {
      return !this.name && !this.content && !this.hashtag
    }
  },
  async mounted () {
    await this.__fetchFestivals()
    if (!this.defaultView) {
      await this.__search()
    }
  },
  watch: {
    '$route.query' () {
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
      this.loading = true
      await this.axios
        .get(`publications?name=${this.name}`)
        .then((e) => {
          this.loading = false
          this.results = e.data
        })
        .catch((e) => {
          console.log(e)
          this.results = null
        })
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
