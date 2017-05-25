/**
 * Created by ccc on 5/8/17.
 */

import Router from 'koa-router'
import uaParser from 'ua-parser-js'
import pac from '../utils/pacScripts'


const router = new Router()

async function isHttpsProxySupported(uaString) {
  let ret = false
  const httpsUADict = {
    Chromium: true,
    Chrome: true,
    Firefox: true,
  }

  const ua = uaParser(uaString)

  if (httpsUADict[ua.browser.name] && ua.device.type === undefined) {
    ret = true
  }

  return ret
}

async function checkUA (ctx, next){
  ctx.isHttpsProxySupported = await isHttpsProxySupported(ctx.req.headers['user-agent'])
  await next();
}

router.get('/pacs', checkUA, async (ctx) => {
  let proxyType = ctx.query.type

  if (proxyType === undefined) {
    proxyType = ctx.isHttpsProxySupported ? 'HTTPS' : 'PROXY'
  }

  ctx.type = 'application/x-ns-proxy-autoconfig'
  ctx.body = await pac('alicn', proxyType)
})

router.get('/pacs/:name', checkUA, async (ctx) => {
  let proxyType = ctx.query.type
  const proxyName = ctx.params.name

  if (proxyType === undefined) {
    proxyType = ctx.isHttpsProxySupported ? 'HTTPS' : 'PROXY'
  }

  ctx.type = 'application/x-ns-proxy-autoconfig'
  ctx.body = await pac(proxyName, proxyType)
})

export default router.routes()
