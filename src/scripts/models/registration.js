/* global BaseModel grecaptcha */

/* exported RegistrationModel */
const RegistrationModel = BaseModel.extend({
  defaults: {
    first_name: 'FIRSTNAME',
    last_name: 'LASTNAME',
    title: 'MR',
    email: 'FIRSTNAME.LASTNAME@toronto.ca',
    primary_phone: '416-555-5555',
    alternate_phone: '416-555-5555',
    street_address: '1 Street Address Avenue',
    city: 'Toronto',
    province: 'Ontario',
    postal_code: 'M4B 1B3'
  },

  adjustSyncJson(json) {
    if (json.type !== 'Bicycle Lockers') {
      delete json.lockers_choice_1;
      delete json.lockers_choice_2;
      delete json.lockers_choice_3;
    }

    if (json.type !== 'Bicycle Stations') {
      delete json.stations_choice_1;
      delete json.stations_choice_2;
      delete json.stations_choice_3;
      delete json.bicycle_1_make;
      delete json.bicycle_1_model;
      delete json.bicycle_1_colour;
      delete json.bicycle_2_make;
      delete json.bicycle_2_model;
      delete json.bicycle_2_colour;
    }

    return json;
  },

  save(attributes, options = {}) {
    return new Promise((resolve, reject) => {
      grecaptcha.ready(() => {
        grecaptcha.execute('/*@echo RECAPTCHA_SITEKEY*/').then((token) => {
          options.headers = Object.assign({
            'Content-Type': 'application/json',
            'captchaResponseToken': token,
            'cot_recaptcha_config': '/* @echo RECAPTCHA_REGISTRATION_CONFIG_TOKEN */'
          }, options.headers);

          BaseModel.prototype.save.call(this, attributes, options).then(resolve, reject);
        });
      });
    })
  },

  parse(response, options) {
    return BaseModel.prototype.parse.call(this, JSON.parse(response.body), options);
  },

  urlRoot: '/* @echo RECAPTCHA_API_URL */'
});
