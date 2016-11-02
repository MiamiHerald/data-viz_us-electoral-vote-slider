import $ from 'jquery';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import * as pym from 'pym.js'

const loadExample = () => {
  const apiKey = 'KK1YnIuJUnmdu10zsBxOAG3GJ9CDcmhZ'
  const url = `https://api.ap.org/v2/reports/ece4f18580f84fd1b36b46f6b709d325?format=json&apikey=${apiKey}`;
  $.get(url, (data) => {
    console.log(data);
  });
}

export { loadExample };
