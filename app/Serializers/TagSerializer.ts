import Tag from "App/Models/Tag";

export default class TagSerializer {

  private static baseSchema = {
    fields: {
      pick: ['id', 'name'],
      omit: ['updatedAt', 'createdAt']
    },
    relations: {
      todos: {
        fields: ['id', 'text', 'done'],
      }
    }
  }

  public static serialize(data: Tag | Tag[]): any {
    if (data instanceof Tag) {
      return data.serialize(this.baseSchema)
    } else if (data instanceof Array) {
      return data.map(item => {
        if (item instanceof Tag) {
          return item.serialize(this.baseSchema)
        }
      })
    }
  }
}

