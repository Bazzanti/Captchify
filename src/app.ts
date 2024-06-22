import Fastify from 'fastify';
import captchaRoutes from './controllers/CaptchaController';
import testRoutes from './controllers/TestController';

export function build(opts = {}) {
  const fastify = Fastify({
    logger: true,
  });

  fastify.setErrorHandler((error, request, reply) => {
    console.error(error);
    reply.status(500).send({ ok: false });
  });

  fastify.register(captchaRoutes, { prefix: '/v1/captcha' });
  fastify.register(testRoutes);

  return fastify;
}
