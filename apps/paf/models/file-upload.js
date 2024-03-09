/* eslint-disable node/no-deprecated-api */
'use strict';
/* eslint-disable */
const url = require('url');
const Model = require('hof').model;
const uuid = require('uuid').v4;
const config = require('../../../config');
const FormData = require('form-data');
const axios = require('axios');

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
      const formData = new FormData();
      formData.append('document', this.get('data'), {
        filename: this.get('name'),
        contentType: this.get('mimetype')
      });
      reqConf.data = formData;
      reqConf.method = 'POST';
      reqConf.headers = {
        ...formData.getHeaders()
      };
      return this.request(reqConf, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
    this.set({ url: result.url });
    return this.unset('data');
  }

  auth() {
    if (!config.keycloak.token) {
      console.error('keycloak token url is not defined');
      return Promise.resolve({
        bearer: 'abc123'
      });
    }
    const tokenReq = {
      url: config.keycloak.token,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        username: config.keycloak.username,
        password: config.keycloak.password,
        grant_type: 'password',
        client_id: config.keycloak.clientId,
        client_secret: config.keycloak.secret
      },
      method: 'POST'
    };

    return axios(tokenReq).then(response => {
      return { bearer: response.data.access_token };
    })
      .catch(err => {
        const body = err.response.data
        console.log(`Error: ${body.error} - ${body.error_description}`);
        throw err || new Error(`${body.error} - ${body.error_description}`);
      });
  }
};
