<template>
  <main class="main-container">
    <Header
      title="Publication"
    />
    <article v-if="!initLoading" class="item-container publication-single">
      <header class="publication-single-header">
        <ProfilePicture :name="publication.user.name" />
        <div>
          <p class="profile-username" v-text="publication.user.username" />
          <p class="profile-name" v-text="`@${publication.user.name}`" />
        </div>
      </header>
      <main class="publication-main" v-html="publication.content" />
      <PublicationGalerie v-if="publication.medias" :medias="publication.medias" />
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
    <CreatePublication />
    <section v-if="commentModal" class="container-modal" @click.self="commentModal = false">
      <div class="modale">
        <CreatePublication
          @emitClose="commentModal = false"
          :parentPublication="publication"
        />
      </div>
    </section>
    <section v-if="publication?.comments">
      <ItemPublication
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
import Header from '@/components/Header'
import ItemPublication from '@/components/ItemPublication'
import NavMenu from '@/components/NavMenu'
import ProfilePicture from '@/components/ProfilePicture'
import ButtonPublicationAction from '@/components/buttons/buttonPublicationAction'
import { defineAsyncComponent } from 'vue'

export default {
  name: 'PublicationView',
  components: {
    ProfilePicture,
    NavMenu,
    ItemPublication,
    Header,
    ButtonPublicationAction,
    CreatePublication: defineAsyncComponent(() => import('@/components/CreatePublication')),
    PublicationGalerie: defineAsyncComponent(() => import('@/components/PublicationGalerie'))
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
        .catch((e) => {
          console.log(e)
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
        })
        .catch((e) => {
          this.likeIsLoading = false
          console.log(e)
        })
    },
    __postComment () {
      this.commentModal = true
    }
  }
}
</script>

<style lang="scss">
.publication-single{
  border: none;
  &-header{
    display: flex;
    margin-bottom: 20px;
    div:first-child{
      margin-right: 20px;
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
