import type sqlite from 'sqlite';
import type { Captcha } from './models/Captcha';
// import { FastifyInstance } from 'fastify';

export class DAL {
  db: sqlite.Database;

  constructor(fastify: any) {
    this.db = fastify.sqlite.db;
  }

  async fetchCatpchas() {
    return await this.db.all<Captcha[]>('SELECT * FROM captcha');
  }

  async getCaptchaById(id: number) {
    const captcha = await this.db.get<Captcha>(
      'SELECT * FROM captcha WHERE id = ?',
      [id],
    );

    if (!captcha) {
      throw new Error('Captcha not found');
    }
    return captcha;
  }

  async insertCaptcha(sequence: string) {
    const result = await this.db.run(
      'INSERT INTO captcha (sequence) VALUES (?)',
      sequence,
    );

    if (!result?.lastID) {
      throw new Error('Error inserting captcha');
    }

    return await this.getCaptchaById(result.lastID);
  }

  async validateCaptchaCheck(captcha: Captcha) {
    if (captcha.checkedOn) {
      throw new Error('Captcha already checked');
    }

    const result = await this.db.run(
      'UPDATE captcha SET checkedOn = CURRENT_TIMESTAMP WHERE id = ?',
      captcha.id,
    );

    if (!result.changes) {
      throw new Error('Error updating captcha');
    }
  }
}
