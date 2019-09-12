const msg = {
  Bitcoin: {
    zhCN: '比特币'
  },
  Back: {
    zhCN: '返回'
  },
  Setting: {
    zhCN: '设置'
  },
  About: {
    zhCN: '关于'
  },
  Retry: {
    zhCN: '重试'
  },
  Ignore: {
    zhCN: '忽略'
  },
  Offline: {
    zhCN: '离线'
  },
  Downloading: {
    zhCN: '正在下载'
  },
  Updating: {
    zhCN: '正在更新'
  },
  // StepA
  'Network Error': {
    zhCN: '网络错误'
  },
  'Check For Updates': {
    zhCN: '检查更新'
  },
  "File Fingerprints Don't Match": {
    zhCN: '文件指纹不匹配'
  },
  'Update Failed': {
    zhCN: '更新失败'
  },
  // StepAmajor
  'Major Version Upgrade': {
    zhCN: '主版本升级'
  },
  'Patch Version Upgrade': {
    zhCN: '补丁版本升级'
  },
  // StepB
  'Please Connect ABCKEY': {
    zhCN: '请连接 ABCKEY'
  }
}

const lang = {}
for (let txt in msg) {
  for (let loc in msg[txt]) {
    lang[loc] = lang[loc] || {}
    lang[loc][txt] = msg[txt][loc]
  }
}

export default {
  ...lang
}
