/* global BaseView */

/* exported ThankYouPageView */
const ThankYouPageView = BaseView.extend({
  className: 'thankYouPage',

  events: {
    ['click .btn-done'](event) {
      event.preventDefault();
      this.trigger('navigate');
    }
  },

  render() {
    this.el.innerHTML = `
      <div class="row">
        <div class="col-xs-12 col-md-12">
          <h2>Thank you for your registration</h2>

          <p>This application form was successfully sent to the Administrator.</p>

          <table class="table table-bordered">
            <tbody>
              <tr><th colspan="2">Contact Information</th></tr>
              <tr><td width="33%">Confirmation ID</td><td>${this.model.escape('id')}</td></tr>
              <tr><td width="33%">First Name</td><td>${this.model.escape('first_name')}</td></tr>
              <tr><td>Last Name</td><td>${this.model.escape('last_name')}</td></tr>
              <tr><td>Title</td><td>${this.model.escape('title')}</td></tr>
              <tr><td>Primary Phone Number</td><td>${this.model.escape('email')}</td></tr>
              <tr><td>Primary Phone Number</td><td>${this.model.escape('primary_phone')}</td></tr>
              <tr><td>Alternate Phone Number</td><td>${this.model.escape('alternate_phone')}</td></tr>
              <tr><td>Address</td><td>${this.model.escape('street_address')}</td></tr>
              <tr><td>City</td><td>${this.model.escape('city')}</td></tr>
              <tr><td>Province</td><td>${this.model.escape('province')}</td></tr>
              <tr><td>Postal Code</td><td>${this.model.escape('postal_code')}</td></tr>
              <tr><th colspan="2">Request Information</th></tr>
              <tr><td>Type</td><td>${this.model.escape('type')}</td></tr>
              ${
                this.model.get('type') === 'Bicycle Lockers'
                  ? `
                  <tr><td>Choice 1</td><td>${this.model.escape('lockers_choice_1')}</td></tr>
                  <tr><td>Choice 2</td><td>${this.model.escape('lockers_choice_2') || '-'}</td></tr>
                  <tr><td>Choice 3</td><td>${this.model.escape('lockers_choice_3') || '-'}</td></tr>
                  `
                  : `
                  <tr><td>Choice 1</td><td>${this.model.escape('stations_choice_1')}</td></tr>
                  <tr><td>Choice 2</td><td>${this.model.escape('stations_choice_2') || '-'}</td></tr>
                  <tr><td>Choice 3</td><td>${this.model.escape('stations_choice_3') || '-'}</td></tr>
                  <tr><th colspan="2">Bicycle Information</th></tr>
                  <tr><td>Bicycle 1</td><td>${[
                    this.model.get('bicycle_1_make') ? `Make: ${this.model.escape('bicycle_1_make')}` : false,
                    this.model.get('bicycle_1_model') ? `Model: ${this.model.escape('bicycle_1_model')}` : false,
                    this.model.get('bicycle_1_colour') ? `Colour: ${this.model.escape('bicycle_1_colour')}` : false
                  ].filter((value) => { return value; }).join(' / ')}</td></tr>
                  <tr><td>Bicycle 2</td><td>${[
                    this.model.get('bicycle_2_make') ? `Make: ${this.model.escape('bicycle_2_make')}` : false,
                    this.model.get('bicycle_2_model') ? `Model: ${this.model.escape('bicycle_2_model')}` : false,
                    this.model.get('bicycle_2_colour') ? `Colour: ${this.model.escape('bicycle_2_colour')}` : false
                  ].filter((value) => { return value; }).join(' / ')}</td></tr>
                  `
              }
            </tbody>
          </table>

          <p><button type="button" class="btn btn-primary btn-lg btn-done">Submit Another Registration</button></p>
        </div>
      </div>
    `;
    return BaseView.prototype.render.call(this);
  }
});
