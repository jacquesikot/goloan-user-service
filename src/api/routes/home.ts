import express from 'express';

const router = express.Router();

router.get('/', async (_req, res) => {
  res.send('ok');
});

export default router;
