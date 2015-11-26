var dataFetcher = function() {
  var ret = {};
  var data;
  var fetch = function(cb) {
    $.getJSON('data/prob.json', function(data) {
    cb(data);
    })
  }
  
  ret.getTable = function(turn, start, jail, cb) {
    if (!data) {
      fetch(function(data) {
        cb(data[jail ? 'jail' : 'noJail'][turn - 1][start]);
      });
    } else {
      cb(data[jail ? 'jail' : 'noJail'][turn - 1][start]);
    }
  }

  ret.getSteady = function(jail, cb) {
    if (!data) {
      fetch(function(data) {
        cb(data['steady' + (jail ? 'Jail' : '')]);
      });
    } else {
      cb(data['steady' + (jail ? 'Jail' : '')]);
    }
  }
  return ret;
}

function processData(data, log) {
  data = data.slice();
  for (var i = 41; i < data.length; i++) {
    data[40] += data[i];
  }
  data = data.slice(0, 41);

  if (Number.parseInt(log)) {
     for (var i = 0; i < data.length; i++) {
      data[i] = data[i] <= 0 ? 0 : data[i];
    }
    var factor = 10 / Math.min.apply(null, data.filter(function(num) {
      return num !== 0
    }));
    for (var i = 0; i < data.length; i++) {
      data[i] = data[i] === 0 ? 0 : Math.log(data[i] * factor);
    }
  } else {
    for (var i = 0; i < data.length; i++) {
      data[i] += 1e-17;
    }
  }
  return data;
}