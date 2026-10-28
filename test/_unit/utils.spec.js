'use strict';

const { expect } = require('chai');
const proxyquire = require('proxyquire');

describe('lib/utils', () => {
  let createProducer;
  let producer;
  let logger;
  let sendToQueue;

  beforeEach(() => {
    producer = { send: sinon.stub() };
    createProducer = sinon.stub().returns(producer);
    logger = { log: sinon.stub() };

    ({ sendToQueue } = proxyquire('../../lib/utils', {
      'sqs-producer': { Producer: { create: createProducer } },
      'hof/lib/logger': () => logger
    }));
  });

  it('sends allegation data and resolves after logging the SQS response', async () => {
    const data = { allegation: 'details' };
    const id = 'allegation-123';
    producer.send.resolves([{ MessageId: 'message-456' }]);

    const result = await sendToQueue(data, id);

    expect(createProducer).to.have.been.calledOnce;
    expect(createProducer.firstCall.args[0]).to.have.property('region');
    expect(producer.send).to.have.been.calledOnceWithExactly([
      { id, body: data }
    ]);
    expect(result).to.equal(undefined);
  });

  it('rejects when the SQS producer send rejects', async () => {
    const error = new Error('SQS send failed');
    producer.send.rejects(error);

    await expect(sendToQueue({ allegation: 'details' }, 'allegation-123'))
      .to.be.rejectedWith(error);
  });

  it('throws a wrapped error when producer creation fails synchronously', () => {
    createProducer.throws(new Error('Producer setup failed'));

    expect(() => sendToQueue({}, 'allegation-123'))
      .to.throw('Failed to send to sqs queue');
  });
});
