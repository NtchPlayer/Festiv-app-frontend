<template>
  <div class="container-input">
    <label class="label" for="hashtags">
      Quelles sont les hashtags pour identifier votre festival ?
    </label>
    <div class="tags-input">
      <input
        id="hashtags"
        v-model.trim="newTag"
        type="text"
        class="input"
        placeholder="#Solidays"
        maxlength="50"
        @keydown.enter.prevent="addTag(newTag)"
        @keydown.prevent.tab="addTag(newTag)"
        @keydown.delete="newTag.length || removeTag(tags.length - 1)"
        :style="{ 'padding-left': `${paddingLeft}px` }"
      />
      <ul class="tags" ref="tagsUl">
        <li
          v-for="(tag, index) in tags"
          :key="tag" class="tag"
          :class="{
            duplicate: tag === duplicate,
            invalid: tag === invalid
          }">
          {{ tag }}
          <button type="button" class="delete" @click="removeTag(index)">
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </li>
      </ul>
    </div>
    <div v-show="error" class="container-warning-field">
      <span class="red">
        <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
      </span>
      Votre tag:
      <ul class="list-warning">
        <li
          class="item-list-warning"
          v-text="'doit commencer par le symbole #'"
        />
        <li
          class="item-list-warning"
          v-text="'ne doit pas contenir plus de 50 caractère'"
        />
        <li
          class="item-list-warning"
          v-text="'ne doit contenir aucun espace, caractère spécial ou accent'"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import { nextTick, onMounted, ref, watch } from 'vue'

export default {
  props: {
    modelValue: { type: Array, default: () => [] }
  },
  setup (props, { emit }) {
    const tags = ref(props.modelValue)
    const newTag = ref('')
    const paddingLeft = ref(10)
    const tagsUl = ref(null)
    const error = ref(false)

    const addTag = (tag) => {
      error.value = false
      if (!tag) {
        return
      }
      if (tags.value.includes(tag)) {
        handleDuplicate(tag)
        return
      }
      if (!/^\B(#[0-z]+\b)(?!;)$/g.test(tag) || tag.length > 50) {
        handleInvalid(tag)
        return
      }
      tags.value.push(tag) // add the new tag to the tags array
      newTag.value = ''
    }

    const removeTag = (index) => {
      tags.value.splice(index, 1)
    }

    const onTagsChange = () => {
      // set left padding
      const extraCushion = 15
      paddingLeft.value = tagsUl.value.clientWidth + extraCushion

      // scroll tags ul to end
      tagsUl.value.scrollTo(tagsUl.value.scrollWidth, 0)

      // emit tags
      emit('update:modelValue', tags.value)
    }

    const duplicate = ref(null)
    const handleDuplicate = (tag) => {
      duplicate.value = tag
      setTimeout(() => (duplicate.value = null), 1000)
      newTag.value = ''
    }

    const handleInvalid = (tag) => {
      error.value = true
      setTimeout(() => (error.value = false), 5000)
      newTag.value = tag
    }

    watch(tags, () => nextTick(onTagsChange), { deep: true })

    onMounted(onTagsChange)

    return {
      tags,
      newTag,
      paddingLeft,
      tagsUl,
      duplicate,
      error,
      addTag,
      removeTag,
      onTagsChange
    }
  }
}
</script>

<style lang="scss">
.tags-input{
  position: relative;
  input{
    width: 100%;
    padding: 10px;
  }
  .tags {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 7px;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 10px;
    max-width: 80%;
    overflow-x: auto;
    .tag{
      background: var(--blue-light-color);
      padding: 2px 5px;
      border-radius: 3px;
      color: white;
      white-space: nowrap;
      transition: 0.1s ease background;
    }
    .delete {
      color: white;
      background: none;
      outline: none;
      cursor: pointer;
      border: none;
      padding: 3px;
      transition-duration: var(--transition-duration);
      font-size: .8rem;
      &:hover{
        color: var(--red-color);
      }
    }
    @keyframes shake {
      10%,
      90% {
        transform: scale(0.9) translate3d(-1px, 0, 0);
      }

      20%,
      80% {
        transform: scale(0.9) translate3d(2px, 0, 0);
      }

      30%,
      50%,
      70% {
        transform: scale(0.9) translate3d(-4px, 0, 0);
      }

      40%,
      60% {
        transform: scale(0.9) translate3d(4px, 0, 0);
      }
    }
    .tag.duplicate {
      background: var(--red-color);
      animation: shake 1s;
    }
    .tag.invalid {
      background: var(--red-color);
      animation: shake 1s;
    }
  }
}
</style>
