<template>
  <section class="container-modal" @click.self="$emit('cancel')">
    <div class="modale item-container confirm-modale">
      <p class="confirm-modale-text" v-text="message" />
      <p class="container-modal-container-button">
        <button
          class="container-modal-button container-modal-button-confirm"
          type="button"
          v-text="confirm"
          @click.prevent="$emit('confirm')"
        />
        <button
          class="container-modal-button container-modal-button-cancel"
          type="button"
          v-text="cancel"
          @click.prevent="$emit('cancel')"
        />
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ConfirmModale',
  props: {
    message: { type: String, required: true },
    confirm: { type: String, default: 'Confirmer' },
    cancel: { type: String, default: 'Annuler' }
  }
}
</script>

<style lang="scss">
.confirm-modale{
  padding: 30px 50px;
  min-width: unset;
  width: unset;
}
.confirm-modale-text{
  text-align: center;
  margin-bottom: 20px;
}
.container-modal-container-button{
  text-align: center;
}

.container-modal-button{
  border: 1px solid var(--grey-light);
  padding: 10px 0;
  border-radius: 3px;
  min-width: 120px;
  margin: 0 10px;
  transition-duration: var(--transition-duration);
  &-confirm{
    border-color: var(--red-color);
    &:hover{
      background-color: var(--red-color);
      color: #fff;
    }
  }
  &-cancel{
    &:hover{
      border-color: var(--grey-dark);
    }
  }
}
</style>
