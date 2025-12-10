// --- Punjab Shapefile ---
var REGION = ee.FeatureCollection("projects/banded-equinox-420006/assets/Punjab_Districts");

// --- Map Centering ---
Map.setCenter(74.3, 31.5, 6);

// --- MODIS LST Palette ---
var PALETTE = [
  '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
  '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
  '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
  'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
  'ff0000', 'de0101', 'c21301', 'a71001', '911003'
];

// --- UI PANEL ---
var controlPanel = ui.Panel({
  style: {position: "top-left", padding: "8px", width: "200px"}
});

var startLabel = ui.Label("Start Date (YYYY-MM-DD):");
var endLabel   = ui.Label("End Date (YYYY-MM-DD):");

var startBox = ui.Textbox({value: "2021-06-01"});
var endBox   = ui.Textbox({value: "2021-06-30"});

var updateBtn = ui.Button({
  label: "Update Map",
  style: {
    stretch: "horizontal",
    backgroundColor: "black",
    color: "black",
    fontWeight: "bold"
  },
  onClick: updateMap
});

controlPanel.add(startLabel);
controlPanel.add(startBox);
controlPanel.add(endLabel);
controlPanel.add(endBox);
controlPanel.add(updateBtn);

Map.add(controlPanel);

// --- LEGEND PANEL ---
var legendPanel = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '10px',
    backgroundColor: 'rgba(255,255,255,0.95)',
    border: '1px solid black'
  }
});
Map.add(legendPanel);

// --- LEGEND FUNCTION (GRADIENT STYLE) ---
function updateLegend(min, max, palette, title) {
  legendPanel.clear();
  
  // Title
  legendPanel.add(ui.Label(title, {fontWeight: 'bold', fontSize: '14px', margin: '0 0 6px 0'}));
  
  // Gradient image
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((max - min) / 100.0).add(min);
  var legendImage = gradient.visualize({min: min, max: max, palette: palette});
  
  // Add gradient thumbnail
  legendPanel.add(ui.Thumbnail({
    image: legendImage,
    params: {bbox: [0, 0, 100, 10], dimensions: '350x150'},
    style: {stretch: 'horizontal', maxHeight: '20px', margin: '1px 1px'}
  }));
  
  // Add min and max labels
  legendPanel.add(ui.Panel({
    widgets: [
      ui.Label(min.toFixed(1) + ' °C', {margin: '4px 2px'}),
      ui.Label(max.toFixed(1) + ' °C', {margin: '4px 2px', textAlign: 'right', stretch: 'horizontal'})
    ],
    layout: ui.Panel.Layout.flow('horizontal')
  }));
}

// --- UPDATE MAP FUNCTION ---
function updateMap() {
  var start = startBox.getValue();
  var end = endBox.getValue();
  
  // Load MODIS LST dataset
  var dataset = ee.ImageCollection('MODIS/061/MOD11A1')
                  .filter(ee.Filter.date(start, end))
                  .select('LST_Day_1km')
                  .map(function(image) {
                    return image.multiply(0.02).subtract(273.15)
                                .copyProperties(image, ['system:time_start']);
                  });
  
  // Compute mean LST and clip to Punjab
  var lst = dataset.mean().clip(REGION);
  
  // Clear previous layers
  Map.layers().reset([]);
  
  // Add LST layer in Celsius
  Map.addLayer(lst, {min: -10, max: 55, palette: PALETTE}, 'Land Surface Temperature (°C)');
  
  // Add Punjab boundaries
  Map.addLayer(REGION.style({color: "000000", fillColor: "00000000", width: 2}), {}, "Punjab_Districts");
  
  // Update legend
  updateLegend(-10, 55, PALETTE, 'Punjab Land Surface Temperature (°C)');
}

// --- Load by default ---
updateMap();
