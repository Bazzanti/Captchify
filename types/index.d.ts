export {};
declare module 'fastify' {
  export interface FastifyInstance {
    sqlite: sqlite3.Database;
  }
}
