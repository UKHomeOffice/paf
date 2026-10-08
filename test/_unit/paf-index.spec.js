'use strict';

const { expect } = require('chai');
const paf = require('../../apps/paf');

describe('PAF app configuration', () => {
  const evaluateFork = (route, target, values, formValues = {}) => {
    const fork = paf.steps[route].forks.find(item => item.target === target);
    const req = {
      form: { values: formValues },
      sessionModel: { get: field => values[field] }
    };

    return fork.condition(req);
  };

  it('exposes the PAF app metadata and core journey routes', () => {
    expect(paf).to.include({ name: 'paf', baseUrl: '/paf', params: '/:action?/:id?/:edit?' });
    expect(paf.steps['/crime-type'].next).to.equal('/crime-children');
    expect(paf.steps['/confirm'].next).to.equal('/declaration');
    expect(paf.steps['/declaration'].next).to.equal('/confirmation');
  });

  it('wires upload and confirmation behaviors to their routes', () => {
    expect(paf.steps['/other-info-file-upload'].fields)
      .to.deep.equal(['other-info-file-upload']);
    expect(paf.steps['/other-info-file-upload'].forks[0].target)
      .to.equal('/add-other-info-file-upload');
    expect(paf.steps['/confirm'].sections).to.be.an('object');
    expect(paf.steps['/confirm'].behaviours).to.have.length(3);
  });

  it('routes primary transport selections only when transport is involved', () => {
    const cases = [
      ['/crime-transport', '/crime-transport-vehicle-type', ['crime-transport-vehicle'], true],
      ['/crime-transport', '/crime-transport-boat-type', ['crime-transport-boat'], true],
      ['/crime-transport', '/crime-transport-train-details', ['crime-transport-train'], true],
      ['/crime-transport', '/crime-transport-aeroplane-details', ['crime-transport-aeroplane'], true],
      ['/crime-transport', '/crime-transport-vehicle-type', ['crime-transport-vehicle'], false, 'no'],
      ['/crime-transport', '/crime-transport-boat-type', ['crime-transport-boat'], false, 'no'],
      ['/crime-transport', '/crime-transport-train-details', ['crime-transport-train'], false, 'no'],
      ['/crime-transport', '/crime-transport-aeroplane-details', ['crime-transport-aeroplane'], false, 'no']
    ];

    cases.forEach(([route, target, group, expected, involvement = 'yes']) => {
      expect(evaluateFork(route, target, {
        'crime-transport': involvement,
        'transport-group': group
      })).to.equal(expected, `${target} with ${involvement} and ${group}`);
    });
  });

  it('routes subsequent transport selections when a vehicle was selected first', () => {
    const cases = [
      [
        '/crime-transport-vehicle-details', '/crime-transport-boat-type',
        ['vehicle', 'crime-transport-boat'], true
      ],
      [
        '/crime-transport-vehicle-details', '/crime-transport-train-details',
        ['vehicle', 'crime-transport-train'], true
      ],
      [
        '/crime-transport-vehicle-details', '/crime-transport-aeroplane-details',
        ['vehicle', 'crime-transport-aeroplane'], true
      ],
      [
        '/crime-transport-vehicle-details', '/crime-transport-boat-type',
        ['vehicle', 'crime-transport-boat'], false, 'no'
      ],
      [
        '/crime-transport-vehicle-details', '/crime-transport-train-details',
        ['vehicle', 'crime-transport-train'], false, 'no'
      ],
      [
        '/crime-transport-vehicle-details', '/crime-transport-aeroplane-details',
        ['vehicle', 'crime-transport-aeroplane'], false, 'no'
      ]
    ];

    cases.forEach(([route, target, group, expected, involvement = 'yes']) => {
      expect(evaluateFork(route, target, {
        'crime-transport': involvement,
        'transport-group': group
      })).to.equal(expected, `${target} with ${involvement} and ${group}`);
    });
  });

  it('routes later transport selections while avoiding duplicate plane steps', () => {
    const cases = [
      [
        '/crime-transport-boat-details', '/crime-transport-train-details',
        ['crime-transport-train'], true
      ],
      [
        '/crime-transport-boat-details', '/crime-transport-train-details',
        ['crime-transport-aeroplane'], false
      ],
      [
        '/crime-transport-boat-details', '/crime-transport-aeroplane-details',
        ['crime-transport-aeroplane'], true
      ],
      [
        '/crime-transport-boat-details', '/crime-transport-aeroplane-details',
        ['crime-transport-aeroplane', 'crime-transport-train'], false
      ],
      [
        '/crime-transport-train-details', '/crime-transport-aeroplane-details',
        ['crime-transport-aeroplane'], true
      ],
      [
        '/crime-transport-train-details', '/crime-transport-aeroplane-details',
        ['crime-transport-train'], false
      ]
    ];

    cases.forEach(([route, target, group, expected]) => {
      expect(evaluateFork(route, target, {
        'crime-transport': 'yes',
        'transport-group': group
      })).to.equal(expected, `${route} to ${target} with ${group}`);
    });

    expect(evaluateFork(
      '/crime-transport-boat-details', '/crime-transport-train-details', {
        'crime-transport': 'no',
        'transport-group': ['crime-transport-train']
      }
    )).to.equal(false);
    expect(evaluateFork('/crime-transport-boat-details', '/crime-transport-aeroplane-details', {
      'crime-transport': 'no',
      'transport-group': ['crime-transport-aeroplane']
    })).to.equal(false);
    expect(evaluateFork('/crime-transport-train-details', '/crime-transport-aeroplane-details', {
      'crime-transport': 'no',
      'transport-group': ['crime-transport-aeroplane']
    })).to.equal(false);
  });

  it('adds the optional upload loop only when a file value is present', () => {
    expect(evaluateFork('/other-info-file-upload', '/add-other-info-file-upload', {}, {
      'other-info-file-upload': 'evidence.pdf'
    })).to.equal(true);
    expect(evaluateFork('/other-info-file-upload', '/add-other-info-file-upload', {}, {
      'other-info-file-upload': ''
    })).to.equal(false);
  });
});
