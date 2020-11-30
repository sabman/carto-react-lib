

function __disableSerie (serie, theme) {
  serie.disabled = true;
  serie.itemStyle = { color: theme.palette.charts.disabled };
}

function __clearFilter (serie) {
  serie.data.forEach((d) => {
    d.disabled = false;
    __setColor(d);
  });
}

function __setColor (d) {
  if (d.color) {
    d.itemStyle.color = d.color;
  } else {
    delete d.itemStyle;
  }
}

export default function applyChartFilter (serie, clickedSerieIndex, theme) {
  const anyDisabled = serie.data.find((d) => d.disabled);

  if (!anyDisabled) {
    serie.data.forEach((d, index) => {
      if (index !== clickedSerieIndex) {
        __disableSerie(d, theme);
      }
    });
  } else {
    const clickedData = serie.data[clickedSerieIndex];
    clickedData.disabled = !clickedData.disabled;
    if (clickedData.disabled) {
      __disableSerie(clickedData, theme);

      const anyActive = serie.data.find((d) => !d.disabled);

      if (!anyActive) {
        __clearFilter(serie);
      }
    } else {
      __setColor(clickedData);
    }
  }

  return serie;
}