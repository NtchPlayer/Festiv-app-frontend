<template>
  <div
    class="container-character-count"
    :class="{
      'character-count-is-warning': isWarning,
      'character-count-is-full': isFull
    }"
  >
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      class="character-container-svg"
    >
      <circle
        class="character-count-circle character-count-circle-template"
        cx="50"
        cy="50"
        r="50"
        stroke-width="10"
      />
      <circle
        class="character-count-circle character-count-circle-completion"
        cx="50"
        cy="50"
        r="50"
        stroke-width="10"
        :style="{'stroke-dashoffset': strokeDashoffset}"
      />
    </svg>
    <span v-show="isWarning" class="character-count-number" v-text="remainingCharacters" />
  </div>
</template>

<script>
export default {
  name: 'CharactersCount',
  props: {
    charactersCount: { type: Number, required: true },
    limit: { type: Number, required: true }
  },
  data () {
    return {
      warningLimit: 30
    }
  },
  computed: {
    percentage () {
      return Math.trunc(100 * this.charactersCount / this.limit)
    },
    strokeDashoffset () {
      return 315 - (315 * this.percentage) / 100
    },
    warningPercentage () {
      return 100 - Math.trunc(100 * this.warningLimit / this.limit)
    },
    isWarning () {
      return this.percentage > this.warningPercentage
    },
    isFull () {
      return this.percentage === 100
    },
    remainingCharacters () {
      return this.limit - this.charactersCount
    }
  }
}
</script>

<style lang="scss">
.container-character-count{
  position: relative;
  width: 35px;
  height: 35px;
  margin-right: 10px;
  display: flex;
  align-self: center;
}

.character-container-svg{
  overflow: visible;
  transform: rotate(-90deg);
  border-bottom: 1px solid var(--grey-light);
  padding-bottom: 10px;
}

.character-count-circle{
  position: absolute;
  top: 50%;
  left: 50%;
  fill: none;
  stroke-dasharray: 315;
  stroke-dashoffset: 315;
  transition-duration: var(--transition-duration);
  &-template{
    stroke-dashoffset: 0;
    stroke: var(--grey-light);
  }
  &-completion{
    stroke: var(--blue-light-color);
  }
}

.character-count-number{
  font-size: .8rem;
  position: absolute;
  top: 50%;
  left: calc(50% - 5px);
  transform: translate(-50%, -50%);
  transition-duration: var(--transition-duration);
}

.character-count-is-warning{
  .character-count-circle-completion{
    stroke: var(--orange-color);
  }
}

.character-count-is-full{
  .character-count-circle-completion{
    stroke: var(--red-color);
  }
  .character-count-number{
    color: var(--red-color);
  }
}
</style>
