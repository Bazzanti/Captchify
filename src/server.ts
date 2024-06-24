import { FastifyListenOptions } from 'fastify';
import { build } from './app';

const start = async () => {
  try {
    console.log('Starting server...');
    const fastify = await build();
    await fastify.listen({
      port: 5555,
      host: '0.0.0.0',
    } as FastifyListenOptions);
    console.log('Server started');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
