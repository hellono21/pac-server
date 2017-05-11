/**
 * Created by ccc on 5/8/17.
 */

import fs from 'fs'
import path from 'path'
import uglifyJS from 'uglify-js'
import axio from 'axios'

function readFile (file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

async function buildScripts (name) {
  let proxyOptions = {
    arukas: 'HTTPS hellohttps.arukascloud.io;',
    alicn: 'PROXY 101.200.209.250:63333',
    alisg: 'HTTPS h2.bengbeng.lol:8443;',
  }

  try {
    const remoteConfigs = await axio.get('https://raw.githubusercontent.com/hellono21/pac-server/master/app/config/proxyConfig.json')
    proxyOptions = remoteConfigs.data
  } catch (err) {
  }

  const proxy = `"${proxyOptions[name]}"`
  const file = path.resolve(__dirname, './template/whiteblack.pac')
  let scripts = await readFile(file)
  scripts = scripts.replace('__PROXY__', proxy)

  // const mini = uglifyJS.minify(scripts)

  // return mini.code
  return scripts
}

export default buildScripts
