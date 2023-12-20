import { test } from '@japa/runner'
import Todo from 'App/Models/Todo'

test.group('Model Todo', (group) => {
  const subject = new Todo()

  group.each.setup(async () => {
    subject.fill({ text: 'Do somthing', done: false })
    await subject.save()
  })

  test('it returns an instance of Todo', ({ expect }) => {
    expect(subject).toBeInstanceOf(Todo)
  })
})
