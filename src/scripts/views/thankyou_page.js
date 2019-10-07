/* global BaseView */

/* exported ThankYouPageView */
const ThankYouPageView = BaseView.extend({
  render() {
    this.el.innerHTML = `
      <div class="row">
        <div class="col-10">
          <h2>Thank You For Your Registration</h2>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae tempor sapien. Praesent magna purus,
          maximus sit amet nisl quis, malesuada pulvinar sem. Aenean tempus efficitur pharetra. Pellentesque vitae sodales
          purus. Vestibulum faucibus odio vel ultrices tempor. Cras vulputate sem vel sagittis eleifend. Suspendisse
          lobortis, ipsum in faucibus vestibulum, enim metus vulputate lectus, in interdum ante lorem a leo. Nam pretium
          mauris in tristique ullamcorper. Donec finibus tristique tellus, non vulputate lectus cursus eu. Suspendisse porta
          arcu et eros molestie, consequat tincidunt velit sodales. Fusce enim lorem, cursus quis fermentum eget, blandit
          pharetra nibh.</p>
        </div>
      </div>
    `;
    return BaseView.prototype.render.call(this);
  }
});
