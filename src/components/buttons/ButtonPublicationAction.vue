<template>
  <button
    type="button"
    :disabled="disabled"
    class="button-round"
    :class="classToAdd"
    @click.prevent="$emit('emitClick')"
  >
    <span class="button-round-icon">
      <font-awesome-icon :icon="icon" />
    </span>
    <span v-show="count" class="button-round-count" v-text="count" />
  </button>
</template>

<script>
export default {
  name: 'ButtonPublicationAction',
  props: {
    icon: { type: String, required: true },
    classToAdd: { type: String },
    count: { type: Number, default: 0 },
    disabled: { type: Boolean, default: false }
  }
}
</script>
