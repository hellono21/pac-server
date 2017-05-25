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

async function buildScripts (name, type = '') {
  let proxyOptions = {
    alicn_https: 'HTTPS m.bengbeng.lol:54333;',
    alicn_proxy: 'PROXY m.bengbeng.lol:53333;',
  }

  try {
    const remoteConfigs = await axio.get('https://raw.githubusercontent.com/hellono21/pac-server/master/app/config/proxyConfig.json')
    proxyOptions = remoteConfigs.data
  } catch (err) {
  }
  const proxyName = `${name}_${type.toLowerCase()}`

  if (proxyOptions[proxyName] === undefined) {
    const error = new Error('Not Found')
    throw error
  }
  const proxy = `"${proxyOptions[proxyName]}"`
  const file = path.resolve(__dirname, './template/white.pac')
  let scripts = await readFile(file)
  scripts = scripts.replace('__PROXY__', proxy)

  // const mini = uglifyJS.minify(scripts)

  // return mini.code
  return scripts
}

export default buildScripts
