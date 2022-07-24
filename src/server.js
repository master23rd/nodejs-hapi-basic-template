const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const serverEnv = process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0';

const init = async () => {
  const server = Hapi.Server({
    port: 5000,
    // host: 'localhost',
    // host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  // eslint-disable-next-line no-console
  console.log(`server is started in : ${serverEnv}`);
};

init();
