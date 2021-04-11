import * as express from 'express';

import { container } from '../../loaders';
import { authValidation } from '../../validation';
import { errorEnvelope, errorMessage, responseEnvelope } from '../../constants';

const router = express.Router();

router.post('/', async (req: express.Request, res: express.Response) => {
  const statusCode = 400;

  const validation = authValidation(req.body);
  if (validation.error) return res.status(statusCode).send(errorEnvelope.invalidRequest(validation.error));

  const user = await container.userService.findUserByEmail(req.body.email);
  if (!user) return res.status(statusCode).send(errorEnvelope.genericError(errorMessage.invalidAuth, statusCode));

  const validPassword = await container.authService.validatePassword(req.body.password, user.password);
  if (!validPassword)
    return res.status(statusCode).send(errorEnvelope.genericError(errorMessage.invalidAuth, statusCode));

  const token = await container.authService.generateAuthToken(user);
  const data = {
    token,
  };
  res.send(responseEnvelope.single(data));
});

export default router;
