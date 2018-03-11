import _ from 'lodash';
import './style.scss';
import PassIcon from './pass.png'
import printMe from './print.js';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

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

  return element;
}

document.body.appendChild(component());
