import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import singleTasksRouter from './routes/single-tasks.js'

const app = new Hono()

// ロガーミドルウェアを追加
app.use('*', logger())

app.get('/', (c) => {
  return c.json({ message: 'Hello, World!' })
})

app.route('/single-tasks', singleTasksRouter);

const port = parseInt(process.env.PORT || '3000', 10)
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})