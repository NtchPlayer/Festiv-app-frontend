<template>
  <router-view/>
  <NotificationContainer />
</template>

<script>
import { useHead } from '@vueuse/head'
import NotificationContainer from '@/components/notification/NotificationContainer'

export default {
  name: 'App',
  components: { NotificationContainer },
  setup () {
    // const baseSite = 'https://festiv-app-frontend.herokuapp.com'
    useHead({
      // Can be static or computed
      titleTemplate: "Festiv'App%s",
      meta: [
        {
          name: 'description',
          content: 'Le réseau social des festivals !'
        }, {
          name: 'keywords',
          content: "festivals, réseau social, solidays, hellfest, festiv'4 All, musique, video, photo"
        }, {
          name: 'author',
          content: 'Nathan CHEVALET'
        }, {
          name: 'theme-color',
          content: '#1d9bf0'
        }, {
          name: 'mobile-web-app-capable"',
          content: 'yes'
        }, {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent'
        }, {
          name: 'apple-mobile-web-app-title',
          content: "Festiv'App"
        }, {
          property: 'og:title',
          content: "Festiv'App"
        }, {
          property: 'og:description',
          content: 'Le réseau social des festivals !'
        },
        // {
        //   property: 'og:url',
        //   content: baseSite
        // },
        {
          property: 'og:type',
          content: 'website'
        }, {
          property: 'og:site_name',
          content: "Festiv'App"
        }, {
          property: 'og:local',
          content: 'fr_FR'
        }, {
          property: 'og:image:alt',
          content: 'Logo Balise 360'
        }, {
          name: 'twitter:title',
          content: "Festiv'App"
        }, {
          name: 'twitter:description',
          content: 'Le réseau social des festivals !'
        },
        // {
        //   name: 'twitter:url',
        //   content: baseSite
        // },
        {
          name: 'twitter:site',
          content: '@festivApp.io'
        }, {
          name: 'twitter:creator',
          content: '@NtchPlayer'
        }, {
          name: 'twitter:card',
          content: 'app'
        }
      ]
      // link: [
      //   { rel: 'favicon', href: `${baseSite}/favicon.ico` },
      //   { rel: 'icon', type: 'image/png', href: `${baseSite}/icons/icon.png` },
      //   { rel: 'apple-touch-icon', type: 'image/png', sizes: '152x152', href: `${baseSite}/icons/touch-icon-ipad.png` },
      //   { rel: 'apple-touch-icon', type: 'image/png', sizes: '180x180', href: `${baseSite}/icons/touch-icon-iphone-retina.png` },
      //   { rel: 'apple-touch-icon', type: 'image/png', sizes: '167x167', href: `${baseSite}/icons/touch-icon-ipad-retina.png` },
      //   { rel: 'apple-touch-icon', type: 'image/png', sizes: '512x512', href: `${baseSite}/icons/apple-touch-icon.png` }
      // ]
    })
    return {
      useHead
    }
  }
}

</script>

<style src="./style/reset.css" />
<style lang="scss" src="./style/main.scss" />
