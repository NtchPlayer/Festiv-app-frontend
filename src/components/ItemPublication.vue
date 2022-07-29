<template>
  <article class="item-container publication-body publication-hover">
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
        <OptionMenu
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
          v-html="publication.content"
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
