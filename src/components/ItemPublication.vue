<template>
  <article class="item-container publication-body publication-hover">
    <ProfilePicture :name="publication.user.name" />
    <div class="publication-content">
      <header class="publication-header">
        <div class="publication-header-meta">
          <h1 class="publication-header-username">
            <router-link
              :to="{name: 'profile', params: { name: publication.user.name }}"
              v-text="publication.user.username"
            />
          </h1>
          <p class="publication-header-extra">
            <span class="profile-name" v-text="`@${publication.user.name}`" />
            •
            <time
              class="publication-header-time"
              v-text="$filters.timeFilter(publication.createdAt)"
            />
          </p>
        </div>
        <OptionMenu
          v-if="publication.user.id === $store.state.auth.user.id"
          :actions="[{
            class: 'red',
            icon: 'fa-regular fa-trash-can',
            label: 'Supprimer la publication',
            function: 'deletePost'
          }]"
          @deletePost="__deletePost"
        />
      </header>
      <main>
        <div
          class="publication-main"
          v-html="contentFormatted"
        />
        <PublicationGalerie :medias="publication.medias" />
      </main>
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
import PublicationGalerie from '@/components/PublicationGalerie'
import OptionMenu from '@/components/OptionMenu'

export default {
  name: 'ItemPublication',
  components: {
    OptionMenu,
    PublicationGalerie,
    ProfilePicture
  },
  props: {
    publication: { type: Object, required: true }
  },
  computed: {
    contentFormatted () {
      let formatted = this.publication.content
      if (!this.hashtagsArray) {
        return this.publication.content
      }
      this.hashtagsArray.forEach((hashtag) => {
        formatted = formatted.replace(new RegExp(`\\s${hashtag}`, 'g'), () => ` <span class="red"><a href="/search?hastag=${hashtag}">${hashtag}</a></span>`)
      })
      return formatted
    },
    hashtagsArray () {
      const regexp = /\B#\w+\b/g
      return this.publication.content.match(regexp)
    }
  },
  methods: {
    __deletePost () {
      this.axios.delete(`publications/${this.publication.id}`)
        .then(() => {
          this.$emit('fetchPublications')
        })
    }
  }
}
</script>
