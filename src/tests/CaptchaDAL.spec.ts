import { test, expect } from '@jest/globals';
import { build } from '../app';
import { DAL } from '../dal/DAL';

test('captcha DAL', async () => {
  const app = build();

  const dal = new DAL(app);
  const captchas = await dal.fetchCatpchas();

  expect(captchas).toBeDefined();
});
