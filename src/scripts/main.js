// The main javascript file for fepe_bicycle.
// IMPORTANT:
// Any resources from this project should be referenced using SRC_PATH preprocessor var
// Ex: let myImage = '/*@echo SRC_PATH*//img/sample.jpg';

$(function () {
  if (window['CotApp']) { //the code in this 'if' block should be deleted for embedded apps
    const app = new CotApp("fepe_bicycle",{
      hasContentTop: false,
      hasContentBottom: false,
      hasContentRight: false,
      hasContentLeft: false,
      searchcontext: 'INTER'
    });

    app.setBreadcrumb([
      {"name": "fepe_bicycle", "link": "#"}
    ]).render();
  }
  let container = $('#fepe_bicycle_container');
});
