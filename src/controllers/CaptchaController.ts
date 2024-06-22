import type { FastifyInstance, FastifyRequest } from 'fastify';
import { CaptchaService } from '../services/CaptchaService';
import { ImageGenerationService } from '../services/ImageGenerationService';

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
    const captchaService = new CaptchaService();
    const captchaString = captchaService.createCaptchaString();
    const imageService = new ImageGenerationService();
    const imageBuffer = imageService.generateCaptcha(captchaString);

    reply.header('Content-Type', 'image/png');
    reply.send(imageBuffer);
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
