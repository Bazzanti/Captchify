import Fastify from 'fastify';
import captchaRoutes from './controllers/CaptchaController';
import testRoutes from './controllers/TestController';
import db, { dbOptions } from './dal/db';

export function build(opts: dbOptions = { filename: './db/captcha.db' }) {
  const fastify = Fastify({
    logger: true,
  });

  fastify.register(db, opts);

  fastify.setErrorHandler((error, request, reply) => {
    console.error(error);
    reply.status(500).send({ ok: false });
  });

  fastify.register(captchaRoutes, { prefix: '/v1/captcha' });
  fastify.register(testRoutes);

  return fastify;
}
