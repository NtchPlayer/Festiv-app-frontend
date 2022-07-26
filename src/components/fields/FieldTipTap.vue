<template>
  <div>
    <p v-if="label" class="label" v-text="label" />
    <editor-content
      :class="{'input input-shaping': label}"
      :editor="editor"
    />
  </div>
</template>

<script>
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'

export default {
  name: 'FieldTipTap',
  components: {
    EditorContent
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    label: {
      type: [String, Boolean],
      default: false
    },
    limit: { type: Number, default: 500 }
  },
  emits: ['update:modelValue', 'charactersCount'],
  data () {
    return {
      editor: null
    }
  },
  watch: {
    modelValue (value) {
      // HTML
      const isSame = this.editor.getHTML() === value
      this.$emit('charactersCount', this.editor.storage.characterCount.characters())

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    }
  },
  mounted () {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Placeholder.configure({
          // Use a placeholder:
          placeholder: 'Envie de partager quelque chose ?'
        }),
        CharacterCount.configure({
          limit: this.limit
        })
      ],
      content: this.modelValue,
      onUpdate: () => {
        // HTML
        if (this.editor.getHTML() === '<p></p>') {
          return this.$emit('update:modelValue', '')
        }
        this.$emit('update:modelValue', this.editor.getHTML())

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      }
    })
  },
  beforeUnmount () {
    this.editor.destroy()
  }
}
</script>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  word-wrap: anywhere !important;
  height: 100%;
  &:focus{
    outline: none;
  }
  > * + * {
    margin-top: 0.75em;
  }
}

/* Placeholder (at the top) */
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}

/* Placeholder (on every new line) */
/*.ProseMirror p.is-empty::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}*/
</style>
