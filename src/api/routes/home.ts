import express from 'express';
import { container } from '../../loaders';

const router = express.Router();

router.get('/', async (_req, res) => {
  const mail = await container.mailService.sendMail();
  res.send(mail);
});

export default router;
