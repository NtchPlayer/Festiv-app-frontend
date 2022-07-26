<template>
  <editor-content :editor="editor" />
</template>

<script>
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'

export default {
  components: {
    EditorContent
  },

  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue'],

  data () {
    return {
      editor: null
    }
  },

  watch: {
    modelValue (value) {
      // HTML
      const isSame = this.editor.getHTML() === value

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
          placeholder: 'Write something …'
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
