import { test, expect, jest } from '@jest/globals';
import { CaptchaService } from '../services/CaptchaService';
import type { FastifyInstance } from 'fastify/types/instance';
jest.mock('fastify');

const runTheTest = () => {
  const fastifyMock = { sqlite: { db: {} } } as FastifyInstance;
  const service = new CaptchaService(fastifyMock);
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
