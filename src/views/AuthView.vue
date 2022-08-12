<template>
  <main class="container-modal">
    <router-view />
  </main>
</template>

<script>
export default {
  name: 'AuthView'
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
