import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tag from 'App/Models/Tag'
import Todo from 'App/Models/Todo'
import TagSerializer from 'App/Serializers/TagSerializer'
import TagValidator from 'App/Validators/TagValidator'

export default class TagsController {
  public async index({response}: HttpContextContract) {
    const tags = await Tag.query().preload('todos')
    response.json(TagSerializer.serialize(tags))
  }

  public async store({request, response}: HttpContextContract) {
    const payload = await request.validate(TagValidator)
    const tag = await Tag.create(payload)
    if (payload.todos && payload.todos.length > 0) {
      await tag.related('todos').attach(payload.todos)
    }
    await tag.load('todos')
    response.status(201).json(TagSerializer.serialize(tag))
  }

  public async show({response, params}: HttpContextContract) {
    const tag = await Tag.findOrFail(params.id)
    await tag.load('todos')
    response.json(TagSerializer.serialize(tag))
  }

  public async update({request, response, params}: HttpContextContract) {
    const payload = await request.validate(TagValidator)
    const tag = await Tag.findOrFail(params.id)
    tag.merge(payload)
    if (payload.todos?.length > 0) {
      await tag.related('todos').attach(payload.todos)
    }
    await tag.save()
    await tag.load('todos')
    response.json(TagSerializer.serialize(tag))
  }

  public async destroy({params, response}: HttpContextContract) {
    await (await Todo.findOrFail(params.id)).delete()
    response.status(204)
  }
}
