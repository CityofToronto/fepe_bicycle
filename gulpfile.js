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
      RECAPTCHA_SITEKEY: "6LeN_XIUAAAAAEd8X21vFtkJ3_c7uA0xpUGcrGpe",
      RECAPTCHA_API_URL: "https://was-intra-sit.toronto.ca/c3api_data/v2/DataAccess.svc/cot_dts_recaptcha/app_config/ca.toronto.api.dataaccess.odata4.verify",

      RECAPTCHA_REGISTRATION_CONFIG_TOKEN: "387825d4-cdc2-4c50-9029-516a0eeb28f5",
    },
    dev: {
      RECAPTCHA_SITEKEY: "6LeN_XIUAAAAAEd8X21vFtkJ3_c7uA0xpUGcrGpe",
      RECAPTCHA_API_URL: "https://was-intra-sit.toronto.ca/c3api_data/v2/DataAccess.svc/cot_dts_recaptcha/app_config/ca.toronto.api.dataaccess.odata4.verify",

      RECAPTCHA_REGISTRATION_CONFIG_TOKEN: "387825d4-cdc2-4c50-9029-516a0eeb28f5",
    },
    qa: {
      RECAPTCHA_SITEKEY: "6LeN_XIUAAAAAEd8X21vFtkJ3_c7uA0xpUGcrGpe",
      RECAPTCHA_API_URL: "https://was-intra-sit.toronto.ca/c3api_data/v2/DataAccess.svc/cot_dts_recaptcha/app_config/ca.toronto.api.dataaccess.odata4.verify",

      RECAPTCHA_REGISTRATION_CONFIG_TOKEN: "387825d4-cdc2-4c50-9029-516a0eeb28f5",
    },
    prod: {}
  }
});
