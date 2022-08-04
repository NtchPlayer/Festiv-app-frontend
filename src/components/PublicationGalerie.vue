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
      <figure class="modale" @click.self="__set_modaleData(null)">
        <img
          id="publication-galerie-full-image"
          @click.self="__set_modaleData(null)"
          :src="modaleData.url"
          :alt="modaleData.alt"
        />
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
    margin: 40px 0;
    width: unset;
    max-height: 100vh;
    background: transparent;
  }
  #publication-galerie-full-image{
    cursor: default;
    object-fit: contain;
    height: 100vh;
    width: 100vw;
    max-width: 1200px;
  }
  .button-round{
    position: absolute;
    z-index: 5;
    left: 20px;
    top: 20px;
    color: #fff;
    &-icon{
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(5px);
    }
    &:hover .button-round-icon{
      background-color: rgba(35, 34, 34, 0.5);
    }
  }
}
</style>
