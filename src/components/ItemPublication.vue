<template>
  <article class="post">
    <div class="post-profile-picture">
      <ProfilePicture :name="publication.user.username" />
    </div>
    <div class="post-content">
      <header class="post-header">
        <h1 v-text="publication.user.username" />•<time>10 min</time>
      </header>
      <main class="post-body" v-html="publication.content" />
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
