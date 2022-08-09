<template>
  <section class="container-notifications">
    <Transition name="swipe">
      <NotificationItem
        v-if="notification"
        :notification="notification"
      />
    </Transition>
  </section>
</template>

<script>
import NotificationItem from '@/components/notification/NotificationItem'
export default {
  name: 'NotificationContainer',
  components: { NotificationItem },
  computed: {
    notification () {
      return this.$store.state.notifications.notification
    }
  }
}
</script>

<style>
.container-notifications{
  z-index: 20;
  position: fixed;
  max-width: 100%;
  text-align: center;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  cursor: default;
  user-select: none;
}

.swipe-enter-from,
.swipe-leave-to {
  transform: translateY(calc(100% + 20px));
}

.swipe-enter-active,
.swipe-leave-active{
  transition: 0.5s;
}

.swipe-enter-to,
.swipe-leave-from {
  transform: translateY(0);
}

@media only screen and (max-width: 600px) {
  .container-notifications{
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
