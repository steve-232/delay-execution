
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

    this.elem = elem;
    this.func = func;
    this.direction = direction;
    this.parent = parent;
    this.pixelDelay = pixelDelay;
    this.timeDelay = timeDelay;
    this.includeElemHeight = includeElemHeight;
    this.debounce = debounce;

    // eslint-disable-next-line no-param-reassign
    if (parent.constructor.name !== 'Window' && getComputedStyle(parent).getPropertyValue('position') === 'static') parent.style.position = 'relative';

    parent.addEventListener('scroll', this.checkPosition.bind(this));
    this.getElemPosition();
    this.checkPosition();
    parent.addEventListener('resize', this.followWindowResizing.bind(this));
  }

  getElemPosition() {
    this.elemPosition = (this.direction === 'v' ? this.elem.offsetTop : this.elem.offsetLeft) + this.pixelDelay;

    if (this.includeElemHeight) this.elemPosition += this.elem.offsetHeight;
  }

  getParentPosition() {
    if (this.direction !== 'v') return this.parent.constructor.name === 'Window' ? window.innerWidth + window.scrollX : this.parent.clientWidth + this.parent.scrollLeft;
    return this.parent.constructor.name === 'Window' ? window.innerHeight + window.scrollY : this.parent.clientHeight + this.parent.scrollTop;
  }

  checkPosition() {
    if (this.getParentPosition() >= this.elemPosition) {
      this.parent.removeEventListener('scroll', this.checkPosition.bind(this));
      this.parent.removeEventListener('resize', this.followWindowResizing.bind(this));

      setTimeout(this.func, this.timeDelay);
    }
  }

  followWindowResizing() {
    clearTimeout(this.followWindowResizingTimeout);
    this.followWindowResizingTimeout = setTimeout(this.getElemPosition, this.debounce);
  }
}
