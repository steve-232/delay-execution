# Delay Execution
Run a custom function, after passed HTMLElement is in the viewpoint of the window or HTMLElement.

## Installation
Download and include `delay-execution.min.js` in your HTML file.

```html
<script src="/path/delay-execution.min.js"></script>
```

## Usage
```js
const box = document.getElementById('box');

new DelayExecution({ 
  elem: box,
  func: () => {
    box.classList.add('class')
  }
});
```

## Options
<table>
  <tr>
    <th>Option</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>elem</td>
    <td>HTMLElement</td>
    <td>null</td>
    <td>Targeted HTMLElement.</td>
  </tr>
  <tr>
    <td>func</td>
    <td>function</td>
    <td>null</td>
    <td>Function to be invoked.</td>
  </tr>
  <tr>
    <td>direction</td>
    <td>string</td>
    <td>h</td>
    <td>Direction of scrolling, horizontal (h) or vertical (v).</td>
  </tr>
  <tr>
    <td>parent</td>
    <td>HTMLElement / window</td>
    <td>window</td>
    <td>Follow "scroll" event on this element..</td>
  </tr>
  <tr>
    <td>pixelDelay</td>
    <td>number</td>
    <td>0</td>
    <td>Run a function after X pixels.</td>
  </tr>
  <tr>
    <td>timeDelay</td>
    <td>number</td>
    <td>0</td>
    <td>Run a function after X seconds. <i>(1000 = 1 second)</i></td>
  </tr>
  <tr>
    <td>includeElemHeight</td>
    <td>boolean</td>
    <td>true</td>
    <td>Run a function after entire height of the HTMLElement is in the viewpoint of the window.</td>
  </tr>
  <tr>
    <td>debounce</td>
    <td>number</td>
    <td>500</td>
    <td>Window resize debounce.</td>
  </tr>
</table>

## License
[MIT license](http://www.opensource.org/licenses/MIT)