/**
 * Service for Captcha
 */
export class CaptchaService {
  chrs = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  createCaptchaString(captchaLength: number = 5) {
    let captcha = '';

    for (let i = 0; i < captchaLength; i++) {
      captcha += this.chrs[Math.floor(Math.random() * this.chrs.length)];
    }
    return captcha;
  }

  checkCaptcha(inputCaptcha: string, idCaptcha: number) {
    return true;
  }
}
