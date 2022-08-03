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
      <ProfilePicture :name="$store.state.auth.user.name" />
      <div class="publication-content">
        <TipTap class="publication-tiptap" v-model="content" />
        <ul
          v-if="medias.length"
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
        <div class="publication-footer flex-b">
          <input
            id="file-publication"
            ref="file-input"
            type="file"
            name="Envois de médias"
            multiple
            accept=".jpg,.jpeg,.png,.gif"
            @change="__set_images"
          >
          <label class="button-round" for="file-publication">
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
      </div>
    </main>
  </section>
</template>

<script>
import ProfilePicture from '@/components/ProfilePicture'
import TipTap from '@/components/field/TipTap'
import PublicationImage from '@/components/PublicationImage'
import { defineAsyncComponent } from 'vue'

export default {
  name: 'CreatePublication',
  components: {
    PublicationImage,
    TipTap,
    ProfilePicture,
    ItemPublication: defineAsyncComponent(() =>
      import('@/components/ItemPublication')
    )
  },
  props: {
    parentPublication: { type: [Object, Boolean], default: false }
  },
  data () {
    return {
      content: '',
      medias: []
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
    __set_images () {
      [...this.$refs['file-input'].files].forEach((file) => {
        this.medias.push(file)
      })
    },
    __remove_media (media) {
      const indexOfMediaToRemove = this.medias.indexOf(media)
      this.medias.splice(indexOfMediaToRemove, 1)
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
    display: block;
    margin-bottom: 20px;
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
