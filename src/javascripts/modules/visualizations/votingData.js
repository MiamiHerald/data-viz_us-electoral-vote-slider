import $ from 'jquery';
import { TweenLite } from 'gsap';
import numeral from 'numeral';
import moment from 'moment';
import * as pym from 'pym.js'

class Tally {
  constructor(el) {
    this.el = el;
    // this.dataUrl = 'data/electionData.json';
    this.dataUrl = 'http://pubsys.miamiherald.com/static/media/projects/2016/elex/presGeneral/data/electionData.json';
    this.hillaryCountEl = $(`#hillaryCount`);
    this.donaldCountEl = $(`#donaldCount`);
    this.hillaryBarEl = $(`#hillaryBar`);
    this.donaldBarEl = $(`#donaldBar`);
    this.hillaryVotesEl = $(`#hillaryVotes`);
    this.donaldVotesEl = $(`#donaldVotes`);
    this.timestampEl = $(`#jsTimestamp`);
    this.totalElectors = 538;
    this.pymChild = null;
  }

  render() {
    this.fetchData();
    $(window).on(`load`, () => {
      this.pymChild = new pym.Child({ renderCallback: this.resizeContainer.bind(this) });
    });
    $(window).on(`resize`, this.resizeContainer.bind(this));
    setTimeout(() => {
      $(window).trigger('resize');
    }, 1000);
  }

  resizeContainer() {
    window.requestAnimationFrame(() => {
      if (this.pymChild) {
        this.pymChild.sendHeight();
      }
    });
  }

  fetchData() {
    $.getJSON(this.dataUrl).done((data) => {
      this.timestamp = data.Sumtable.timestamp;
      this.candidates = data.Sumtable.Cand;
      this.candidates.forEach(v => {
        if (v.CandID === "1746") {
          this.hillaryObj = v;
        }
        if (v.CandID === "8639") {
          this.donaldObj = v;
        }
      });
      console.log(this.hillaryObj, this.donaldObj);
      this.setResults();
    });
  }

  setResults() {
    let hillaryStart = {var: 0};
    let hillaryEnd = {var: this.hillaryObj.ElectWon};
    let donaldStart = {var: 0};
    let donaldEnd = {var: this.donaldObj.ElectWon};
    TweenMax.to(hillaryStart, 1, {var: hillaryEnd.var, onUpdate: () => {
        this.hillaryCountEl.html(`${Math.ceil(hillaryStart.var)}`);
      },
      ease:Circ.easeOut
    });
    TweenMax.to(donaldStart, 1, {var: donaldEnd.var, onUpdate: () => {
        this.donaldCountEl.html(`${Math.ceil(donaldStart.var)}`);
      },
      ease:Circ.easeOut
    });
    this.calculatePercentages();
  }

  calculatePercentages() {
    this.hillaryBarEl.width(`${(this.hillaryObj.ElectWon * 100) / this.totalElectors}%`)
    this.donaldBarEl.width(`${(this.donaldObj.ElectWon * 100) / this.totalElectors}%`)
    this.hillaryVotesEl.html(`${numeral(this.hillaryObj.PopVote).format('0,0')} votes (${this.hillaryObj.PopPct}%)`)
    this.donaldVotesEl.html(`${numeral(this.donaldObj.PopVote).format('0,0')} votes (${this.donaldObj.PopPct}%)`)
    this.timestampEl.html(`Last Updated: ${moment(this.timestamp).format('MMMM DD, YYYY - hh:mmA')} ET`);

    this.checkWinner();
  }

  checkWinner() {
    this.candidates.forEach(x => {
      if (x.Winner === "X") {
        if (x.CandID === "1746") {
          $(`.fa-check.clinton`).addClass(`is-winner`);
        } else if (x.CandID === "8639") {
          $(`.fa-check.trump`).addClass(`is-winner`);
        }
      }
    });
  }
}

const loadVotingData = () => {
  const $tallyBar = $(`.js-tally-bar`);

  $tallyBar.each((index) => {
    const $this = $tallyBar.eq(index);
    const id = $this.attr(`id`);
    const url = $this.data(`url`);

    new Tally(`#${id}`).render();
  });
}

export { loadVotingData };
