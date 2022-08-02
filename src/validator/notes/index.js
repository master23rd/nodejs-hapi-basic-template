// const { payload } = require('@hapi/hapi/lib/validation');
const InvariantError = require('../../exceptions/InvariantError');
const { NotePayloadSchema } = require('./schema');

// make validatior file
const NotesValidator = {
  validateNotePayload: (payload) => {
    // validate request using validator 
    const validationResult = NotePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
      // throw new Error(validationResult.error.message);
    }
  },
};

module.exports = NotesValidator;
