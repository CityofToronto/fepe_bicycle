/* global BaseModel */

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

  urlRoot: '/* @echo C3DATA_REGISTRATION_URL */'
});
