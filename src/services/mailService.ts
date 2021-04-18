import nodemailer from 'nodemailer';
import { google } from 'googleapis';

// import { logger } from '../loaders';
import config from '../config';

const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    config.googleClientId,
    config.googleClientSecret,
    'https://developers.google.com/oauthplayground',
  );

  oauth2Client.setCredentials({
    refresh_token: config.googleRefreshToken,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject('Failed to create access token :(');
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: config.googleMail,
      accessToken,
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
      refreshToken: config.googleRefreshToken,
    },
  });

  return transporter;
};

const mailService = () => {
  const sendWelcomeMail = async (email: string) => {
    const welcomeMailOptions = {
      from: config.googleMail,
      to: email,
      subject: 'Welcome to Goloan',
      text: '<h1>Welcoem to Goloan</h1>',
    };
    try {
      const emailTransporter = await createTransporter();
      await emailTransporter.sendMail(welcomeMailOptions);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    sendWelcomeMail,
  };
};

export default mailService;
