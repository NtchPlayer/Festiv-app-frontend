<template>
  <div class="notification-item item-container" :class="`notification-${notification.style}`">
    <p class="notification-content" v-text="notification.content" />
    <div ref="notification-loading-bar" class="notification-loading-bar" />
  </div>
</template>

<script>
export default {
  name: 'NotificationItem',
  data () {
    return {
      timer: null
    }
  },
  props: {
    notification: { type: Object, required: true }
  },
  mounted () {
    this.initTimer()
  },
  methods: {
    initTimer () {
      this.timer = setTimeout(() => {
        this.$store.dispatch('notifications/deleteNotifications')
      }, 4000)
      this.$refs['notification-loading-bar'].style.animation = 'none'
      setTimeout(() => {
        this.$refs['notification-loading-bar'].style.animation = ''
      }, 10)
    }
  },
  watch: {
    notification () {
      clearTimeout(this.timer)
      this.initTimer()
    }
  }
}
</script>

<style>
.notification-item{
  position: relative;
  overflow: hidden;
  background-color: var(--grey-dark);
}

.notification-green{
  background-color: var(--green-color);
  color: #fff;
}

.notification-red{
  background-color: var(--red-color);
  color: #fff;
}

.notification-loading-bar{
  width: 100%;
  height: 4px;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  animation: loading-bar-notification 4s linear forwards;
}

@keyframes loading-bar-notification {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}
</style>
