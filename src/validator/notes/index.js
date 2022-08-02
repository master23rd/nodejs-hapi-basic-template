// const { payload } = require('@hapi/hapi/lib/validation');
const InvariantError = require('../../exceptions/InvariantError');
const { NotesPayloadSchema } = require('./schema');

// make validatior file
const NotesValidator = {
  validateNotePayload: (payload) => {
    const validationResult = NotesPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
      // throw new Error(validationResult.error.message);
    }
  },
};

module.exports = NotesValidator;
