'use strict';

module.exports = superclass => class extends superclass {
  process(req, res, next) {
    if (req.sessionModel.get('crime-car-group')) {
      req.sessionModel.set('vehicle-type', req.sessionModel.get('crime-car-group'));
    }
    if (req.sessionModel.get('crime-hgv-group')) {
      req.sessionModel.set('vehicle-type', req.sessionModel.get('crime-hgv-group'));
    }
    if (req.sessionModel.get('crime-lorry-group')) {
      req.sessionModel.set('vehicle-type', req.sessionModel.get('crime-lorry-group'));
    }
    if (req.sessionModel.get('crime-van-group')) {
      req.sessionModel.set('vehicle-type', req.sessionModel.get('crime-van-group'));
    }
    if (req.sessionModel.get('crime-carrier-group')) {
      req.sessionModel.set('boat-type', req.sessionModel.get('crime-carrier-group'));
    }
    if (req.sessionModel.get('crime-general-cargo-group')) {
      req.sessionModel.set('boat-type', req.sessionModel.get('crime-general-cargo-group'));
    }
    if (req.sessionModel.get('crime-vessel-group')) {
      req.sessionModel.set('boat-type', req.sessionModel.get('crime-vessel-group'));
    }
    if (req.sessionModel.get('report-person-transport-car-group')) {
      req.sessionModel.set('report-person-transport-type', req.sessionModel.get('report-person-transport-car-group'));
    }
    if (req.sessionModel.get('report-person-transport-hgv-group')) {
      req.sessionModel.set('report-person-transport-type', req.sessionModel.get('report-person-transport-hgv-group'));
    }
    if (req.sessionModel.get('report-person-transport-lorry-group')) {
      req.sessionModel.set('report-person-transport-type', req.sessionModel.get('report-person-transport-lorry-group'));
    }
    if (req.sessionModel.get('report-person-transport-van-group')) {
      req.sessionModel.set('report-person-transport-type', req.sessionModel.get('report-person-transport-van-group'));
    }
    return super.process(req, res, next);
  }
};
