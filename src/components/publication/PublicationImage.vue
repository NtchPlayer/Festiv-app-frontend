<template>
  <div class="publication-media-item">
    <button
      v-if="button"
      type="button"
      :title="button"
      class="button-round button-black publication-media-button"
      @click.prevent="$emit('emitButton')"
    >
      <span class="button-round-icon">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </span>
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
  cursor: pointer;
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
  left: 5px;
  top: 5px;
}
</style>
