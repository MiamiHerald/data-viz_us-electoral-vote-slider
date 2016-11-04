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
  }

  render() {
    $.getJSON(this.dataUrl).done((data) => {
      this.timestamp = data.Sumtable.timestamp;
      this.candidates = data.Sumtable.Cand;
      this.setResults();
    });
  }

  setResults() {
    let hillaryStart = {var: 0};
    let hillaryEnd = {var: this.candidates[0].ElectWon};
    let donaldStart = {var: 0};
    let donaldEnd = {var: this.candidates[1].ElectWon};
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
    this.hillaryBarEl.width(`${(this.candidates[0].ElectWon * 100) / this.totalElectors}%`)
    this.donaldBarEl.width(`${(this.candidates[1].ElectWon * 100) / this.totalElectors}%`)
    this.hillaryVotesEl.html(`${numeral(this.candidates[0].PopVote).format('0,0')} votes (${this.candidates[0].PopPct}%)`)
    this.donaldVotesEl.html(`${numeral(this.candidates[1].PopVote).format('0,0')} votes (${this.candidates[1].PopPct}%)`)
    this.timestampEl.html(`Last Updated: ${moment(this.timestamp).format('MMMM DD, YYYY - hh:mmA')} ET`);

    this.checkWinner();
  }

  checkWinner() {
    this.candidates.forEach(x => {
      if (x.Winner === "X") {
        if (x.name === "Clinton") {
          $(`.fa-check.clinton`).addClass(`is-winner`);
          this.hillaryBarEl.addClass(`is-winner`);
        } else if (x.name === "Trump") {
          $(`.fa-check.clinton`).addClass(`is-winner`);
          this.donaldBarEl.addClass(`is-winner`);
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
