import Todo from "App/Models/Todo";

export default class TodoSerializer {

  private static baseSchema = {
    fields: {
      pick: ['id', 'text', 'done', 'test'],
      omit: ['updatedAt', 'createdAt']
    },
    relations: {
      tags: {
        fields: ['id', 'name'],
      }
    }
  }

  public static serialize(data: Todo | Todo[]): any {
    if (data instanceof Todo) {
      return data.serialize(this.baseSchema)
    } else if (data instanceof Array) {
      return data.map(item => {
        if (item instanceof Todo) {
          return item.serialize(this.baseSchema)
        }
      })
    }
  }
}

