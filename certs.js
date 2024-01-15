const https = require('https');
const fs = require('fs');




const getCertificate = function getRequest(){
    https.get('https://ho-it-prp1-i-ie-ims.report-and-manage-intelligence.np.immigrationservices.phz/lagan/services/FL', options, (res) => {
    // Handle the response
    });
}

const options = {
    hostname: 'apps/v1',
    path: '/api/v1/namespaces/sas-paf-branch/configmaps/',
    method: 'GET',
    ca: fs.readFileSync('/ims-prp1-ca.crt')
    };


   const req = https.request(options, (res) => {
    // Handle the response
  });

  req.on('error', (error) => {
    // Handle the error
  });

  req.end();
module.exports = {
    getCertificate: getCertificate,
    options : options
};
