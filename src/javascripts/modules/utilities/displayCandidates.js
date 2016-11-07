import $ from 'jquery';

const loadDisplayCandidates = () => {
  $('#senateRace tr.eln-bodyreg-bar, #senateRace tr.eln-bodyregular').hide();
  $("#senateRace tr.eln-bodyreg-bar:contains('Rubio, Marco (i)'), #senateRace tr.eln-bodyregular:contains('Rubio, Marco (i)')").css('display', 'table-row');
  $("#senateRace tr.eln-bodyreg-bar:contains('Murphy, Patrick'), #senateRace tr.eln-bodyregular:contains('Murphy, Patrick')").css('display', 'table-row');

  $('#presidentialRace tr.eln-bodyreg-bar, #presidentialRace tr.eln-bodyregular').hide();
  $("#presidentialRace tr.eln-bodyreg-bar:contains('Clinton, Hillary'), #presidentialRace tr.eln-bodyregular:contains('Clinton, Hillary')").css('display', 'table-row');
  $("#presidentialRace tr.eln-bodyreg-bar:contains('Trump, Donald'), #presidentialRace tr.eln-bodyregular:contains('Trump, Donald')").css('display', 'table-row');

  $('tr.eln-subhed-table td').text(function () {
    return $(this).text().replace('Name', 'Nombre').replace('Votes', 'Votos').replace('Vote %', '% de votos');
  });

  $('.eln-date').text(function() {
    return $(this).text().replace('November', 'Noviembre');
  });

  $('#presidentialRace td.eln-bodyregular').first().text(function() {
    return $(this).text().replace('of', 'de').replace('Precincts Reporting', 'Foo Bar');
  });

  $('#mayoralRace td.eln-bodyregular').first().text(function() {
    return $(this).text().replace('of', 'de').replace('Precincts Reporting', 'Foo Bar');
  });

  $('#senateRace td.eln-bodyregular').first().text(function() {
    return $(this).text().replace('of', 'de').replace('Precincts Reporting', 'Foo Bar');
  });
}

export { loadDisplayCandidates };
