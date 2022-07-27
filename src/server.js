const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const notesPlugin = require('./notesPlugin');

const init = async () => {
  const server = Hapi.Server({
    port: 5000,
    // host: 'localhost',
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // register plugin hapi
  await server.register([{
    plugin: notesPlugin,
    options: { notes: [] },
  }]);
  server.route(routes);

  await server.start();
  // eslint-disable-next-line no-console
  console.log('server is started');
};

init();
