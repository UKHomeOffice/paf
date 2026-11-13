'use strict';
const { model: Model } = require('hof');
// eslint-disable-next-line node/no-missing-require
const uuid = require('uuid').v4;
const config = require('../../../config');
const FormData = require('form-data');
const fileUploadConfig = require('./file-upload-config');
const logger = require('hof/lib/logger')({ env: config.env });

module.exports = class UploadModel extends Model {
  constructor(...args) {
    super(...args);
    this.set('id', uuid());
  }

  async save() {
    try {
      if (!config.upload.hostname) {
        throw new Error('File upload service URL is not configured');
      }

      const attributes = {
        url: config.upload.hostname
      };
      const formData = new FormData();
      formData.append('document', this.get('data'), {
        filename: this.get('name'),
        contentType: this.get('mimetype')
      });
      const reqConf = {
        url: this.url(attributes),
        method: 'POST',
        data: formData,
        headers: formData.getHeaders(),
        timeout: fileUploadConfig.requestTimeoutMs
      };
      const result = await this.request(reqConf);

      if (!result || typeof result.url !== 'string') {
        throw result instanceof Error ? result : new Error('File upload service returned an invalid response');
      }

      this.set({ url: result.url.replace('/file/', '/file/generate-link/').split('?')[0] });
      logger.info('Successfully saved data');
      return this.unset('data');
    } catch (err) {
      logger.error('Error in save method: ', err);
      throw err;
    }
  }

  async auth() {
    try {
      if (!config.keycloak.token) {
        logger.error('keycloak token url is not defined');
        return {
          bearer: 'abc123'
        };
      }
      const tokenReq = {
        url: config.keycloak.token,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        timeout: fileUploadConfig.requestTimeoutMs,
        data: {
          username: config.keycloak.username,
          password: config.keycloak.password,
          grant_type: 'password',
          client_id: config.keycloak.clientId,
          client_secret: config.keycloak.secret
        },
        method: 'POST'
      };

      const response = await this._request(tokenReq);
      return { bearer: response.data.access_token };
    } catch (err) {
      const body = err.response?.data;
      logger.error(body ? `Error in auth method: ${body.error} - ${body.error_description}` : err.message);
      throw err;
    }
  }
};
