import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

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

    this.configTemplate();
  }

  configTemplate(): void {
    const viewPath = path.resolve(__dirname, '..', 'views', 'email');

    this.transporter.use(
      'compile',
      hbs({
        viewEngine: {
          extname: '.hbs',
          layoutsDir: path.resolve(viewPath, 'layouts'),
          partialsDir: path.resolve(viewPath, 'partials'),
          defaultLayout: 'default',
        },
        viewPath,
        extName: '.hbs',
      }),
    );
  }

  public async sendMail(mailOptions: MailOptionsInterface): Promise<void> {
    await this.transporter.sendMail({ ...mailConfig.default, ...mailOptions });
  }
}

interface MailOptionsInterface {
  from?: string;
  to?: string;
  subject?: string;
  text?: string;
  html?: string;
  template?: string;
  context?: any;
}

export default Mailer;
