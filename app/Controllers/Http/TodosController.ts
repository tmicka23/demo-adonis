import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tag from 'App/Models/Tag'
import Todo from 'App/Models/Todo'
import TodoSerializer from 'App/Serializers/TodoSerializer'
import TodoValidator from 'App/Validators/TodoValidator'

export default class TodosController {
  public async index({response}: HttpContextContract) {
    const todos = await Todo.query().preload('tags')
    response.json(TodoSerializer.serialize(todos))
  }

  public async store({request, response}: HttpContextContract) {
    const payload = await request.validate(TodoValidator)
    const todo = await Todo.create(payload)
    if (payload.tags && payload.tags.length > 0) {
      const tags = await Tag.findMany(payload.tags)
      await todo.related('tags').createMany(tags)
    }
    await todo.load('tags')
    response.status(201).json(TodoSerializer.serialize(todo))
  }

  public async show({response, params}: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)
    await todo.load('tags')
    response.json(TodoSerializer.serialize(todo))
  }

  public async update({request, response, params}: HttpContextContract) {
    const payload = await request.validate(TodoValidator)
    const todo = await Todo.findOrFail(params.id)
    todo.merge(payload)
    if (payload.tags && payload.tags.length > 0) {
      const tags = await Tag.findMany(payload.tags)
      todo.related('tags').createMany(tags)
    }
    await todo.save()
    await todo.load('tags')
    response.json(TodoSerializer.serialize(todo))
  }

  public async destroy({params, response}: HttpContextContract) {
    await (await Todo.findOrFail(params.id)).delete()
    response.status(204)
  }
}
