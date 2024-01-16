module.exports = superclass => class extends superclass {
  locals(req, res) {
    const locals = super.locals(req, res);

    // set crime-transport-vehicle toggles
    if (req.form.values['crime-car-group'] === 'car') {
      locals.carChecked = true;
    } else if (req.form.values['crime-car-group'] === 'car-transporter') {
      locals.carTransporterChecked = true;
    } else if (req.form.values['crime-hgv-group'] === 'hgv-canvas-sided') {
      locals.hgvCSChecked = true;
    } else if (req.form.values['crime-hgv-group'] === 'hgv-flatbed') {
      locals.hgvFChecked = true;
    } else if (req.form.values['crime-hgv-group'] === 'hgv-hard-sided') {
      locals.hgvHSChecked = true;
    } else if (req.form.values['crime-hgv-group'] === 'hgv-refridgerated') {
      locals.hgvRChecked = true;
    } else if (req.form.values['crime-hgv-group'] === 'hgv-tanker') {
      locals.hgvTChecked = true;
    } else if (req.form.values['crime-lorry-group'] === 'lorry') {
      locals.lorryChecked = true;
    } else if (req.form.values['crime-lorry-group'] === 'lorry-and-drag') {
      locals.lorryDragChecked = true;
    } else if (req.form.values['crime-van-group'] === 'van') {
      locals.vanChecked = true;
    } else if (req.form.values['crime-van-group'] === 'van-and-trailer') {
      locals.vanTrailerChecked = true;
    } else if (req.form.values['crime-van-group'] === 'van-other') {
      locals.vanOtherChecked = true;
    } else if (req.form.values['crime-van-group'] === 'seven-point-five-tonne-van') {
      locals.sevenVanChecked = true;
    }

    // set crime-transport-boat toggles
    if (req.form.values['crime-carrier-group'] === 'bulk-carrier') {
      locals.bulkChecked = true;
    } else if (req.form.values['crime-carrier-group'] === 'vehicle-carrier') {
      locals.vehicleChecked = true;
    } else if (req.form.values['crime-carrier-group'] === 'vessel-carrier') {
      locals.vesselChecked = true;
    } else if (req.form.values['crime-general-cargo-group'] === 'general-cargo') {
      locals.generalChecked = true;
    } else if (req.form.values['crime-general-cargo-group'] === 'general-cargo-with-container-capacity') {
      locals.generalContainerChecked = true;
    } else if (req.form.values['crime-vessel-group'] === 'research-vessel') {
      locals.researchChecked = true;
    } else if (req.form.values['crime-vessel-group'] === 'supply-vessel') {
      locals.supplyChecked = true;
    } else if (req.form.values['crime-vessel-group'] === 'support-vessel') {
      locals.supportChecked = true;
    }

    // set report-person-transport toggles
    if (req.form.values['report-person-transport-car-group'] === 'car') {
      locals.personCarChecked = true;
    } else if (req.form.values['report-person-transport-car-group'] === 'car-transporter') {
      locals.personCarTransporterChecked = true;
    } else if (req.form.values['report-person-transport-hgv-group'] === 'hgv-canvas-sided') {
      locals.personHgvCSChecked = true;
    } else if (req.form.values['report-person-transport-hgv-group'] === 'hgv-flatbed') {
      locals.personHgvFChecked = true;
    } else if (req.form.values['report-person-transport-hgv-group'] === 'hgv-hard-sided') {
      locals.personHgvHSChecked = true;
    } else if (req.form.values['report-person-transport-hgv-group'] === 'hgv-refridgerated') {
      locals.personHgvRChecked = true;
    } else if (req.form.values['report-person-transport-hgv-group'] === 'hgv-tanker') {
      locals.personHgvTChecked = true;
    } else if (req.form.values['report-person-transport-lorry-group'] === 'lorry') {
      locals.personLorryChecked = true;
    } else if (req.form.values['report-person-transport-lorry-group'] === 'lorry-and-drag') {
      locals.personLorryDragChecked = true;
    } else if (req.form.values['report-person-transport-van-group'] === 'van') {
      locals.personVanChecked = true;
    } else if (req.form.values['report-person-transport-van-group'] === 'van-and-trailer') {
      locals.personVanTrailerChecked = true;
    } else if (req.form.values['report-person-transport-van-group'] === 'van-other') {
      locals.personVanOtherChecked = true;
    } else if (req.form.values['report-person-transport-van-group'] === 'seven-point-five-tonne-van') {
      locals.personSevenVanChecked = true;
    }

    return locals;
  }
};
