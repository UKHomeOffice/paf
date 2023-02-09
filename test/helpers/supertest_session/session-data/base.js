const _ = require('lodash');

module.exports = (appName, overridenPages) => {
  const appIndex = require('../../../../apps/paf/index')
  const commonIndex = require('../../../../apps/common')
  const possibleSteps = (Object.keys(appIndex.steps)).concat(Object.keys(commonIndex.steps));

  return (stepOrData, data) => {
    const props = {};
    if (typeof stepOrData === 'string') {
      props.steps = _.dropRightWhile(possibleSteps, val => val !== stepOrData);
      props.steps.pop();
    } else {
      props.steps = possibleSteps;
    }
    props.steps.forEach(prop => {
      if (prop !== '/') {
        try {
          /* eslint-disable no-nested-ternary */
          if (overridenPages && require(`./${appName}/${overridenPages}${prop}`)) {
            Object.assign(props, require(`./${appName}/${overridenPages}${prop}`),
              data ? data : typeof stepOrData === 'object' ? stepOrData : {});
          } else {
            Object.assign(props, require(`./${appName}/pages${prop}`),
              data ? data : typeof stepOrData === 'object' ? stepOrData : {});
          }

          /* eslint-disable-next-line  no-empty */
        } catch (e) {}
        /* eslint-enable no-nested-ternary */
      }
    });
    return props;
  };
};
