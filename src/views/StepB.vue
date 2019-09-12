<template>
  <v-container class="step fill-height">
    <v-layout class="d-flex justify-center align-center text-center">
      <div>
        <v-icon size="200" color="info">mdi-usb</v-icon>
        <h1 class="display-1 mt-7">{{ $t('Please Connect ABCKEY') }}</h1>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    // c_id: vm => vm.$store.__s('usb.id')
  },
  watch: {
    c_id: {
      // immediate: true,
      // async handler(id) {
      //   await new Promise(resolve => setTimeout(resolve, 1234))
      //   if (id === '534c0001') this.$router.push({ path: '/p1/step_1' })
      //   else if (id === '2b240001') this.$router.push({ path: '/step_4' })
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.step {
  animation: opacity 2s linear;
}
</style>
