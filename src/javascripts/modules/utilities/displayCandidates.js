import $ from 'jquery';

const loadDisplayCandidates = () => {
  $("#senateRace tr.eln-bodyreg-bar, #senateRace tr.eln-bodyregular").hide();
  $("#senateRace tr.eln-bodyreg-bar:contains('Rubio, Marco (i)'), #senateRace tr.eln-bodyregular:contains('Rubio, Marco (i)')").css('display', 'table-row');
  $("#senateRace tr.eln-bodyreg-bar:contains('Murphy, Patrick'), #senateRace tr.eln-bodyregular:contains('Murphy, Patrick')").css('display', 'table-row');

  $("#presidentialRace tr.eln-bodyreg-bar, #presidentialRace tr.eln-bodyregular").hide();
  $("#presidentialRace tr.eln-bodyreg-bar:contains('Clinton, Hillary'), #presidentialRace tr.eln-bodyregular:contains('Clinton, Hillary')").css('display', 'table-row');
  $("#presidentialRace tr.eln-bodyreg-bar:contains('Trump, Donald'), #presidentialRace tr.eln-bodyregular:contains('Trump, Donald')").css('display', 'table-row');

  $("#mayoralRace td.eln-bodyregular:contains('Carlos Gimenez')").text(function() {
    return $(this).text().replace('Carlos Gimenez', 'Carlos Giménez');
  });
}

export { loadDisplayCandidates };
