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
    const captchaService = new CaptchaService(fastify);
    const captchaDb = await captchaService.createCaptchaString();

    const imageService = new ImageGenerationService();
    const imageBuffer = imageService.generateCaptcha(captchaDb?.sequence);

    // reply.header('Content-Type', 'image/png');
    reply.send({
      captcha: Buffer.from(imageBuffer).toString('base64'),
      id: captchaDb.id,
    });
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
      const service = new CaptchaService(fastify);
      const { captcha, id } = request.body;
      const result = await service.checkCaptcha(captcha, id);

      if (result) {
        reply.code(200).send({ message: 'ok' });
      } else {
        const error = new Error('Invalid Captcha Response');
        reply.code(500).send(error);
      }
    },
  );
}

export default captchaRoutes;
