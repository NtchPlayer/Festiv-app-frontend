<template>
  <div class="publication-media-item">
    <button
      v-if="button"
      type="button"
      :title="button"
      class="publication-media-button"
      @click.prevent="$emit('emitButton')"
    >
      <font-awesome-icon icon="fa-solid fa-xmark" />
    </button>
    <figure class="publication-media-thumb" @click.prevent="$emit('galerie', { url: image.url, alt: image.alt })">
      <img
        class="publication-media-image"
        :src="image.url"
        :alt="image.alt"
      />
    </figure>
  </div>
</template>

<script>
export default {
  name: 'PublicationImage',
  props: {
    button: { type: [String, Boolean], default: false },
    image: { type: Object, required: true }
  }
}
</script>

<style lang="scss">
.publication-media-item{
  position: relative;
}

.publication-media-thumb{
  height: 100%;
}

.publication-media-image{
  object-fit: cover;
  width: 100%;
  border-radius: var(--border-radius);
}

.publication-media-button{
  position: absolute;
  z-index: 5;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  margin: 5px;
  padding: 5px 11.25px;
  border-radius: 50px;
  transition-duration: var(--transition-duration);
  backdrop-filter: blur(5px);
  &:hover{
    background-color: rgba(35, 34, 34, 0.5);
  }
}
</style>
