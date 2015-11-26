function getScale(size) {
  return {
    HEIGHT: size,
    WIDTH: size,
    MARGIN: size / 20,
    CORNER_OFFSET: size / 11,
    CORNER_MARGIN: size / 17,
    SPACE_WIDTH: size / 12.2,
    JUST_VISITING_MARGIN: size / 47,
    JAIL_MARGIN: size / 12
  }
}

function displayData(heatmap, data, size) {
  var scale = getScale(size);  
  var formattedData = [];

  //go
  formattedData.push({
    x: scale.WIDTH - scale.CORNER_MARGIN,
    y: scale.HEIGHT - scale.CORNER_MARGIN,
    value: data[0]
  });

  //bottom edge
  for (var i = 1; i < 10; i++) {
    formattedData.push({
      x: scale.WIDTH - scale.CORNER_OFFSET - i * scale.SPACE_WIDTH,
      y: scale.HEIGHT - scale.MARGIN,
      value: data[i]
    })
  }

  //just visiting
  formattedData.push({
    x: scale.JUST_VISITING_MARGIN,
    y: scale.HEIGHT - scale.JUST_VISITING_MARGIN,
    value: data[10]
  });

  //left edge
  for (var i = 11; i < 20; i++) {
    formattedData.push({
      x: scale.MARGIN,
      y: scale.HEIGHT - scale.CORNER_OFFSET - (i - 10) * scale.SPACE_WIDTH,
      value: data[i]
    });
  }

  //free parking
  formattedData.push({
    x: scale.CORNER_MARGIN,
    y: scale.CORNER_MARGIN,
    value: data[20]
  });

  //top edge
  for (var i = 21; i < 30; i++) {
    formattedData.push({
      x: scale.CORNER_OFFSET + (i - 20) * scale.SPACE_WIDTH,
      y: scale.MARGIN,
      value: data[i]
    })
  }

  //go to jail
  formattedData.push({
    x: scale.WIDTH - scale.CORNER_MARGIN,
    y: scale.CORNER_MARGIN,
    value: data[30]
  });

  //right edge
  for (var i = 31; i < 40; i++) {
    formattedData.push({
      x: scale.WIDTH - scale.MARGIN,
      y: scale.CORNER_OFFSET + (i - 30) * scale.SPACE_WIDTH,
      value: data[i]
    });
  }

  //jail
  formattedData.push({
    x: scale.JAIL_MARGIN,
    y: scale.HEIGHT - scale.JAIL_MARGIN,
    value: data[40]
  });

  heatmap.setData({
    min: 0,
    max: Math.max.apply(null, data),
    data: formattedData
  })
}