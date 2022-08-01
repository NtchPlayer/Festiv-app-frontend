<template>
  <article class="item-container publication-body publication-hover" @click.prevent="__openPublication">
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
          @click="__handleClicks"
        />
        <PublicationGalerie v-if="publication.medias" :medias="publication.medias" />
      </main>
      <footer class="publication-footer">
        <button type="button" class="button-round button-heart" @click.prevent="__likePublication()">
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
      if (!this.hashtags) {
        return this.publication.content
      }
      this.hashtags.forEach((hashtag) => {
        formatted = formatted.replace(new RegExp(`${hashtag}`, 'g'), () => `<span class="red"><a href="/search?hashtag=${hashtag.substring(1)}">${hashtag}</a></span>`)
      })
      return formatted
    },
    hashtags () {
      const regexp = /\B#\w+\b/g
      const arr = this.publication.content.match(regexp)
      return [...new Set(arr)]
    }
  },
  methods: {
    __deletePost () {
      this.axios.delete(`publications/${this.publication.id}`)
        .then(() => {
          this.$emit('fetchPublications')
        })
    },
    __likePublication () {
      console.log('test')
    },
    __openPublication () {
      let { target } = event
      while (target && !target.matches('.publication-body')) {
        if (target.tagName === 'A' || (target._vei?.onClick && target.className !== 'publication-main')) {
          return
        }
        target = target.parentNode
      }
      this.$router.push({
        name: 'profile-publication',
        params: {
          name: this.publication.user.name,
          publicationId: this.publication.id
        }
      })
    },
    __handleClicks (event) {
      // ensure we use the link, in case the click has been received by a sub element
      let { target } = event
      while (target && target.tagName !== 'A') { target = target.parentNode }
      // handle only links that occur inside the component and do not reference external resources
      if (target && target.matches(".publication-main a:not([href*='://'])") && target.href) {
        // some sanity checks taken from vue-router:
        // https://github.com/vuejs/vue-router/blob/dev/src/components/link.js#L106
        const { altKey, ctrlKey, metaKey, shiftKey, button, defaultPrevented } = event
        // don't handle with control keys
        if (metaKey || altKey || ctrlKey || shiftKey) { return }
        // don't handle when preventDefault called
        if (defaultPrevented) { return }
        // don't handle right clicks
        if (button !== undefined && button !== 0) { return }
        // don't handle if `target="_blank"`
        if (target && target.getAttribute) {
          const linkTarget = target.getAttribute('target')
          if (/\b_blank\b/i.test(linkTarget)) { return }
        }
        // don't handle same page links/anchors
        const params = new URLSearchParams(target.search)
        const hashtag = params.get('hashtag')
        event.preventDefault()
        this.$router.push({ name: 'search', query: { hashtag } })
      }
    }
  }
}
</script>
