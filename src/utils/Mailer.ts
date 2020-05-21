import nodemailer from 'nodemailer';

import mailConfig from '../config/mail';

class Mailer {
  public transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: false,
      auth: mailConfig.auth,
    });
  }

  public async sendMail(mailOptions: MailOptionsInterface): Promise<void> {
    const defaultValue = mailConfig.default;

    const options = { ...defaultValue, ...mailOptions };

    await this.transporter.sendMail(options);
  }
}

interface MailOptionsInterface {
  from?: string;
  to?: string;
  subject?: string;
  text?: string;
  html?: string;
}

export default Mailer;
