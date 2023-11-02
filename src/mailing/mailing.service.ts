import transporter from '../external/nodemailer'
import Handlebars from 'handlebars'
import * as fs from 'fs'

class MailingService {
  private readonly activateTemplate
  private readonly restoreTemplate

  constructor() {
    const activateContent = fs.readFileSync(
      __dirname + '/templates/activate.hbs',
      'utf8',
    )
    this.activateTemplate = Handlebars.compile(activateContent)

    const restoreContent = fs.readFileSync(
      __dirname + '/templates/restore.hbs',
      'utf8',
    )
    this.restoreTemplate = Handlebars.compile(restoreContent)
  }

  async sendActivationMail(to: string, token: string) {
    await transporter.sendMail({
      to,
      subject: 'Активация аккаунта',
      html: this.activateTemplate({
        link: process.env.MAIL_ACTIVATE_URL + token,
      }),
    })
  }

  async sendRestoreMail(to: string, token: string) {
    await transporter.sendMail({
      to,
      subject: 'Восстановление пароля',
      html: this.restoreTemplate({ link: process.env.MAIL_RESTORE_URL, token }),
    })
  }
}

export default new MailingService()
