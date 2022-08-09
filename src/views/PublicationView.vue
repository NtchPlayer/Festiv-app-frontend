<template>
  <main class="main-container">
    <MainHeader title="Publication" />
    <LoaderItem v-if="initLoading"/>
    <template v-else>
      <article class="item-container publication-single">
        <header class="publication-single-header">
          <div class="publication-single-header-user">
            <ProfilePicture :name="publication.user.name" :src="publication.user.avatar?.url" />
            <div>
              <p class="profile-username" v-text="publication.user.username" />
              <p class="profile-name" v-text="`@${publication.user.name}`" />
            </div>
          </div>
          <OptionMenu
            v-if="parseInt(publication.user.id) === $store.state.auth.user?.id"
            :actions="[{
            class: 'color-red',
            icon: 'fa-regular fa-trash-can',
            label: 'Supprimer la publication',
            function: 'deletePost'
          }]"
            @deletePost="__deletePost"
          />
        </header>
        <main class="publication-main" v-html="contentFormatted" />
        <template v-if="publication.medias">
          <PublicationGalerie v-if="mediaType === 'image'" :medias="publication.medias" />
          <PublicationVideo v-else :video="{ src: publication.medias[0].url, type: publication.medias[0].type }" />
        </template>
        <footer class="publication-footer">
          <time
            class="publication-time"
            v-text="$filters.timeFilter(publication.createdAt)"
          />
        </footer>
        <div class="publication-action">
          <ButtonPublicationAction
            :class-to-add="`button-heart ${isLike ? 'button-heart-like' : ''}`"
            :icon="`${this.isLike ? 'fa-solid' : 'fa-regular'} fa-heart`"
            :count="countLike"
            :disabled="likeIsLoading"
            @emitClick="__likePublication"
          />
          <ButtonPublicationAction
            icon="fa-solid fa-comment"
            :count="parseInt(publication.countComments)"
            @emitClick="__postComment"
          />
        </div>
      </article>
      <PublicationCreate />
    </template>
    <section v-if="commentModal" class="container-modal" @click.self="commentModal = false">
      <div class="modale">
        <PublicationCreate
          @emitClose="commentModal = false"
          :parentPublication="publication"
        />
      </div>
    </section>
    <section v-if="publication?.comments">
      <PublicationItem
        v-for="comment of publication?.comments"
        :key="comment.id"
        :publication="comment"
        @deletePublication="__backToHome"
      />
    </section>
    <NavMenu />
  </main>
</template>

<script>
import MainHeader from '@/components/MainHeader'
import PublicationItem from '@/components/publication/PublicationItem'
import NavMenu from '@/components/MainNav'
import ProfilePicture from '@/components/profile/ProfilePicture'
import ButtonPublicationAction from '@/components/buttons/buttonPublicationAction'
import OptionMenu from '@/components/OptionMenu'
import { defineAsyncComponent } from 'vue'
import LoaderItem from '@/components/LoaderItem'
import { useHead } from '@vueuse/head'

export default {
  name: 'PublicationView',
  components: {
    LoaderItem,
    ProfilePicture,
    NavMenu,
    PublicationItem,
    MainHeader,
    ButtonPublicationAction,
    OptionMenu,
    PublicationCreate: defineAsyncComponent(() => import('@/components/publication/PublicationCreate')),
    PublicationGalerie: defineAsyncComponent(() => import('@/components/publication/PublicationGalerie')),
    PublicationVideo: defineAsyncComponent(() => import('@/components/publication/PublicationVideo'))
  },
  data () {
    return {
      publication: null,
      initLoading: true,
      isLike: false,
      countLike: 0,
      likeIsLoading: true,
      commentModal: false
    }
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
    mediaType () {
      return this.publication.medias[0].type.split('/')[0]
    }
  },
  mounted () {
    this.__fetchPost(this.$route.params.publicationId)
  },
  watch: {
    '$route.params.publicationId' () {
      if (this.$route.params.publicationId) {
        this.__fetchPost(this.$route.params.publicationId)
      }
    }
  },
  methods: {
    async __fetchPost (id) {
      await this.axios.get(`publications/${id}`)
        .then((res) => {
          this.initLoading = false
          this.publication = res.data
          this.isLike = res.data.isLike
          this.countLike = parseInt(res.data.countLike)
          this.likeIsLoading = false
        })
        .catch(() => {
          this.$router.push({ name: 'home' })
          this.$store.dispatch('notifications/emitNotification', {
            content: 'Une erreur de chargement est survenue.',
            style: 'red'
          })
        })
    },
    __backToHome () {
      this.$router.push({ name: 'home' })
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
            content: 'Une erreur est survenue, veuillez réessayer plus tard.',
            style: 'red'
          })
        })
    },
    __postComment () {
      this.commentModal = true
    },
    __deletePost () {
      this.axios.delete(`publications/${this.publication.id}`)
        .then(() => {
          this.$router.push({ name: 'home' })
          this.$store.dispatch('notifications/emitNotification', {
            content: 'La publication a été supprimée',
            style: 'green'
          })
        })
        .catch(() => {
          this.$store.dispatch('notifications/emitNotification', {
            content: 'Une erreur est survenue, veuillez réessayer plus tard.',
            style: 'red'
          })
        })
    }
  },
  setup () {
    useHead({
      title: ' | Publication'
    })
  }
}
</script>

<style lang="scss">
.publication-single{
  border: none;
  &-header{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    &-user{
      display: flex;
      .container-profile-picture{
        margin-right: 20px;
      }
    }
    .profile-username{
      font-size: 1rem;
      margin: 0;
    }
  }
  .publication-main{
    font-size: 1.2rem;
  }
  .publication-action{
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    padding: 5px 0;
    border-top: 1px solid var(--grey-light);
    border-bottom: 1px solid var(--grey-light);
  }
}
</style>
