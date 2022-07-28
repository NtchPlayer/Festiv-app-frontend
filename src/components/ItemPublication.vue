<template>
  <article class="publication-container publication-body publication-hover">
    <ProfilePicture :name="publication.user.username" />
    <div class="publication-content">
      <header class="publication-header">
        <div class="publication-header-meta">
          <h1
            class="publication-header-username"
            v-text="publication.user.username"
          />
          •
          <time
            class="publication-header-time"
            v-text="$filters.timeFilter(publication.createdAt)"
          />
        </div>
        <div class="publication-options-container">
          <button class="button-round" type="button" @click.prevent="optionsMenu = true">
            <font-awesome-icon icon="fa-solid fa-ellipsis" />
          </button>
          <div v-show="optionsMenu" class="publication-options-button-container">
            <button type="button" class="red publication-options-button" @click.prevent="deletePost">
              <font-awesome-icon class="publication-options-button-icon" icon="fa-regular fa-trash-can" />
              <span class="publication-options-button-label">Supprimer la publication</span>
            </button>
          </div>
          <div v-show="optionsMenu" class="publication-options-mask" @click.prevent="optionsMenu = false"/>
        </div>
      </header>
      <main v-html="publication.content" />
      <footer class="publication-footer">
        <button type="button" class="button-round button-heart">
          <font-awesome-icon icon="fa-regular fa-heart" />
        </button>
      </footer>
    </div>
  </article>
</template>

<script>
import ProfilePicture from '@/components/ProfilePicture'

export default {
  name: 'ItemPublication',
  components: {
    ProfilePicture
  },
  props: {
    publication: { type: Object, required: true }
  },
  data () {
    return {
      optionsMenu: false
    }
  },
  methods: {
    deletePost () {
      this.axios.delete(`publications/${this.publication.id}`)
        .then(() => {
          this.$emit('fetchPublications')
        })
    }
  }
}
</script>
