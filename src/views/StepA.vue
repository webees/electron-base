<template>
  <v-container class="step fill-height">
    <v-layout class="d-flex justify-center align-center text-center">
      <div>
        <div v-show="d_step === 0">
          <v-icon size="200">mdi-network-off-outline</v-icon>
          <h1 class="display-1 mt-7">{{ $t('Network Error') }}</h1>
          <div class="mt-7">
            <v-btn class="mx-2" color="primary" @click="checkVersion()"><v-icon left>mdi-replay</v-icon>{{ $t('Retry') }}</v-btn>
            <v-btn class="mx-2" color="secondary" @click="$router.push({ path: '/step_b' })"><v-icon left>mdi-debug-step-over</v-icon>{{ $t('Ignore') }}</v-btn>
          </div>
        </div>

        <v-progress-circular v-show="d_step === 1" indeterminate size="150" color="primary">
          {{ $t('Check For Updates') }}
        </v-progress-circular>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import fs from 'fs'

export default {
  name: 'step_a',
  data() {
    return {
      d_step: 1
    }
  },
  async mounted() {
    this.clean() // 这里如果异步更新可能有bug
    this.checkVersion()
  },
  methods: {
    async checkVersion() {
      this.d_step = 1
      await new Promise(resolve => setTimeout(resolve, 2222))
      this.$store
        .__d('app/checkVersion')
        .then(() => {
          let old_exe = this.$store.__s('app.oldVer.exe')
          let old_zip = this.$store.__s('app.oldVer.zip')
          let new_exe = this.$store.__s('app.newVer.exe.ver')
          let new_zip = this.$store.__s('app.newVer.zip.ver')
          console.log(`%c█ [exe] ${old_exe} < ${new_exe}`, 'background: rgba(0, 0, 255, 0.1);color: browm')
          console.log(`%c█ [zip] ${old_zip} < ${new_zip}`, 'background: rgba(0, 0, 255, 0.1);color: browm')
          if (old_exe !== new_exe) return this.$router.push({ path: '/step_a_major' })
          else if (old_zip !== new_zip) return this.$router.push({ path: '/step_a_patch' })
          this.$router.push({ path: '/step_b' })
        })
        .catch(() => {
          this.d_step = 0
        })
    },
    clean() {
      fs.unlink(`${process.resourcesPath}\/new.bin`, err => {
        if (err) console.log('%c█ # new.bin', 'background: rgba(0, 0, 255, 0.1);color: browm')
      })
      fs.unlink(`${process.resourcesPath}\/new.exe`, err => {
        if (err) console.log('%c█ # new.exe', 'background: rgba(0, 0, 255, 0.1);color: browm')
      })
      fs.unlink(`${process.resourcesPath}\/new.zip`, err => {
        if (err) console.log('%c█ # new.zip', 'background: rgba(0, 0, 255, 0.1);color: browm')
      })
      fs.unlink(`${process.resourcesPath}\/new.asar`, err => {
        if (err) console.log('%c█ # new.asar', 'background: rgba(0, 0, 255, 0.1);color: browm')
      })
      fs.unlink(`${process.resourcesPath}\/old.asar`, err => {
        if (err) console.log('%c█ # old.asar', 'background: rgba(0, 0, 255, 0.1);color: browm')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.step {
  animation: opacity 2s linear;
}
</style>
