import { logger } from '../loaders';
import Mailgun from 'mailgun-js';

import config from '../config';

const mailService = () => {
  const domain =
    'https://app.mailgun.com/app/sending/domains/sandbox9e1f2ca8e8a54772a28b0eab85665d40.mailgun.org';
  const fromWho = 'jacquesikot@gmail.com';

  const mailgun = new Mailgun({ apiKey: config.mailgunApiKey, domain: domain });

  const data = {
    from: fromWho,
    to: 'jacquesikot@icloud.com',
    subject: 'Hello from user service',
    html:
      'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://0.0.0.0:3030/validate?' +
      'jacquesikot@icloud.com' +
      '">Click here to add your email address to a mailing list</a>',
  };

  const sendMail = async () => {
    try {
      await mailgun.messages().send(data);
    } catch (error) {
      logger.error(error);
    }
  };

  return {
    sendMail,
  };
};

export default mailService;
