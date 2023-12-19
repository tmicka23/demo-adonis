import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Tag from 'App/Models/Tag'

export default class Todo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public text?: string

  @column()
  public done?: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Tag, {
    pivotTable: 'todo_tags',
    serializeAs: 'tags',

  })
  public tags: ManyToMany<typeof Tag>
}
