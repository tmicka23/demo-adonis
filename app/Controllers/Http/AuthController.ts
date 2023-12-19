import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async create({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    const user = await auth.use('web').attempt(email, password)

    return user.serialize({
      fields: {
        pick: ['email', 'id'],
      }
    })
  }

  public async destroy({ auth }: HttpContextContract) {
    await auth.use('web').logout()
  }
}
