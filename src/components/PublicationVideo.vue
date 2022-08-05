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
    <figure class="publication-media-thumb">
      <video class="publication-media-video" controls>
        <source :src="video.src" :type="video.type">
        <p>Votre navigateur ne prend pas en charge les vidéos.</p>
      </video>
    </figure>
  </div>
</template>

<script>
export default {
  name: 'PublicationVideo',
  props: {
    button: { type: [String, Boolean], default: false },
    video: { type: Object, required: true }
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
.publication-media-video{
  width: 100%;
  border-radius: var(--border-radius);
}
</style>
