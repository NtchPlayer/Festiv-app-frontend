<template>
  <div
    class="container-profile-picture"
    :class="{
      'profile-picture-large': largeIcon,
      'container-profile-picture-hover': !isEditable
    }"
  >
    <component
      :is="isEditable ? 'div' : 'router-link'"
      :to="isEditable ? null : { name: 'profile', params: { name }}"
    >
      <figure>
        <img
          class="profile-picture"
          alt="Photo de profile de l'utilisateur"
          :src="src"
        >
        <div v-if="isEditable">
        <label class="button-round button-black" for="profile-image">
          <span class="button-round-icon">
            <font-awesome-icon icon="fa-solid fa-image" />
          </span>
        </label>
        <input
          id="profile-image"
          class="input-file"
          type="file"
          ref="input-profile"
          accept="image/jpeg,image/png,image/webp"
          @change="__emitFile"
        >
        </div>
      </figure>
    </component>
  </div>
</template>

<script>
export default {
  name: 'ProfilePicture',
  props: {
    src: { type: String, default: require('@/assets/default-profile-picture.jpg') },
    name: { type: String, required: true },
    largeIcon: { type: Boolean, default: false },
    isEditable: { type: Boolean, default: false }
  },
  methods: {
    __emitFile () {
      const media = this.$refs['input-profile'].files[0]
      if (!media.name.toLowerCase().match(/\.(jpg|jpeg|png|webp)$/)) {
        this.$store.dispatch('notifications/emitNotification', {
          content: "L'extension du fichier sélectionné est invalide.",
          style: 'red'
        })
        return
      }
      if ((media.size / 1000000).toPrecision(3) > 20) { // MegaOctet
        this.$store.dispatch('notifications/emitNotification', {
          content: "L'image sélectionnée est trop lourde.",
          style: 'red'
        })
        return
      }
      this.$emit('emitFile', media)
    }
  }
}
</script>

<style lang="scss">
.container-profile-picture{
  width: 45px;
  min-width: 45px;
  max-width: 45px;
  height: 45px;
  min-height: 45px;
  max-height: 45px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  transition-duration: var(--transition-duration);
  div,
  a,
  figure{
    height: 100%;
  }
  &-hover:hover{
    filter: brightness(.8);
  }
  .button-round{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.profile-picture{
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
  &-large{
    width: 100px;
    min-width: 100px;
    max-width: 100px;
    height: 100px;
    min-height: 100px;
    max-height: 100px;
  }
}
</style>
