import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegistrationValidator from 'App/Validators/RegistrationValidator'
import User from 'App/Models/User'

export default class RegistrationsController {
  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(RegistrationValidator)
    await User.create(payload)
  }

  public async destroy({ auth }: HttpContextContract) {
    const user = await User.findOrFail(auth.user!.id)

    if (user) {
      await user.delete()
    }
  }
}
