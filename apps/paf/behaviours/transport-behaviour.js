module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    const vehicleTransport = req.form.values['transport-group'].includes('crime-transport-vehicle');
    const boatTransport = req.form.values['transport-group'].includes('crime-transport-boat');
    const trainTransport = req.form.values['transport-group'].includes('crime-transport-train');
    const aeroplaneTransport = req.form.values['transport-group'].includes('crime-transport-aeroplane');
   

    // this updates fields and change links for the in-progress check your answers page
    if (!vehicleTransport) {
      req.sessionModel.unset([
        'vehicle-type',
        'vehicle-make',
        'vehicle-model',
        'vehicle-colour',
        'vehicle-registration' 
      ]);
    } else if (!boatTransport) {
      req.sessionModel.unset([
        'boat-type',
        'boat-name',
        'boat-country-departure',
        'port-departure',
        'port-arrival',
        'port-departure-time',
        'port-arrival-time'
      ]);
    } else if (!trainTransport) {
      req.sessionModel.unset([
        'train-company',
        'train-country-departure',
        'station-departure',
        'station-arrival',
        'station-departure-time',
        'station-arrival-time'
      ]);
    } else if (!aeroplaneTransport) {
      req.sessionModel.unset([
        'airline-company',
        'airline-flight-number',
        'airline-country-departure',
        'airport-departure',
        'airport-arrival',
        'airport-departure-time',
        'airport-arrival-time'
      ]);
    }
    
    return super.saveValues(req, res, next);
  }
};
