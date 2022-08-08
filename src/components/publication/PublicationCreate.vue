<template>
  <section class="item-container">
    <header class="modale-header">
      <button class="button-round" @click.prevent="$emit('emitClose')">
        <span class="button-round-icon">
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </span>
      </button>
    </header>
    <ItemPublication v-if="parentPublication" class="parent-publication" :publication="parentPublication" :is-parent="true" />
    <main class="publication-body">
      <ProfilePicture :name="$store.state.auth.user?.name" :src="$store.state.auth.user?.avatar" />
      <div class="publication-content">
        <TipTap class="publication-tiptap" v-model="content" />
        <ul
          v-if="type === 'image'"
          class="publication-medias"
          :class="{'publication-medias-multiple': medias.length > 1}"
        >
          <li
            v-for="(media, i) of medias"
            :key="i"
            class="publication-medias-item"
          >
            <PublicationImage
              button="Retirer l'image"
              :image="{
                url: __create_url(media),
                alt: media.name
              }"
              @emitButton="__remove_media(media)"
            />
          </li>
        </ul>
        <PublicationVideo
          v-else-if="type === 'video'"
          button="Retirer la vidéo"
          :video="{
            src: __create_url(medias[0]),
            type: medias[0].type
          }"
          @emitButton="__remove_media(medias[0])"
        />
        <div class="publication-footer flex-b">
          <input
            :id="`file-publication${inputFileIdentifier}`"
            class="input-file"
            ref="file-input"
            type="file"
            name="Envois de médias"
            accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime"
            multiple
            @change="__set_medias"
          >
          <label class="button-round" :for="`file-publication${inputFileIdentifier}`">
            <span class="button-round-icon">
              <font-awesome-icon icon="fa-solid fa-image" />
            </span>
          </label>
          <button
            class="button-primary"
            @click.prevent="__post_publication"
            v-text="buttonText"
          />
        </div>
        <p v-if="error" class="error-message" v-text="error" />
      </div>
    </main>
  </section>
</template>

<script>
import ProfilePicture from '@/components/profile/ProfilePicture'
import TipTap from '@/components/fields/TipTap'
import { defineAsyncComponent } from 'vue'

export default {
  name: 'PublicationCreate',
  components: {
    ProfilePicture,
    TipTap,
    PublicationImage: defineAsyncComponent(() => import('@/components/publication/PublicationImage')),
    PublicationVideo: defineAsyncComponent(() => import('@/components/publication/PublicationVideo')),
    ItemPublication: defineAsyncComponent(() => import('@/components/publication/ItemPublication'))
  },
  props: {
    parentPublication: { type: [Object, Boolean], default: false }
  },
  data () {
    return {
      content: '',
      medias: [],
      type: null,
      error: null
    }
  },
  computed: {
    tags () {
      const regexp = /\B#\w+\b/g
      const arr = this.content.match(regexp)
      return [...new Set(arr)]
    },
    buttonText () {
      return this.parentPublication ? 'Répondre' : 'Envoyer'
    },
    inputFileIdentifier () {
      return this.parentPublication ? `-${this.parentPublication.id}` : ''
    }
  },
  methods: {
    __post_publication () {
      const formData = new FormData()
      this.medias.forEach((file) => {
        formData.append('files[]', file, file.name)
      })
      formData.append('content', this.content)
      if (this.parentPublication) {
        formData.append('parentId', this.parentPublication.id)
      }
      for (const tag of this.tags) {
        formData.append('tags[]', tag)
      }
      if (this.content) {
        this.axios.post(
          'publications/add',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
          .then(() => {
            this.content = ''
            this.medias = []
            this.$emit('fetchPublications')
            this.$emit('emitClose')
          })
      }
    },
    __set_medias () {
      this.error = null
      const medias = [...this.$refs['file-input'].files]
      this.type = this.__get_media_type(medias[0])
      if (medias.length > 2) {
        this.error = 'Vous ne pouvez pas poster plus de 2 fichiers.'
        return
      }
      if (!medias.every((media) => this.__get_media_type(media) === this.type)) {
        this.error = 'Veuillez sélectionner soit 1 vidéo soit 4 images.'
        this.type = null
        return
      }
      if (!medias.every((media) => media.name.match(/\.(jpg|jpeg|png|gif|webp|mp4|mov|m4v|avi)$/))) {
        this.error = 'Le format de fichier sélectionner est invalide.'
        this.type = null
        return
      }
      if (medias.every((media) => (media.size / 1000000).toPrecision(3) > 20)) { // MegaOctet
        this.error = 'Un fichier est trop lourd.'
        this.type = null
        return
      }
      for (const media of medias) {
        this.medias.push(media)
      }
    },
    __get_media_type (file) {
      return file.type.split('/')[0]
    },
    __remove_media (media) {
      const indexOfMediaToRemove = this.medias.indexOf(media)
      this.medias.splice(indexOfMediaToRemove, 1)
      if (this.medias.length === 0) {
        this.type = null
      }
    },
    __create_url (media) {
      return URL.createObjectURL(media)
    }
  }
}
</script>

<style lang="scss">
.modale {
  .publication-container{
    padding: 0;
    border-bottom: none;
  }

  .modale-header{
    position: sticky;
    top: 0;
    display: block;
    margin-bottom: 20px;
    background-color: var(--header-color);
    z-index: 10;
  }

  .ProseMirror{
    min-height: 100px;
  }
}

.publication-tiptap{
  margin-top: 10px;
}

.modale-header{
  display: none;
}

.publication-content{
  .ProseMirror{
    width: 100%;
    min-height: 50px;
  }
}
</style>
