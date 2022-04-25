import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'

export default class TodosController {
  public async index({response}: HttpContextContract) {
    const todos = await Todo.all()
    response.json(todos)
  }

  public async store({request, response}: HttpContextContract) {
    const todo = await Todo.create(request.body(), { allowExtraProperties: true })
    response.status(201).json(todo)
  }

  public async show({response, params}: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)
    response.json(todo)
  }

  public async update({request, response, params}: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)
    todo.merge(request.body(), true)
    await todo.save()
    response.json(todo)
  }

  public async destroy({params, response}: HttpContextContract) {
    await (await Todo.findOrFail(params.id)).delete()
    response.status(204)
  }
}
