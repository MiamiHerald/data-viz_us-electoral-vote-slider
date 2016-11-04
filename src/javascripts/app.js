import { loadVotingData } from './modules/visualizations/votingData';
loadVotingData();

import { loadDisplayCandidates } from './modules/utilities/displayCandidates';
loadDisplayCandidates();

$(`#reloadVotingData`).click(() => {
  loadDisplayCandidates();
});
