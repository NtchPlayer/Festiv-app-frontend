<template>
  <div class="create-publication-container">
    <header class="create-publication-header">
      <button class="button-round" @click.prevent="$emit('emitClose')">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </button>
    </header>
    <main class="create-publication-body">
      <ProfilePicture :name="$store.state.auth.user.username" />
      <div class="create-publication-fields">
        <TipTap v-model="content" />
        <div class="create-publication-footer">
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
.create-publication-container{
  padding: 20px;
}

.modale {
  .create-publication-container{
    padding: 0;
  }

  .create-publication-header{
    display: block;
  }

  .ProseMirror{
    min-height: 100px;
  }

  .create-publication-footer{
    margin-top: 10px;
    border-top: 1px solid var(--grey-light);
  }
}
.create-publication-header{
  display: none;
  margin-bottom: 20px;
}

.create-publication-body{
  display: flex;
}

.create-publication-fields{
  margin-left: 20px;
  width: 100%;
  .ProseMirror{
    width: 100%;
    min-height: 50px;
  }
}

.create-publication-footer{
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  .button-primary{
    width: auto;
    padding-right: 20px;
    padding-left: 20px;
  }
  #file-publication{
    display: none;
    visibility: hidden;
  }
}
</style>
