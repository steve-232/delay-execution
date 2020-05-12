
// eslint-disable-next-line no-unused-vars
class DelayExecution {
  constructor({
    elem = null,
    func = null,
    direction = 'v',
    parent = window,
    pixelDelay = 0,
    timeDelay = 0,
    includeElemHeight = true,
    debounce = 500,
  }) {
    if (!(elem instanceof HTMLElement)) throw new TypeError('"elem" is not HTMLElement');
    if (!(func instanceof Function)) throw new TypeError('"func" is not Function');

    this.settings = {
      elem, func, direction, parent, pixelDelay, timeDelay, includeElemHeight, debounce,
    };

    // eslint-disable-next-line no-param-reassign
    if (parent.constructor.name !== 'Window' && getComputedStyle(parent).getPropertyValue('position') === 'static') parent.style.position = 'relative';

    parent.addEventListener('scroll', this.checkPosition);
    this.getElemPosition();
    this.checkPosition();
    parent.addEventListener('resize', this.followWindowResizing);
  }

  getElemPosition = () => {
    const {
      elem,
      direction,
      includeElemHeight,
      pixelDelay,
    } = this.settings;
    this.elemPosition = (direction === 'v' ? elem.offsetTop : elem.offsetLeft) + pixelDelay;

    if (includeElemHeight) this.elemPosition += elem.offsetHeight;
  }

  getParentPosition = () => {
    const { direction, parent } = this.settings;

    if (direction !== 'v') return parent.constructor.name === 'Window' ? window.innerWidth + window.scrollX : parent.clientWidth + parent.scrollLeft;
    return parent.constructor.name === 'Window' ? window.innerHeight + window.scrollY : parent.clientHeight + parent.scrollTop;
  }

  checkPosition = () => {
    const { func, timeDelay, parent } = this.settings;

    if (this.getParentPosition() >= this.elemPosition) {
      parent.removeEventListener('scroll', this.checkPosition);
      parent.removeEventListener('resize', this.followWindowResizing);

      setTimeout(func, timeDelay);
    }
  }

  followWindowResizing = () => {
    clearTimeout(this.followWindowResizingTimeout);
    this.followWindowResizingTimeout = setTimeout(this.getElemPosition, this.settings.debounce);
  }
}
