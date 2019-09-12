<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  watch: {
    $route() {
      window.document.title = this.$t(this.$route.meta.title)
    }
  }
}
</script>
