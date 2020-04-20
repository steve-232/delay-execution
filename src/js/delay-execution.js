
// eslint-disable-next-line no-unused-vars
class DelayExecution {
  constructor({
    elem = null,
    func = null,
    pixelDelay = 0,
    timeDelay = 0,
    includeElemHeight = true,
    debounce = 500,
  }) {
    if (!(elem instanceof HTMLElement)) throw new Error('"elem" is not HTMLElement');
    if (!(func instanceof Function)) throw new Error('"func" is not Function');

    this.settings = {
      elem, func, pixelDelay, timeDelay, includeElemHeight, debounce,
    };

    window.addEventListener('scroll', this.checkPosition);
    this.getElemPosition();
    this.checkPosition();
    window.addEventListener('resize', this.followWindowResizing);
  }

  getElemPosition = () => {
    const { elem } = this.settings;
    this.elemPosition = elem.offsetTop + this.settings.pixelDelay;

    if (this.settings.includeElemHeight) this.elemPosition += elem.offsetHeight;
  }

  checkPosition = () => {
    if ((window.innerHeight + window.scrollY) >= this.elemPosition) {
      window.removeEventListener('scroll', this.checkPosition);
      window.removeEventListener('resize', this.followWindowResizing);

      setTimeout(this.settings.func, this.settings.timeDelay);
    }
  }

  followWindowResizing = () => {
    clearTimeout(this.followWindowResizingTimeout);
    this.followWindowResizingTimeout = setTimeout(this.getElemPosition, this.settings.debounce);
  }
}
