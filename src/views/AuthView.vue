<template>
  <main class="container-modal">
    <router-view />
    <NotificationContainer />
  </main>
</template>

<script>
import NotificationContainer from '@/components/notification/NotificationContainer'
export default {
  name: 'AuthView',
  components: { NotificationContainer }
}
</script>

<style>
.auth-link{
  text-align: center;
  margin-top: 40px;
  color: var(--grey-dark);
  font-size: .9rem;
}
</style>
