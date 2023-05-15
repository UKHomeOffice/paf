'use strict';

const { v4: uuidv4 } = require('uuid');
const { addFields, sendToQueue } = require('../../../lib/utils');

module.exports = superclass => class SendToSQS extends superclass {
  // eslint-disable-next-line consistent-return
  saveValues(req, res, next) {
    try {
      let allegationId = uuidv4();
      let allegationData = addFields(req.sessionModel.attributes);

        return sendToQueue(allegationData, allegationId)
            .then(() => {
                next();
            })
            .catch(err => {
                SendToSQS.handleError(next, err, allegationId, allegationData);
            });
    } catch (err) {
        SendToSQS.handleError(next, err, allegationId, allegationData);
    }
  }

  static handleError(next, err, id, data) {
    const allegationDetails = {
      allegationId: id,
      data
    };
    err.formNotSubmitted = true;
    err.allegationDetails = allegationDetails;
    // eslint-disable-next-line no-console
    console.error('Failed to send to SQS queue: ', err);
    return next(err);
  }
};
