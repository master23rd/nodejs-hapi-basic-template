require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Bugsnag = require('@bugsnag/js');
const notes = require('./api/notes');
const NotesService = require('./services/inMemory/NoteService');
const NotesValidator = require('./validator/notes');

const init = async () => {
  const notesService = new NotesService();
  const server = Hapi.server({
    port: process.env.PORT,
    // host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // call index.js or plugin hapi
  await server.register({
    plugin: notes,
    options: {
      service: notesService,
      validator: NotesValidator,
    },
  });

  await server.start();
  Bugsnag.start({ apiKey: '9102db1750b6cd29a48891c582511137' });
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
