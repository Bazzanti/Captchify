import type { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function dbConnector(fastify: FastifyInstance, options: any) {
  const db = await open({
    filename: './db/captcha.db',
    driver: sqlite3.Database,
  });

  await db.exec(
    `CREATE TABLE IF NOT EXISTS captcha (id INTEGER PRIMARY KEY, sequence TEXT NOT NULL, createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP, checkedOn TIMESTAMP);`,
  );

  const sqlite: any = {};
  sqlite.db = db;

  fastify.decorate('sqlite', sqlite);
  fastify.addHook('onClose', (fastify: any, done: any) => {
    db.close();
  });
}

export default fastifyPlugin(dbConnector);
