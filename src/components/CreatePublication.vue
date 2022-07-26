<template>
  <div class="publication-container">
    <header class="modale-header">
      <button class="button-round" @click.prevent="$emit('emitClose')">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </button>
    </header>
    <main class="publication-body">
      <ProfilePicture :name="$store.state.auth.user.username" />
      <div class="publication-content">
        <TipTap v-model="content" />
        <div class="publication-footer">
          <input id="file-publication" type="file">
          <label class="button-round" for="file-publication">
            <font-awesome-icon icon="fa-solid fa-image" />
          </label>
          <button
            class="button-primary"
            @click.prevent="postPublication"
            :disabled="!Boolean(content)"
          >
            Envoyer
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import ProfilePicture from '@/components/ProfilePicture'
import TipTap from '@/components/field/TipTap'

export default {
  name: 'CreatePublication',
  components: {
    TipTap,
    ProfilePicture
  },
  data () {
    return {
      content: ''
    }
  },
  methods: {
    postPublication () {
      this.axios.post('publications/add', {
        content: this.content
      })
        .then(() => {
          this.content = ''
        })
    }
  }
}
</script>

<style lang="scss">
.modale {
  .publication-container{
    padding: 0;
    border-bottom: none;
  }

  .modale-header{
    display: block;
    margin-bottom: 20px;
  }

  .ProseMirror{
    min-height: 100px;
  }

  .publication-footer{
    margin-top: 10px;
    border-top: 1px solid var(--grey-light);
  }
}
.modale-header{
  display: none;
}

.publication-content{
  .ProseMirror{
    width: 100%;
    min-height: 50px;
  }
}
</style>
