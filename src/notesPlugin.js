const notesPlugin = {
  // plugin properties
  name: 'notes',
  version: '1.0.0',
  register: async (server, options) => {
    const { notes } = options;
    server.route([
      {
        method: 'GET',
        path: '/notes/plugin',
        handler: () => notes,
      },
    ]);
  },
};

module.exports = notesPlugin;
