import { createServer } from 'vite';

const server = await createServer({
  root: '/Users/obed/Claude Projects/tarelas-kitchen',
  server: { host: true, port: 5173 }
});

await server.listen();
server.printUrls();
