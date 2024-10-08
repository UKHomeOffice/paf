'use strict';
/* eslint-disable */
const { v4: uuidv4 } = require('uuid');
const { sendToQueue } = require('../../../lib/utils');
const { addAllegationData } = require('../../../lib/add-allegation-data');
const config = require('../../../config');
const logger = require('hof/lib/logger')({ env: config.env });

module.exports = superclass => class SendToSQS extends superclass {
  saveValues(req, res, next) {
    let allegationId;
    let allegationData;

    try {
      allegationId = uuidv4();
      allegationData = addAllegationData(req.sessionModel.attributes);

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
    logger.error('Failed to send to SQS queue: ', err);
    return next(err);
  }
};
