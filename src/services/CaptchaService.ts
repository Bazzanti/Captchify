import type { FastifyInstance } from 'fastify/types/instance';
import { DAL } from '../dal/DAL';

/**
 * Service for Captcha
 */
export class CaptchaService {
  dal: DAL;
  chrs = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  constructor(readonly fastify: FastifyInstance) {
    this.dal = new DAL(fastify);
  }

  async createCaptcha(captchaLength: number = 5) {
    const captcha = this.createCaptchaString(captchaLength);

    const captchadb = await this.dal.insertCaptcha(captcha);

    return captchadb;
  }

  createCaptchaString(captchaLength: number = 5) {
    let captchaString = '';

    for (let i = 0; i < captchaLength; i++) {
      captchaString += this.chrs[Math.floor(Math.random() * this.chrs.length)];
    }

    return captchaString;
  }

  async checkCaptcha(inputCaptcha: string, idCaptcha: number) {
    const captcha = await this.dal.getCaptchaById(idCaptcha);
    if (inputCaptcha !== captcha?.sequence) {
      return false;
    }
    await this.dal.validateCaptchaCheck(captcha);

    return true;
  }
}
