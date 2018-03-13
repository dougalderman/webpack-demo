import _ from 'lodash';
import './style.scss';
import PassIcon from './pass.png'
import printMe from './print.js';
import { cube } from './math.js';

if (process.env.NODE_ENV === 'production') {
  console.log('We\'re in production mode');
}
else {
  console.log('We\'re in development mode');
}

function component() {
  let element = document.createElement('div');
  let btn = document.createElement('button');
  let pre = document.createElement('pre');

  // Lodash, now imported by this script.
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  // Add the image to our existing div
  var myIcon = new Image();
  myIcon.src = PassIcon;

  element.appendChild(myIcon);

  // Add child Div
  var childElement = element.appendChild(document.createElement('div'));
  childElement.classList.add('goodbye');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  element.appendChild(btn);

  pre.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube(5)
  ].join('\n\n');

  element.appendChild(pre);

  return element;
}

let el = component() // Store the element to re-render on print.js changes
document.body.appendChild(el);

if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!');
    document.body.removeChild(el);
    el = component(); // Re-render the "component" to update the click handler
    document.body.appendChild(el);
  })
}
