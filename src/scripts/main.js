// The main javascript file for fepe_bicycle.
// IMPORTANT:
// Any resources from this project should be referenced using SRC_PATH preprocessor var
// Ex: let myImage = '/*@echo SRC_PATH*//img/sample.jpg';

/* global _ $ RegistrationModel LoadingPageView ThankYouPageView RegistrationPageView */

$(function () {
  document.querySelector('h1').setAttribute('tabindex', 0);

  const appModel = new RegistrationModel();
  let appView = new LoadingPageView();

  let willSetFocus = false;

  function renderThankYouPage() {
    const view = new ThankYouPageView({ model: appModel });
    view.on('navigate', () => {
      appModel.clear();
      const defaults = _.result(RegistrationModel.prototype, 'defaults');
      if (defaults) {
        appModel.set(defaults);
      }
      renderRegistrationPage();
    });
    return appView.swapWith(view).then(() => {
      appView = view;
      if (willSetFocus) {
        document.querySelector('h1').focus();
      } else {
        willSetFocus = true;
      }
    });
  }

  function renderRegistrationPage() {
    const view = new RegistrationPageView({ model: appModel });
    view.on('success', () => {
      renderThankYouPage();
    });
    return appView.swapWith(view).then(() => {
      appView = view;
      if (willSetFocus) {
        document.querySelector('h1').focus();
      } else {
        willSetFocus = true;
      }
    });
  }

  appView
    .appendTo(document.getElementById('fepe_bicycle_container'))
    .render()
    .then(() => {
      renderRegistrationPage();
    });
});
