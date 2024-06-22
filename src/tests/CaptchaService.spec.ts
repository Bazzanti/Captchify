import { test } from '@jest/globals';
import { CaptchaService } from '../services/CaptchaService';

const runTheTest = () => {
  const service = new CaptchaService();
  const length = Math.floor(Math.random() * 10);
  const captcha = service.createCaptchaString(length);
  console.log('captcha:', captcha);
  expect(captcha.length).toBe(length);
  for (const char of captcha) {
    expect(service.chrs.includes(char)).toBeTruthy();
  }
};

test('create captcha string', () => {
  for (let i = 0; i < 10; i++) {
    runTheTest();
  }
});
