
// eslint-disable-next-line no-unused-vars
class DelayExecution {
  constructor({
    elem = null,
    func = null,
    direction = 'v',
    pixelDelay = 0,
    timeDelay = 0,
    includeElemHeight = true,
    debounce = 500,
  }) {
    if (!(elem instanceof HTMLElement)) throw new Error('"elem" is not HTMLElement');
    if (!(func instanceof Function)) throw new Error('"func" is not Function');

    this.settings = {
      elem, func, direction, pixelDelay, timeDelay, includeElemHeight, debounce,
    };

    window.addEventListener('scroll', this.checkPosition);
    this.getElemPosition();
    this.checkPosition();
    window.addEventListener('resize', this.followWindowResizing);
  }

  getElemPosition = () => {
    const { elem, direction, includeElemHeight } = this.settings;
    this.elemPosition = direction === 'v' ? elem.offsetTop : elem.offsetLeft;

    if (includeElemHeight) this.elemPosition += elem.offsetHeight;
  }

  getWindowPosition = () => {
    if (this.settings.direction !== 'v') return window.innerWidth + window.scrollX;
    return window.innerHeight + window.scrollY;
  }

  checkPosition = () => {
    if (this.getWindowPosition() >= this.elemPosition) {
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
