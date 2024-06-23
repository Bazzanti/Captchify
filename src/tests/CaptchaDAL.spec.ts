import {
  test,
  expect,
  beforeEach,
  describe,
  it,
  afterAll,
} from '@jest/globals';
import { build } from '../app';
import { DAL } from '../dal/DAL';

let dal: DAL;

describe('DAL Test Block', () => {
  beforeEach(async () => {
    const app = build({ filename: './db/captcha-test.db' });
    await app.ready();
    dal = new DAL(app);
    await dal.cleanTable();
  });

  afterAll(async () => {
    await dal.cleanTable();

    await dal.close();
  });

  it('captcha DAL fetch ALL', async () => {
    const captchas = await dal.fetchCatpchas();
    console.log(captchas);

    expect(captchas).toBeDefined();
  });

  test('captcha DAL create one', async () => {
    const captcha = await dal.insertCaptcha('test');
    console.log(captcha);

    expect(captcha).toBeDefined();
    expect(captcha.sequence).toBe('test');
  });

  test('captcha DAL create and check one', async () => {
    const captcha = await dal.insertCaptcha('test');
    console.log(captcha);

    expect(captcha).toBeDefined();
    expect(captcha.sequence).toBe('test');

    let validate = false;
    try {
      validate = await dal.validateCaptchaCheck(captcha);
    } catch (e) {
      console.log(e);
      expect(e).not.toBeDefined();
    } finally {
      expect(validate).toBe(true);
    }
  });
});
