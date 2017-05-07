/**
 * Created by ccc on 5/7/17.
 */

import Koa from 'koa'

const app = new Koa()

app.use((ctx) => {
  ctx.body = 'hello'
})

export default app

