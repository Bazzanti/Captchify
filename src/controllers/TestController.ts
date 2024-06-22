import type { FastifyInstance } from 'fastify';

/**
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function testRoutes(fastify: FastifyInstance, options: any) {
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' };
  });
}

export default testRoutes;
