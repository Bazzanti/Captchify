import type { FastifyInstance, FastifyRequest } from 'fastify';
import { CaptchaService } from '../services/CaptchaService';

interface CheckCaptchaRequestBody {
  captcha: string;
  id: number;
}

/**
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function captchaRoutes(fastify: FastifyInstance, options: any) {
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' };
  });

  fastify.post('/create', async (request, reply) => {
    const service = new CaptchaService();
    const captchaString = service.createCaptchaString();
    reply.send(captchaString);
  });

  fastify.post(
    '/check',
    {
      schema: {
        body: {
          type: 'object',
          required: ['captcha', 'id'],
          properties: {
            captcha: { type: 'string' },
            id: { type: 'number' },
          },
        },
      },
    },
    async (
      request: FastifyRequest<{ Body: CheckCaptchaRequestBody }>,
      reply,
    ) => {
      const service = new CaptchaService();
      const { captcha, id } = request.body;
      const result = service.checkCaptcha(captcha, id);

      if (result) {
        reply.code(204).send();
      } else {
        reply.status(500).send();
      }
    },
  );
}

export default captchaRoutes;
