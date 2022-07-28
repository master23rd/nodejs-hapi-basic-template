/* eslint-disable no-underscore-dangle */
// const { nanoid } = require('nanoid');
// const notes = require('../../services/inMemory/NoteService');

class NotesHandler {
  constructor(service) {
    this._service = service;
  }

  postHandler(request, h) {
    try {
      const { title = 'untitled', body, tags } = request.payload;
      // const id = nanoid(16);

      this._service.addNote({ title, body, tags });
      const noteId = this._service.addNote({ title, body, tags });

      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          noteId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(400);
      return response;
    }
  }

  getNotesHandler() {
    const notes = this._service.getNote();
    return {
      status: 'success',
      data: {
        notes,
      },
    };
  }

  getNoteByIdHandler(request) {
    try {
      const { id } = request.params;
      const note = this._service.getNoteById(id);
      return {
        status: 'succes',
        data: {
          note,
        },
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  putNoteByIdHandler(request) {
    try {
      const { id } = request.params;

      this._service.editNoteById(id, request.payload);

      return {
        status: 'success',
        message: 'catatan berhasil dirubah',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  deleteNoteByIdHandler(request) {
    try {
      const { id } = request.params
      this._service.deleteNoteById(id);

      return {
        status: 'success',
        message: 'Catatan berhasil dihapus'
      }
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message
      });
      response.code(404);
      return response;
    }
  }
}

module.exports = NotesHandler;
