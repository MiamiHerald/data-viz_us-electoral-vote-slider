import $ from 'jquery';
import { TweenLite } from 'gsap';
import * as pym from 'pym.js'

class Tally {
  constructor(el) {
    this.el = el;
    this.dataUrl = 'data/electionData.json';
    this.hillaryCountEl = $(`#hillaryCount`);
    this.donaldCountEl = $(`#donaldCount`);
    this.hillaryBarEl = $(`#hillaryBar`);
    this.donaldBarEl = $(`#donaldBar`);
    this.totalElectors = 538;
  }

  render() {
    $.getJSON(this.dataUrl).done((data) => {
      this.candidates = data.Sumtable.Cand;
      this.setResults();
    });
  }

  setResults() {
    this.hillaryCountEl.html(this.candidates[0].ElectLead)
    this.donaldCountEl.html(this.candidates[1].ElectLead)
    this.calculatePercentages();
  }

  calculatePercentages() {
    this.hillaryBarEl.width(`${(this.candidates[0].ElectLead * 100) / this.totalElectors}%`)
    this.donaldBarEl.width(`${(this.candidates[0].ElectLead * 100) / this.totalElectors}%`)
  }
}

const loadExample = () => {
  const $tallyBar = $(`.js-tally-bar`);

  $tallyBar.each((index) => {
    const $this = $tallyBar.eq(index);
    const id = $this.attr(`id`);
    const url = $this.data(`url`);

    new Tally(`#${id}`).render();
  });
}

export { loadExample };
