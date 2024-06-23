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

  async createCaptchaString(captchaLength: number = 5) {
    let captcha = '';

    for (let i = 0; i < captchaLength; i++) {
      captcha += this.chrs[Math.floor(Math.random() * this.chrs.length)];
    }

    const captchadb = await this.dal.insertCaptcha(captcha);

    return captchadb;
  }

  async checkCaptcha(inputCaptcha: string, idCaptcha: number) {
    const captcha = await this.dal.getCaptchaById(idCaptcha);

    console.log(captcha);
    return inputCaptcha === captcha?.sequence;
  }
}
