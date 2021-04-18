import EventEmitter from 'events';

import onSignUp from './onSignup';

const onSignUpText = 'onUserSignUp';

const emailEvent = new EventEmitter();

emailEvent.addListener(onSignUpText, onSignUp);

export default {
  onSignUp: onSignUpText,
  emailEvent,
};
