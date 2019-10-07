const gulp = require('gulp');
const core = require('./node_modules/core/gulp_helper');
const pkg = require('./package.json');

core.embeddedApp.createTasks(gulp, {
  pkg,
  embedArea: 'full',
  environmentOverride: null,
  deploymentPath: '',
  preprocessorContext: {
    local: {
      C3DATA_REGISTRATION_URL: 'https://config.cc.toronto.ca:49093/c3api_data/v2/DataAccess.svc/bicycle_parking/registrations'
    },
    dev: {},
    qa: {},
    prod: {}
  }
});
