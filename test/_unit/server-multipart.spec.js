'use strict';

const { EventEmitter } = require('events');
const { expect } = require('chai');
const proxyquire = require('proxyquire');

describe('server multipart middleware', () => {
  const loadServer = ({ env = 'test', multi = false, busboyError } = {}) => {
    const app = { use: sinon.stub() };
    const busboy = sinon.stub();
    if (busboyError) {
      busboy.throws(busboyError);
    } else {
      busboy.returns(new EventEmitter());
    }

    proxyquire('../../server', {
      hof: sinon.stub().returns(app),
      './hof.settings': { routes: [], behaviours: [], multi },
      './config.js': {
        env,
        upload: { maxFileSizeInBytes: 2048 }
      },
      busboy,
      bl: callback => callback
    });

    return { app, busboy };
  };

  const multipartMiddleware = app => app.use.lastCall.args[0];

  const createRequest = multipart => ({
    headers: { 'content-type': 'multipart/form-data' },
    body: {},
    is: sinon.stub().withArgs('multipart/form-data').returns(multipart),
    pipe: sinon.stub()
  });

  it('passes non-multipart requests to the next middleware', () => {
    const { app } = loadServer({ env: 'production' });
    const middleware = multipartMiddleware(app);
    const req = createRequest(false);
    const next = sinon.spy();

    middleware(req, {}, next);

    expect(next).to.have.been.calledOnceWithExactly();
    expect(req.pipe).not.to.have.been.called;
  });

  it('passes configured upload limits and parses fields and file metadata', () => {
    const { app, busboy } = loadServer();
    const middleware = multipartMiddleware(app);
    const req = createRequest(true);
    const next = sinon.spy();
    const data = Buffer.from('file contents');

    middleware(req, {}, next);

    const parser = req.pipe.firstCall.args[0];
    expect(busboy).to.have.been.calledOnceWithExactly({
      headers: req.headers,
      limits: { fileSize: 2048 }
    });

    parser.emit('field', 'description', 'test field');
    expect(req.body.description).to.equal('test field');

    const file = {
      truncated: false,
      pipe: callback => callback(null, data)
    };
    parser.emit('file', 'attachment', file, {
      filename: 'evidence.txt',
      encoding: '7bit',
      mimeType: 'text/plain'
    });
    parser.emit('finish');

    expect(req.files.attachment).to.deep.equal({
      data,
      name: 'evidence.txt',
      encoding: '7bit',
      mimetype: 'text/plain',
      truncated: false,
      size: Buffer.byteLength(data, 'binary')
    });
    expect(next).to.have.been.calledOnceWithExactly();
  });

  it('stores uploads as arrays when multi-file mode is enabled', () => {
    const { app } = loadServer({ multi: true });
    const req = createRequest(true);
    const next = sinon.spy();
    const middleware = multipartMiddleware(app);

    middleware(req, {}, next);
    const parser = req.pipe.firstCall.args[0];
    const fileInfo = { filename: 'one.png', encoding: '7bit', mimeType: 'image/png' };
    const firstFile = { truncated: false, pipe: callback => callback(null, Buffer.from('1')) };
    const secondFile = { truncated: false, pipe: callback => callback(null, Buffer.from('2')) };

    parser.emit('file', 'attachments', firstFile, fileInfo);
    parser.emit('file', 'attachments', secondFile, { ...fileInfo, filename: 'two.png' });

    expect(req.files.attachments).to.have.length(2);
    expect(req.files.attachments.map(file => file.name)).to.deep.equal(['one.png', 'two.png']);
  });

  it('records truncated uploads with null data and size', () => {
    const { app } = loadServer();
    const req = createRequest(true);
    multipartMiddleware(app)(req, {}, sinon.spy());
    const parser = req.pipe.firstCall.args[0];
    const file = {
      truncated: true,
      pipe: callback => callback(null, Buffer.from('partial'))
    };

    parser.emit('file', 'attachment', file, {
      filename: 'large.bin',
      encoding: '7bit',
      mimeType: 'application/octet-stream'
    });

    expect(req.files.attachment).to.include({ data: null, size: null, truncated: true });
  });

  it('ignores file data that has an error or no content and no filename', () => {
    const { app } = loadServer();
    const req = createRequest(true);
    multipartMiddleware(app)(req, {}, sinon.spy());
    const parser = req.pipe.firstCall.args[0];
    const emptyFile = { truncated: false, pipe: callback => callback(null, Buffer.alloc(0)) };
    const erroredFile = { truncated: false, pipe: callback => callback(new Error('stream error')) };

    parser.emit('file', 'empty', emptyFile, { filename: '', encoding: '7bit', mimeType: 'text/plain' });
    parser.emit('file', 'broken', erroredFile, { filename: 'broken.txt', encoding: '7bit', mimeType: 'text/plain' });

    expect(req.files).to.deep.equal({});
  });

  it('passes Busboy construction and parser errors to next and does not continue after parser error', () => {
    const setupError = new Error('invalid multipart headers');
    const { app } = loadServer({ busboyError: setupError });
    const next = sinon.spy();
    const req = createRequest(true);

    multipartMiddleware(app)(req, {}, next);

    expect(next).to.have.been.calledOnceWithExactly(setupError);
    expect(req.pipe).not.to.have.been.called;

    const secondServer = loadServer();
    const secondReq = createRequest(true);
    const secondNext = sinon.spy();
    multipartMiddleware(secondServer.app)(secondReq, {}, secondNext);
    const parser = secondReq.pipe.firstCall.args[0];
    const parserError = new Error('parser failed');

    parser.emit('error', parserError);
    parser.emit('finish');

    expect(secondNext).to.have.been.calledOnceWithExactly(parserError);
  });
});
