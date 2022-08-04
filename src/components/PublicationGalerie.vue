<template>
  <div class="publication-galerie">
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
          :image="{
            url: media.url,
            alt: media.alt,
          }"
          @galerie="__set_modaleData"
        />
      </li>
    </ul>
    <div
      v-if="modaleData"
      class="container-modal publication-galerie-full-container"
      @click.self="__set_modaleData(null)"
    >
      <button type="button" class="button-round" @click.prevent="__set_modaleData(null)">
        <span class="button-round-icon">
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </span>
      </button>
      <figure class="modale">
        <img id="publication-galerie-full-image" :src="modaleData.url" :alt="modaleData.alt" />
      </figure>
    </div>
  </div>
</template>

<script>
import PublicationImage from '@/components/PublicationImage'
export default {
  name: 'PublicationGalerie',
  components: { PublicationImage },
  props: {
    medias: { type: Array, required: true }
  },
  data () {
    return {
      modaleData: null
    }
  },
  methods: {
    __set_modaleData (value) {
      this.modaleData = value
    }
  }
}
</script>

<style lang="scss">
.publication-galerie-full-container{
  cursor: default;
  .modale{
    padding: 0;
    margin: 40px 0 ;
  }
  #publication-galerie-full-image{
    width: 100%;
    cursor: default;
  }
}
</style>
