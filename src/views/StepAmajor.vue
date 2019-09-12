<template>
  <v-container class="step fill-height">
    <v-layout class="d-flex justify-center align-center text-center">
      <div>
        <div v-show="d_step === -2">
          <v-icon size="200" color="error">mdi-shield-alert-outline</v-icon>
          <h1 class="display-1 mt-7">{{ $t('Update Failed') }}</h1>
          <div class="mt-7">
            <v-btn class="mx-2" color="primary" @click="downFile()"><v-icon left>mdi-replay</v-icon>{{ $t('Retry') }}</v-btn>
            <v-btn class="mx-2" color="secondary" @click="$router.push({ path: '/step_b' })"><v-icon left>mdi-debug-step-over</v-icon>{{ $t('Ignore') }}</v-btn>
          </div>
        </div>

        <div v-show="d_step === -1">
          <v-icon size="200" color="error">mdi-shield-alert-outline</v-icon>
          <h1 class="display-1 mt-7">{{ $t("File Fingerprints Don't Match") }}</h1>
          <div class="mt-7">
            <v-btn class="mx-2" color="primary" @click="downFile()"><v-icon left>mdi-replay</v-icon>{{ $t('Retry') }}</v-btn>
            <v-btn class="mx-2" color="secondary" @click="$router.push({ path: '/step_b' })"><v-icon left>mdi-debug-step-over</v-icon>{{ $t('Ignore') }}</v-btn>
          </div>
        </div>

        <div v-show="d_step === 0">
          <v-icon size="200">mdi-network-off-outline</v-icon>
          <h1 class="display-1 mt-7">{{ $t('Network Error') }}</h1>
          <div class="mt-7">
            <v-btn class="mx-2" color="primary" @click="downFile()"><v-icon left>mdi-replay</v-icon>{{ $t('Retry') }}</v-btn>
            <v-btn class="mx-2" color="secondary" @click="downFile()"><v-icon left>mdi-lan-disconnect</v-icon>{{ $t('Offline') }}</v-btn>
          </div>
        </div>

        <div v-show="d_step === 1">
          <v-icon size="200" color="info">mdi-download-network-outline</v-icon>
          <h1 class="display-1 mt-7">{{ $t('Downloading') }}</h1>
          <v-progress-linear class="mt-7" :value="d_progress.percent"></v-progress-linear>
          <span class="float-right">{{ d_progress.transferred.value }}&nbsp;{{ d_progress.transferred.unit }}</span>
        </div>

        <div v-show="d_step === 2">
          <v-progress-circular indeterminate size="150" color="green">
            {{ $t('Updating') }}
          </v-progress-circular>
        </div>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import fs from 'fs'
import got from 'got'
import hasha from 'hasha'
import { shell } from 'electron'

export default {
  name: 'step_a_major',
  data() {
    return {
      d_step: 1,
      d_progress: {
        percent: 0,
        transferred: {
          value: 0,
          unit: 'b'
        }
      }
    }
  },
  computed: {
    c_newExePath() {
      return `${process.resourcesPath}\/new.exe`
    }
  },
  mounted() {
    this.downFile()
  },
  methods: {
    downFile() {
      this.d_step = 1
      this.d_progress.percent = 0
      got
        .stream(`${this.$store.__s('app.newVer.exe.url')}?t=${new Date().getTime()}`, {
          timeout: {
            socket: 9 * 1000
          }
        })
        .on('downloadProgress', res => {
          if (res.transferred !== res.total && res.percent !== 1) this.d_progress.percent = Math.round(res.percent * 100)
          if (res.transferred > 1024 * 1024) {
            this.d_progress.transferred.value = (res.transferred / 1024 / 1024).toFixed(2) // mb
            this.d_progress.transferred.unit = 'Mb'
          } else if (res.transferred > 1024) {
            this.d_progress.transferred.value = Math.round(res.transferred / 1024) // kb
            this.d_progress.transferred.unit = 'Kb'
          }
        })
        .on('error', err => {
          this.d_step = 0
          this.d_progress.transferred.value = 0
          this.d_progress.percent = 0
          if (err) throw err
        })
        .pipe(fs.createWriteStream(this.c_newExePath))
        .on('finish', async () => {
          await new Promise(resolve => setTimeout(resolve, 2222))
          this.update()
        })
    },
    async update() {
      this.d_step = 2
      await new Promise(resolve => setTimeout(resolve, 2222))
      try {
        let hash = await hasha.fromFile(this.c_newExePath, { algorithm: 'sha512' })
        console.log(`%c█ [new.exe] ${hash}`, 'background: rgba(0, 0, 255, 0.1);color: browm')
        if (this.$store.__s('app.newVer.exe.sha512') !== hash) return (this.d_step = -1)
        shell.openItem(this.c_newExePath)
      } catch (err) {
        this.d_step = -2
        throw err
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.step {
  animation: opacity 2s linear;
}
</style>
