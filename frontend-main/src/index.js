// Author: Caleb Ash

import $ from 'jquery';
import './style.scss';

$('#main').html('Here we go!');

let seconds = 0;

const updateMain = () => {
  seconds += 1;

  document.querySelector('#main').textContent = `You've been on this page for ${seconds} seconds.`;
};

setInterval(updateMain, 1000);
