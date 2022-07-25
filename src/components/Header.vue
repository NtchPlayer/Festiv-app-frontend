<template>
  <header class="header-section">
    <h1 class="main-title" v-text="title" />
  </header>
</template>

<script>
export default {
  name: 'HeaderSection',
  props: {
    title: { type: String, required: true }
  }
}
</script>

<style>
.header-section{
  padding: 20px 30px;
}
</style>
