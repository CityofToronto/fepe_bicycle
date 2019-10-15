/* global doAjax IEversion BaseView FormView */

const RegistrationFormView = FormView.extend({
  className: 'registrationForm',

  formDefinition: function () {
    return {
      rootPath: '/* @echo SRC_PATH *//',

      sections: [
        {
          title: 'Contact Information',

          rows: [
            {
              fields: [
                {
                  title: 'First Name',
                  bindTo: 'first_name',
                  required: true
                },
                {
                  title: 'Last Name',
                  bindTo: 'last_name',
                  required: true
                },
                {
                  title: 'Title',
                  bindTo: 'title'
                }
              ]
            },
            {
              fields: [
                {
                  title: 'Email',
                  type: 'text',
                  bindTo: 'email',
                  id: 'email',

                  validators: {
                    callback: {
                      callback: (input) => {
                        if (!this.disableCallbackChaining) {
                          this.disableCallbackChaining = true;
                          this.formValidator.revalidateField('primary_phone');
                          this.formValidator.revalidateField('alternate_phone');
                          this.disableCallbackChaining = false;
                        }

                        if (input == ''
                          && this.el.querySelector('#primary_phone').value == ''
                          && this.el.querySelector('#alternate_phone').value == '') {

                          return false;
                        }

                        return true;
                      },
                      message: 'Please include atleast 1 contact information.'
                    },
                    // emailAddress: {
                    //   message: 'The value is not a valid email address'
                    // },
                    regexp: {
                      regexp: new RegExp("^(([^<>()\\[\\]\\\\.,:;\\s@\"]+(\\.[^<>()\\[\\]\\\\.,:;\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"),
                      message: 'The value is not a valid email address'
                    }
                  },
                },
                {
                  title: 'Primary Phone',
                  type: 'phone',
                  bindTo: 'primary_phone',
                  id: 'primary_phone',

                  validators: {
                    callback: {
                      callback: (value, validator, $field) => {
                        if (!this.disableCallbackChaining) {
                          this.disableCallbackChaining = true;
                          this.formValidator.revalidateField('email');
                          this.formValidator.revalidateField('alternate_phone');
                          this.disableCallbackChaining = false;
                        }

                        if (value == ''
                          && this.el.querySelector('#email').value == ''
                          && this.el.querySelector('#alternate_phone').value == '') {

                          return {
                            valid: false,
                            message: 'Please include atleast 1 contact information.'
                          };
                        }

                        if (IEversion < 10) {
                          if (value !== '') {
                            if (value.match(/\d{3}-?\d{3}-?\d{4}/) && value.match(/\d{3}-?\d{3}-?\d{4}/)[0] == value) {
                              $field.val(value.replace(/(\d{3})-?(\d{3})-?(\d{4})/, '$1-$2-$3'));
                              return {
                                valid: true
                              };
                            } else {
                              return {
                                valid: false,
                                message: 'This field must be a valid phone number.'
                              };
                            }
                          } else {
                            return {
                              valid: true
                            };
                          }
                        } else {
                          if (value === '' || $field.intlTelInput('isValidNumber')) {
                            return {
                              valid: true
                            };
                          } else {
                            return {
                              valid: false,
                              message: 'This field must be a valid phone number.'
                            };
                          }
                        }
                      }
                    }
                  },
                },
                {
                  title: 'Alternate Phone',
                  type: 'phone',
                  bindTo: 'alternate_phone',
                  id: 'alternate_phone',

                  validators: {
                    callback: {
                      callback: (value, validator, $field) => {
                        if (!this.disableCallbackChaining) {
                          this.disableCallbackChaining = true;
                          this.formValidator.revalidateField('email');
                          this.formValidator.revalidateField('primary_phone');
                          this.disableCallbackChaining = false;
                        }

                        if (value == ''
                          && this.el.querySelector('#email').value == ''
                          && this.el.querySelector('#primary_phone').value == '') {

                          return {
                            valid: false,
                            message: 'Please include atleast 1 contact information.'
                          };
                        }

                        if (IEversion < 10) {
                          if (value !== '') {
                            if (value.match(/\d{3}-?\d{3}-?\d{4}/) && value.match(/\d{3}-?\d{3}-?\d{4}/)[0] == value) {
                              $field.val(value.replace(/(\d{3})-?(\d{3})-?(\d{4})/, '$1-$2-$3'));
                              return {
                                valid: true
                              };
                            } else {
                              return {
                                valid: false,
                                message: 'This field must be a valid phone number.'
                              };
                            }
                          } else {
                            return {
                              valid: true
                            };
                          }
                        } else {
                          if (value === '' || $field.intlTelInput('isValidNumber')) {
                            return {
                              valid: true
                            };
                          } else {
                            return {
                              valid: false,
                              message: 'This field must be a valid phone number.'
                            };
                          }
                        }
                      }
                    }
                  },
                }
              ]
            },
            {
              fields: [
                {
                  title: 'Street Address',
                  bindTo: 'street_address'
                }
              ]
            },
            {
              fields: [
                {
                  title: 'City',
                  bindTo: 'city'
                },
                {
                  title: 'Province',
                  bindTo: 'province'
                },
                {
                  title: 'Postal Code',
                  bindTo: 'postal_code',
                  validationtype: 'PostalCode'
                }
              ]
            }
          ]
        },
        {
          title: 'Request Details',

          rows: [
            {
              fields: [
                {
                  title: 'Type',
                  type: 'dropdown',
                  bindTo: 'type',
                  choices: [
                    { text: 'Bicycle Lockers' },
                    { text: 'Bicycle Stations' }
                  ],
                  className: 'col-xs-12 col-md-4',
                  required: true,

                  postRender({ field, model, view }) {
                    let lastValue = model.get(field.bindTo);

                    const handler = () => {
                      const value = model.get(field.bindTo);

                      const lockers_group = view.el.querySelectorAll('.lockers_group');
                      if (value === 'Bicycle Lockers') {
                        for (let index = 0, length = lockers_group.length; index < length; index++) {
                          lockers_group[index].classList.remove('hide');
                        }
                      } else {
                        for (let index = 0, length = lockers_group.length; index < length; index++) {
                          lockers_group[index].classList.add('hide');
                        }
                      }

                      const stations_group = view.el.querySelectorAll('.stations_group');
                      if (value === 'Bicycle Stations') {
                        for (let index = 0, length = stations_group.length; index < length; index++) {
                          stations_group[index].classList.remove('hide');
                        }
                      } else {
                        for (let index = 0, length = stations_group.length; index < length; index++) {
                          stations_group[index].classList.add('hide');
                        }
                      }

                      let announcements = [];
                      switch (lastValue) {
                        case 'Bicycle Lockers':
                          announcements.push('Bicycle lockers first choice field has been removed.');
                          announcements.push('Bicycle lockers second choice field has been removed.');
                          announcements.push('Bicycle lockers third choice field has been removed.');
                          break;
                        case 'Bicycle Stations':
                          announcements.push('Bicycle stations first choice field has been removed.');
                          announcements.push('Bicycle stations second choice field has been removed.');
                          announcements.push('Bicycle stations third choice field has been removed.');
                          announcements.push('Bicycle information section has been removed.');
                          break;
                      }
                      lastValue = value;
                      switch (value) {
                        case 'Bicycle Lockers':
                          announcements.push('Bicycle lockers first choice field has been added.');
                          announcements.push('Bicycle lockers second choice field has been added.');
                          announcements.push('Bicycle lockers third choice field has been added.');
                          break;
                        case 'Bicycle Stations':
                          announcements.push('Bicycle stations first choice field has been added.');
                          announcements.push('Bicycle stations second choice field has been added.');
                          announcements.push('Bicycle stations third choice field has been added.');
                          announcements.push('Bicycle information section has been added.');
                      }
                      document.querySelector('.js-aria-live').textContent = announcements.join(' ');
                    };

                    model.on(`change:${field.bindTo}`, handler);

                    handler();
                  }
                }
              ]
            },
            {
              fields: [
                {
                  type: 'html',
                  html: '<h4 id="bicycle_lockers">Bicycle Lockers</h4>',
                  className: 'col-xs-12 heading',

                  postRender({ field }) {
                    document.getElementById(`${field.id}Element`).parentNode.classList.add('hide', 'lockers_group');
                  }
                }
              ]
            },
            {
              fields: [
                {
                  title: 'First Choice',
                  type: 'dropdown',
                  bindTo: 'lockers_choice_1',
                  id: 'lockers_choice_1',
                  // choices: '/* @echo C3DATAMEDIA_LOCKER_CHOICES */',
                  choices: this.lockerChoices,
                  required: true,

                  validators: {
                    callback: {
                      callback: (input) => {
                        if (!this.disableCallbackChaining) {
                          this.disableCallbackChaining = true;
                          this.formValidator.revalidateField('lockers_choice_2');
                          this.formValidator.revalidateField('lockers_choice_3');
                          this.disableCallbackChaining = false;
                        }

                        if (input === '') {
                          return true;
                        }

                        if (input == this.el.querySelector('#lockers_choice_2').value
                          || input == this.el.querySelector('#lockers_choice_3').value) {

                          return false;
                        }

                        return true;
                      },
                      message: 'You cannot select the same choice.'
                    }
                  },

                  postRender({ field }) {
                    document.getElementById(`${field.id}Element`).parentNode.classList.add('hide', 'lockers_group');
                    document.getElementById(`${field.id}Element`).querySelector('label').setAttribute('aria-labelledby', 'bicycle_lockers');
                  }
                },
                {
                  title: 'Second Choice',
                  type: 'dropdown',
                  bindTo: 'lockers_choice_2',
                  id: 'lockers_choice_2',
                  // choices: '/* @echo C3DATAMEDIA_LOCKER_CHOICES */',
                  choices: this.lockerChoices,

                  validators: {
                    callback: {
                      callback: (input) => {
                        if (!this.disableCallbackChaining) {
                          this.disableCallbackChaining = true;
                          this.formValidator.revalidateField('lockers_choice_1');
                          this.formValidator.revalidateField('lockers_choice_3');
                          this.disableCallbackChaining = false;
                        }

                        if (input === '') {
                          return true;
                        }

                        if (input == this.el.querySelector('#lockers_choice_1').value
                          || input == this.el.querySelector('#lockers_choice_3').value) {

                          return false;
                        }

                        return true;
                      },
                      message: 'You cannot select the same choice.'
                    }
                  },

                  postRender({ field }) {
                    document.getElementById(`${field.id}Element`).querySelector('label').setAttribute('aria-labelledby', 'bicycle_lockers');
                  }
                },
                {
                  title: 'Third Choice',
                  type: 'dropdown',
                  bindTo: 'lockers_choice_3',
                  id: 'lockers_choice_3',
                  // choices: '/* @echo C3DATAMEDIA_LOCKER_CHOICES */',
                  choices: this.lockerChoices,

                  validators: {
                    callback: {
                      callback: (input) => {
                        if (!this.disableCallbackChaining) {
                          this.disableCallbackChaining = true;
                          this.formValidator.revalidateField('lockers_choice_1');
                          this.formValidator.revalidateField('lockers_choice_2');
                          this.disableCallbackChaining = false;
                        }

                        if (input === '') {
                          return true;
                        }

                        if (input == this.el.querySelector('#lockers_choice_1').value
                          || input == this.el.querySelector('#lockers_choice_2').value) {

                          return false;
                        }

                        return true;
                      },
                      message: 'You cannot select the same choice.'
                    }
                  },

                  postRender({ field }) {
                    document.getElementById(`${field.id}Element`).querySelector('label').setAttribute('aria-labelledby', 'bicycle_lockers');
                  }
                }
              ]
            },
            {
              fields: [
                {
                  type: 'html',
                  html: '<h4 id="bicycle_stations">Bicycle Stations</h4>',
                  className: 'col-xs-12 heading',

                  postRender({ field }) {
                    document.getElementById(`${field.id}Element`).parentNode.classList.add('hide', 'stations_group');
                  }
                }
              ]
            },
            {
              fields: [
                {
                  title: 'First Choice',
                  type: 'dropdown',
                  bindTo: 'stations_choice_1',
                  id: 'stations_choice_1',
                  // choices: '/* @echo C3DATAMEDIA_STATION_CHOICES */',
                  choices: this.stationChoices,
                  required: true,

                  validators: {
                    callback: {
                      callback: (input) => {
                        if (!this.disableCallbackChaining) {
                          this.disableCallbackChaining = true;
                          this.formValidator.revalidateField('stations_choice_2');
                          this.formValidator.revalidateField('stations_choice_3');
                          this.disableCallbackChaining = false;
                        }

                        if (input === '') {
                          return true;
                        }

                        if (input == this.el.querySelector('#stations_choice_2').value
                          || input == this.el.querySelector('#stations_choice_3').value) {

                          return false;
                        }

                        return true;
                      },
                      message: 'You cannot select the same choice.'
                    }
                  },

                  postRender({ field }) {
                    document.getElementById(`${field.id}Element`).parentNode.classList.add('hide', 'stations_group');
                    document.getElementById(`${field.id}Element`).querySelector('label').setAttribute('aria-labelledby', 'bicycle_stations');
                  }
                },
                {
                  title: 'Second Choice',
                  type: 'dropdown',
                  bindTo: 'stations_choice_2',
                  id: 'stations_choice_2',
                  // choices: '/* @echo C3DATAMEDIA_STATION_CHOICES */',
                  choices: this.stationChoices,

                  validators: {
                    callback: {
                      callback: (input) => {
                        if (!this.disableCallbackChaining) {
                          this.disableCallbackChaining = true;
                          this.formValidator.revalidateField('stations_choice_1');
                          this.formValidator.revalidateField('stations_choice_3');
                          this.disableCallbackChaining = false;
                        }

                        if (input === '') {
                          return true;
                        }

                        if (input == this.el.querySelector('#stations_choice_1').value
                          || input == this.el.querySelector('#stations_choice_3').value) {

                          return false;
                        }

                        return true;
                      },
                      message: 'You cannot select the same choice.'
                    }
                  },

                  postRender({ field }) {
                    document.getElementById(`${field.id}Element`).querySelector('label').setAttribute('aria-labelledby', 'bicycle_stations');
                  }
                },
                {
                  title: 'Third Choice',
                  type: 'dropdown',
                  bindTo: 'stations_choice_3',
                  id: 'stations_choice_3',
                  // choices: '/* @echo C3DATAMEDIA_STATION_CHOICES */',
                  choices: this.stationChoices,

                  validators: {
                    callback: {
                      callback: (input) => {
                        if (!this.disableCallbackChaining) {
                          this.disableCallbackChaining = true;
                          this.formValidator.revalidateField('stations_choice_1');
                          this.formValidator.revalidateField('stations_choice_2');
                          this.disableCallbackChaining = false;
                        }

                        if (input === '') {
                          return true;
                        }

                        if (input == this.el.querySelector('#stations_choice_1').value
                          || input == this.el.querySelector('#stations_choice_2').value) {

                          return false;
                        }

                        return true;
                      },
                      message: 'You cannot select the same choice.'
                    }
                  },

                  postRender({ field }) {
                    document.getElementById(`${field.id}Element`).querySelector('label').setAttribute('aria-labelledby', 'bicycle_stations');
                  }
                }
              ]
            }
          ]
        },
        {
          title: 'Bicycle Information',
          className: 'hide panel-default stations_group',

          rows: [
            {
              fields: [
                {
                  type: 'html',
                  html: '<h4 id="first_bicycle">First Bicycle</h4>',
                  className: 'col-xs-12 heading'
                }
              ]
            },
            {
              fields: [
                {
                  title: 'Make',
                  bindTo: 'bicycle_1_make',
                  required: true,

                  postRender({ field }) {
                    document.getElementById(`${field.id}Element`).querySelector('label').setAttribute('aria-labelledby', 'first_bicycle');
                  }
                },
                {
                  title: 'Model',
                  bindTo: 'bicycle_1_model',
                  required: true,

                  postRender({ field }) {
                    document.getElementById(`${field.id}Element`).querySelector('label').setAttribute('aria-labelledby', 'first_bicycle');
                  }
                },
                {
                  title: 'Colour',
                  bindTo: 'bicycle_1_colour',
                  required: true,

                  postRender({ field }) {
                    document.getElementById(`${field.id}Element`).querySelector('label').setAttribute('aria-labelledby', 'first_bicycle');
                  }
                }
              ]
            },
            {
              fields: [
                {
                  type: 'html',
                  html: '<h4 id="second_bicycle">Second Bicycle</h4>',
                  className: 'col-xs-12 heading'
                }
              ]
            },
            {
              fields: [
                {
                  title: 'Make',
                  bindTo: 'bicycle_2_make',

                  postRender({ field }) {
                    document.getElementById(`${field.id}Element`).querySelector('label').setAttribute('aria-labelledby', 'second_bicycle');
                  }
                },
                {
                  title: 'Model',
                  bindTo: 'bicycle_2_model',

                  postRender({ field }) {
                    document.getElementById(`${field.id}Element`).querySelector('label').setAttribute('aria-labelledby', 'second_bicycle');
                  }
                },
                {
                  title: 'Colour',
                  bindTo: 'bicycle_2_colour',

                  postRender({ field }) {
                    document.getElementById(`${field.id}Element`).querySelector('label').setAttribute('aria-labelledby', 'second_bicycle');
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  },

  render() {
    this.lockerChoices = [];
    this.stationChoices = [];
    return Promise.all([
      doAjax({ url: '/* @echo C3DATAMEDIA_LOCKER_CHOICES */' })
        .then(({ data }) => this.lockerChoices = data),
      doAjax({ url: '/* @echo C3DATAMEDIA_STATION_CHOICES */' })
        .then(({ data }) => this.stationChoices = data)
    ]).then(() => {
      return FormView.prototype.render.call(this)
        .then(() => {
          const buttonsElement = this.form.appendChild(document.createElement('p'));
          buttonsElement.innerHTML = '<button class="btn btn-primary btn-lg">Register</button>';
        });
    });
  }
});

/* exported RegistrationPageView */
const RegistrationPageView = BaseView.extend({
  render() {
    this.removeSubViews();
    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild);
    }
    this.subViews = {};

    const fragment = document.createDocumentFragment();

    this.subViews.formView = new RegistrationFormView({ model: this.model });
    this.listenTo(this.subViews.formView, 'success', () => {
      this.trigger('success');
    });

    const renderPromise = this.subViews.formView.appendTo(fragment).render();

    this.el.appendChild(fragment);

    return renderPromise.then(() => BaseView.prototype.render.call(this));
  }
});
