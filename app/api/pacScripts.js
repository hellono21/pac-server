/**
 * Created by ccc on 5/8/17.
 */

import Router from 'koa-router'
import pac from '../utils/pacScripts'

const router = new Router()

router.get('/pacs/arukas', async (ctx) => {
  ctx.type = 'application/javascript'
  ctx.body = await pac('arukas')
})

router.get('/pacs/alicn', async (ctx) => {
  ctx.type = 'application/javascript'
  ctx.body = await pac('alicn')
})

router.get('/pacs/alisg', async (ctx) => {
  ctx.type = 'application/javascript'
  ctx.body = await pac('alisg')
})

export default router.routes()
