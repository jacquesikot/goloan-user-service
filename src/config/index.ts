import * as dotenv from 'dotenv';

const envFound = dotenv.config();
if (envFound.error && process.env.NODE_ENV === 'development') {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: parseInt(process.env.PORT, 3000),
  masterKey: process.env.MASTER_KEY ? process.env.MASTER_KEY : '',
  mailgunApiKey: process.env.MAILGUN_API_KEY ? process.env.MAILGUN_API_KEY : '',
  jwtKey: process.env.JWT_KEY ? process.env.JWT_KEY : '',
  googleMail: process.env.GOOGLE_EMAIL ? process.env.GOOGLE_EMAIL : '',
  googleClientId: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : '',
  googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN ? process.env.GOOGLE_REFRESH_TOKEN : '',
};
