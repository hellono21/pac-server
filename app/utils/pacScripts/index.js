/**
 * Created by ccc on 5/8/17.
 */

import fs from 'fs'
import path from 'path'
import uglifyJS from 'uglify-js'

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
  const proxyOptions = {
    arukas: '"HTTPS hello21-https.arukascloud.io;"',
    alicn: '"PROXY 101.200.209.250:63333"',
    alisg: '"HTTPS h2.bengbeng.lol:8443;"',
  }
  const proxy = proxyOptions[name]
  const file = path.resolve(__dirname, './template/whiteblack.pac')
  let scripts = await readFile(file)
  scripts = scripts.replace('__PROXY__', proxy)

  // const mini = uglifyJS.minify(scripts)

  // return mini.code
  return scripts
}

export default buildScripts
