<template>
  <div class="container-input">
    <label class="label" for="birthday">
      Date de naissance
    </label>
    <input
      id="birthday"
      ref="input"
      v-model="birthday"
      class="input"
      :class="{'input-error': birthdayIsValid}"
      type="date"
      name="Field Birthday"
      :max="minAge"
    >
    <div v-show="!birthdayIsValid && modelValue !== null" class="container-warning-field">
      <span class="color-red">
        <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
      </span>
      Vous devez avoir plus de 13 ans !
    </div>
  </div>
</template>

<script>
import { useModelWrapper } from '@/utils/modelWrapper'

export default {
  name: 'FieldBirthday',
  props: {
    modelValue: { type: [String, null], required: true }
  },
  computed: {
    minAge () {
      const currentDate = new Date()
      const year = currentDate.getFullYear() - 13
      let month = currentDate.getMonth() + 1
      if (month < 10) {
        month = `0${month}`
      }
      let day = currentDate.getDate()
      if (day < 10) {
        day = `0${day}`
      }
      return `${year}-${month}-${day}`
    },
    birthdayIsValid () {
      return this.birthday <= this.minAge
    }
  },
  watch: {
    birthdayIsValid () {
      this.$emit('birthdayIsValid', this.birthdayIsValid)
    }
  },
  setup (props, { emit }) {
    return {
      birthday: useModelWrapper(props, emit)
    }
  }
}
</script>
