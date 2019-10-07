/* global BaseView FormView */

const RegistrationFormView = FormView.extend({
  formDefinition: {
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
                bindTo: 'email'
              },
              {
                title: 'Primary Phone',
                type: 'phone',
                bindTo: 'primary_phone'
              },
              {
                title: 'Alternate Phone',
                type: 'phone',
                bindTo: 'alternate_phone'
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
                className: 'col-sm-4',

                postRender({ field, model, view }) {
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
                html: '<h4>Bicycle Lockers</h4>',
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
                choices: [
                  { text: 'OPTION 1' },
                  { text: 'OPTION 2' },
                  { text: 'OPTION 3' }
                ],

                postRender({ field }) {
                  document.getElementById(`${field.id}Element`).parentNode.classList.add('hide', 'lockers_group');
                }
              },
              {
                title: 'Second Choice',
                type: 'dropdown',
                bindTo: 'lockers_choice_2',
                choices: [
                  { text: 'OPTION 1' },
                  { text: 'OPTION 2' },
                  { text: 'OPTION 3' }
                ]
              },
              {
                title: 'Third Choice',
                type: 'dropdown',
                bindTo: 'lockers_choice_3',
                choices: [
                  { text: 'OPTION 1' },
                  { text: 'OPTION 2' },
                  { text: 'OPTION 3' }
                ]
              }
            ]
          },
          {
            fields: [
              {
                type: 'html',
                html: '<h4>Bicycle Stations</h4>',
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
                choices: [
                  { text: 'OPTION 1' },
                  { text: 'OPTION 2' },
                  { text: 'OPTION 3' }
                ],

                postRender({ field }) {
                  document.getElementById(`${field.id}Element`).parentNode.classList.add('hide', 'stations_group');
                }
              },
              {
                title: 'Second Choice',
                type: 'dropdown',
                bindTo: 'stations_choice_2',
                choices: [
                  { text: 'OPTION 1' },
                  { text: 'OPTION 2' },
                  { text: 'OPTION 3' }
                ]
              },
              {
                title: 'Third Choice',
                type: 'dropdown',
                bindTo: 'stations_choice_3',
                choices: [
                  { text: 'OPTION 1' },
                  { text: 'OPTION 2' },
                  { text: 'OPTION 3' }
                ]
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
                html: '<h4>First Bicycle</h4>',
                className: 'col-xs-12 heading'
              }
            ]
          },
          {
            fields: [
              {
                title: 'Make',
                bindTo: 'bicycle_1_make'
              },
              {
                title: 'Model',
                bindTo: 'bicycle_1_model'
              },
              {
                title: 'Colour',
                bindTo: 'bicycle_1_colour'
              }
            ]
          },
          {
            fields: [
              {
                type: 'html',
                html: '<h4>Second Bicycle</h4>',
                className: 'col-xs-12 heading'
              }
            ]
          },
          {
            fields: [
              {
                title: 'Make',
                bindTo: 'bicycle_2_make'
              },
              {
                title: 'Model',
                bindTo: 'bicycle_2_model'
              },
              {
                title: 'Colour',
                bindTo: 'bicycle_2_colour'
              }
            ]
          }
        ]
      }
    ]
  },

  render() {
    return FormView.prototype.render.call(this)
      .then(() => {
        const buttonsElement = document.createElement('div');
        buttonsElement.innerHTML = `
          <button class="btn btn-primary btn-lg">Register</button>
        `

        this.form.appendChild(buttonsElement);
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
