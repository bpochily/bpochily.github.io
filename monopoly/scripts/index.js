var fetcher = dataFetcher();

var getHeatmapConfig = function(size) {
  return {
    container: document.getElementById('heatmapContainer'),
    maxOpacity: .8,
    minOpaxity: 0,
    radius: size / 11,
    blur: .95,
    gradient: {
      0.2: '#ffffb2',
      0.4: '#fd8d3c',
      0.6: '#fd8d3c',
      0.8: '#f03b20',
      1: '#bd0026',
    }
  }
}

var getInputAndDraw = function(heatmap, size) {
  draw(heatmap, size, $('#turnSelect option:selected').val(), $('#startSelect option:selected').val(), $('input[name=jail]:checked').val(), $('input[name=log]:checked').val());
}

function draw(heatmap, size, turn, start, jail, log) {
  if (turn === 'steady') {
    $('#startSelect').prop('disabled', true);
    fetcher.getSteady(Number.parseInt(jail), function(data) {
      displayData(heatmap, processData(data, log), size);
    });
  } else {
    $('#startSelect').prop('disabled', false);
    fetcher.getTable(turn, start, Number.parseInt(jail), function(data) {
      displayData(heatmap, processData(data, log), size);
    });
  }
}

$().ready(function() {
  var size = $(window).height();
  var heatmap = h337.create(getHeatmapConfig(size));
  getInputAndDraw(heatmap, size);  

  $('.input').on('change', function() {
    getInputAndDraw(heatmap, size);
  });

  $(window).resize(function() {
    size = $(window).height();
    heatmap.configure(getHeatmapConfig(size));
    getInputAndDraw(heatmap, size);
  });
});