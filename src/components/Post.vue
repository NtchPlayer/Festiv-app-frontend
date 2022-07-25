<template>
  <article class="post">
    <div class="post-profile-picture">
      <ProfilePicture name="IcePlayer" />
    </div>
    <div class="post-content">
      <header class="post-header">
        <h1 v-text="user.username" />•<time>10 min</time>
      </header>
      <body class="post-body" v-text="content" />
    </div>
  </article>
</template>

<script>
import ProfilePicture from '@/components/ProfilePicture'

export default {
  name: 'PostItem',
  components: {
    ProfilePicture
  },
  props: {
    user: { type: Object, required: true },
    content: { type: Object, required: true }
  }
}
</script>
