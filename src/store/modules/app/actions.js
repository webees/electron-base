import axios from 'axios'

export default {
  async checkVersion({ commit }) {
    let { data } = await axios.get(`https://abckey.com/version.json?t=${new Date().getTime()}`)
    commit('__set', { key: 'newVer', val: data })
  }
}
