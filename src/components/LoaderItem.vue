<template>
  <section class="container-loader">
    <div class="lds-dual-ring" />
  </section>
</template>

<script>
export default {
  name: 'LoaderItem'
}
</script>

<style lang="scss">
.container-loader{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  margin: 10px;
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
  &:after{
    content: '';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: var(--primary-color) transparent var(--primary-color) transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
