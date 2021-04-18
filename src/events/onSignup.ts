import { container } from '../loaders';

const onSignUp = async (email: string) => {
  try {
    await container.mailService.sendWelcomeMail(email);
    console.log('Welcome Email Sent');
    return;
  } catch (error) {
    console.log(error);
  }
};

export default onSignUp;
