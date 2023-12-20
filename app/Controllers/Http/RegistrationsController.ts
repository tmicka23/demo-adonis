import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegistrationValidator from 'App/Validators/RegistrationValidator'
import User from 'App/Models/User'
import RegistrationMailer from 'App/Mailers/RegistrationMailer'

export default class RegistrationsController {
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(RegistrationValidator)
    const user = await User.create(payload)
    await new RegistrationMailer(user).sendLater()

    response.status(201).json(user.serialize({
      fields: {
        omit: ['password']
      }
    }))
  }

  public async destroy({ auth }: HttpContextContract) {
    const user = await User.findOrFail(auth.user!.id)

    if (user) {
      await user.delete()
    }
  }
}
