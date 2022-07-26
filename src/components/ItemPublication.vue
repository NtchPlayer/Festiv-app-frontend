<template>
  <article class="publication-container publication-body publication-hover">
    <ProfilePicture :name="publication.user.username" />
    <div class="publication-content">
      <header class="publication-header">
        <h1
          class="publication-header-username"
          v-text="publication.user.username"
        />
        •
        <time
          class="publication-header-time"
          v-text="$filters.timeFilter(publication.createdAt)"
        />
      </header>
      <main class="publication-body" v-html="publication.content" />
      <footer class="publication-footer">
        <button class="button-round button-heart">
          <font-awesome-icon icon="fa-regular fa-heart" />
        </button>
      </footer>
    </div>
  </article>
</template>

<script>
import ProfilePicture from '@/components/ProfilePicture'

export default {
  name: 'ItemPublication',
  components: {
    ProfilePicture
  },
  props: {
    publication: { type: Object, required: true }
  }
}
</script>
