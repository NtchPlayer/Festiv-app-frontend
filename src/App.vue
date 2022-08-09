<template>
  <router-view/>
</template>

<script>
import { useHead } from '@vueuse/head'

export default {
  name: 'App',
  setup () {
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
        }, {
          property: 'og:url',
          content: process.env.VUE_APP_BASE_SITE
        }, {
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
        }, {
          name: 'twitter:url',
          content: process.env.VUE_APP_BASE_SITE
        }, {
          name: 'twitter:site',
          content: '@festivApp.io'
        }, {
          name: 'twitter:creator',
          content: '@NtchPlayer'
        }, {
          name: 'twitter:card',
          content: 'app'
        }
      ],
      link: [
        { rel: 'favicon', href: './favicon.ico' },
        { rel: 'icon', type: 'image/png', href: './icons/icon.png' },
        { rel: 'apple-touch-icon', type: 'image/png', sizes: '152x152', href: './icons/touch-icon-ipad.png' },
        { rel: 'apple-touch-icon', type: 'image/png', sizes: '180x180', href: './icons/touch-icon-iphone-retina.png' },
        { rel: 'apple-touch-icon', type: 'image/png', sizes: '167x167', href: './icons/touch-icon-ipad-retina.png' },
        { rel: 'apple-touch-icon', type: 'image/png', sizes: '512x512', href: './icons/apple-touch-icon.png' }
      ]
    })
    return {
      useHead
    }
  }
}

</script>

<style src="./style/reset.css" />
<style lang="scss" src="./style/main.scss" />
