import { Hono } from 'hono'
import { db } from '../db/client.js'
import { singleTasks } from '../db/schema.js'
import { eq } from 'drizzle-orm'

const singleTasksRouter = new Hono();

// TODOの一覧を取得
singleTasksRouter.get('/', async (c) => {
  console.log('GET /single-tasks called')
  const allTodos = await db.select().from(singleTasks)
  return c.json(allTodos)
})

// TODOを作成
singleTasksRouter.post('/', async (c) => {
  console.log('POST /single-task called')
  try {
    const body = await c.req.json()
    console.log('Received body:', body)
    const newTodo = await db.insert(singleTasks).values({
      title: body.title,
      description: body.description
    }).returning()
    console.log('Created todo:', newTodo[0])
    return c.json(newTodo[0])
  } catch (error: any) {
    console.error('Error:', error)
    return c.json({ error: error.message }, 500)
  }
})

// TODOを取得
singleTasksRouter.get('/:id', async (c) => {
  console.log('GET /single-tasks/:id called')
  const id = c.req.param('id')
  const todo = await db.select().from(singleTasks).where(eq(singleTasks.id, id))
  if (todo.length === 0) {
    return c.json({ error: 'Todo not found' }, 404)
  }
  return c.json(todo[0])
})

// TODOを更新
singleTasksRouter.put('/:id', async (c) => {
  console.log('PUT /single-tasks/:id called')
  const id = c.req.param('id')
  const body = await c.req.json()
  body.isCompleted === true ? body.isCompleted = true : body.isCompleted = false
  const updatedTodo = await db.update(singleTasks).set({
      title: body.title,
    description: body.description,
    isCompleted: body.isCompleted
  }).where(eq(singleTasks.id, id))
  return c.json(updatedTodo)
})

export default singleTasksRouter
