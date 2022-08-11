<template>
  <div>
    <article class="publication-body" :class="{'item-container publication-hover': !isParent}" @click.prevent="__openPublication">
      <aside class="publication-aside">
        <ProfilePicture :name="publication.user.name" :src="publication.user.avatar?.url" />
        <div v-if="isParent" class="publication-answer-lane" />
      </aside>
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
                class="publication-time"
                v-text="$filters.timeFilter(publication.createdAt, true, true)"
              />
            </p>
          </div>
          <OptionMenu
            v-if="parseInt(publication.user.id) === $store.state.auth.user?.id && !isParent"
            :actions="[{
              class: 'color-red',
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
          <template v-if="!isParent && publication.medias">
            <PublicationGalerie v-if="mediaType === 'image'" :medias="publication.medias" />
            <PublicationVideo v-else :video="{ src: publication.medias[0].url, type: publication.medias[0].type }" />
          </template>
        </main>
        <footer v-if="!isParent" class="publication-footer">
          <ButtonPublicationAction
            :class-to-add="`button-heart ${isLike ? 'button-heart-like' : ''}`"
            :icon="`${heartIconStyle} fa-heart`"
            :count="countLike"
            :disabled="likeIsLoading"
            @emitClick="__likePublication"
          />
          <ButtonPublicationAction
            icon="fa-solid fa-comment"
            :count="parseInt(publication.countComments)"
            @emitClick="__postComment"
          />
        </footer>
        <p v-else class="publication-answer">
          En réponse à <span class="color-blue">@{{ publication.user.name }}</span>
        </p>
      </div>
    </article>
    <section v-if="commentModal && !isParent" class="container-modal" @click.self="comments = false">
      <div class="modale">
        <PublicationCreate
          @emitClose="commentModal = false"
          :parentPublication="publication"
        />
      </div>
    </section>
  </div>
</template>

<script>
import ProfilePicture from '@/components/profile/ProfilePicture'
import OptionMenu from '@/components/OptionMenu'
import ButtonPublicationAction from '@/components/buttons/ButtonPublicationAction'
import { defineAsyncComponent } from 'vue'

export default {
  name: 'PublicationItem',
  components: {
    OptionMenu,
    ButtonPublicationAction,
    ProfilePicture,
    PublicationGalerie: defineAsyncComponent(() => import('@/components/publication/PublicationGalerie')),
    PublicationCreate: defineAsyncComponent(() => import('@/components/publication/PublicationCreate')),
    PublicationVideo: defineAsyncComponent(() => import('@/components/publication/PublicationVideo'))
  },
  props: {
    publication: { type: Object, required: true },
    isParent: { type: Boolean, default: false }
  },
  computed: {
    contentFormatted () {
      let formatted = this.publication.content
      if (!this.hashtags) {
        return this.publication.content
      }
      this.hashtags.forEach((hashtag) => {
        formatted = formatted.replace(new RegExp(`${hashtag}`, 'g'), () => `<span class="color-blue"><a href="/search?hashtag=${hashtag.substring(1)}">${hashtag}</a></span>`)
      })
      return formatted
    },
    hashtags () {
      const regexp = /\B#\w+\b/g
      const arr = this.publication.content.match(regexp)
      return [...new Set(arr)]
    },
    heartIconStyle () {
      return this.isLike ? 'fa-solid' : 'fa-regular'
    },
    mediaType () {
      return this.publication.medias[0].type.split('/')[0]
    }
  },
  data () {
    return {
      isLike: this.publication.isLike,
      countLike: parseInt(this.publication.countLike),
      likeIsLoading: false,
      commentModal: false
    }
  },
  methods: {
    __deletePost () {
      this.axios.delete(`publications/${this.publication.id}`)
        .then(() => {
          this.$emit('deletePublication')
          this.$store.dispatch('notifications/emitNotification', {
            content: 'La publication a été supprimée.',
            style: 'green'
          })
        })
        .catch(() => {
          this.$store.dispatch('notifications/emitNotification', {
            content: 'Une erreur est survenue.',
            style: 'red'
          })
        })
    },
    __postComment () {
      this.commentModal = true
    },
    __likePublication () {
      const action = this.isLike ? 'delete' : 'post'
      this.likeIsLoading = true
      this.axios[action](`publications/like/${this.publication.id}`)
        .then(() => {
          this.likeIsLoading = false
          this.isLike = !this.isLike
          if (this.isLike) {
            this.countLike++
          } else {
            this.countLike--
          }
        })
        .catch(() => {
          this.likeIsLoading = false
          this.$store.dispatch('notifications/emitNotification', {
            content: 'Une erreur est survenue.',
            style: 'red'
          })
        })
    },
    __openPublication () {
      if (this.isParent) {
        return
      }
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
