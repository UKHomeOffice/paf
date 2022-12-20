'use strict';

const url = require('url');
const Model = require('hof').model;
const uuid = require('uuid').v4;
const config = require('../../../config');

module.exports = class UploadModel extends Model {
  constructor(...args) {
    super(...args);
    this.set('id', uuid());
  }

  async save() {
    const result = await new Promise((resolve, reject) => {
      const attributes = {
        url: config.upload.hostname
      };
      const reqConf = url.parse(this.url(attributes));
      reqConf.formData = {
        document: {
          value: this.get('data'),
          options: {
            filename: this.get('name'),
            contentType: this.get('mimetype')
          }
        }
      };
      reqConf.method = 'POST';
      this.request(reqConf, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
    this.set({ url: result.url });
    return this.unset('data');
  }

  auth() {
    if (!config.keycloak.token) {
      // eslint-disable-next-line no-console
      console.error('keycloak token url is not defined');
      return Promise.resolve({
        bearer: 'abc123'
      });
    }
    const tokenReq = {
      url: config.keycloak.token,
      form: {
        username: config.keycloak.username,
        password: config.keycloak.password,
        grant_type: 'password',
        client_id: config.keycloak.clientId,
        client_secret: config.keycloak.secret
      },
      method: 'POST'
    };

    return new Promise((resolve, reject) => {
      this._request(tokenReq, (err, response) => {
        const body = JSON.parse(response.body);

        if (err || body.error) {
          return reject(err || new Error(`${body.error} - ${body.error_description}`));
        }

        resolve({
          bearer: JSON.parse(response.body).access_token
        });
      });
    });
  }
};
