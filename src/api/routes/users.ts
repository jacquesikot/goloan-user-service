import * as express from 'express';
import * as _ from 'lodash';

import { container } from '../../loaders/serviceContainer';
import { userValidation, kycValidation, pinValidation } from '../../validation';
import { errorEnvelope, errorMessage, responseEnvelope } from '../../constants';

const router = express.Router();

router.post('/', async (req: express.Request, res: express.Response) => {
  const validation = userValidation(req.body);
  if (validation.error) return res.status(400).send(errorEnvelope.invalidRequest(validation.error));

  const existingUser = await container.userService.checkIfUserExists(req.body.email);
  if (existingUser) return res.status(400).send(errorEnvelope.genericError(errorMessage.userAlreadyRegistered, 400));

  const newUser = await container.userService.createUser(req.body);
  res
    .status(201)
    .send(responseEnvelope.single(_.pick(newUser, ['id', 'first_name', 'last_name', 'email', 'phone_number'])));
});

router.post('/kyc', async (req: express.Request, res: express.Response) => {
  const validation = kycValidation(req.body);
  if (validation.error) return res.status(400).send(errorEnvelope.invalidRequest(validation.error));

  const updatedUser = await container.userService.updateKYC(req.body);

  res.status(200).send(responseEnvelope.single(updatedUser));
});

router.post('/pin', async (req: express.Request, res: express.Response) => {
  const validation = pinValidation(req.body);
  if (validation.error) return res.status(400).send(errorEnvelope.invalidRequest(validation.error));

  const updatedUser = await container.userService.addPin(req.body);

  res.status(200).send(responseEnvelope.single(updatedUser));
});

router.get('/:id', async (req: express.Request, res: express.Response) => {
  const user = await container.userService.getUserById(req.params.id);
  if (!user) return res.status(400).send(errorEnvelope.genericError(errorMessage.userDoesNotExist, 400));

  res.send(responseEnvelope.single(user));
});

export default router;
