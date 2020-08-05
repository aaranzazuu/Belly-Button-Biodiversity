//Select sample_id from dropdown
var dropdown = d3.select("#selDataset")

//Function to render data from sample.json
var globalData ;

//function to create bar chart
function renderBar (sample_id) {
  var listSamples = globalData.samples

  filteredSample = listSamples.filter(sample => sample.id == sample_id)[0]

  yAxis = filteredSample.otu_ids.slice(0,10).map(s => `OTU ${s}`).reverse()
  xAxis = filteredSample.sample_values.slice(0,10).reverse()
  hoverText = filteredSample.otu_labels.slice(0,10).reverse()
  console.log(yAxis)
  console.log(xAxis)

  var trace = {
    x: xAxis,
    y: yAxis,
    type: "bar",
    orientation:'h',
    text: hoverText
  };

  var data = [trace];
  var layout = {
    title: "Top 10 OTU IDs",
    xaxis: {title: "Sample Values"},
  };

Plotly.newPlot("bar", data, layout)
}

//function create bubble chart
function renderBubble (sample_id) {
  var listSamples = globalData.samples

  var filteredSample = listSamples.filter(sample => sample.id == sample_id)[0]

  var xAxis = filteredSample.otu_ids
  var yAxis = filteredSample.sample_values
  var markerSize = yAxis
  var markerColors = xAxis
  var textValues = filteredSample.otu_labels
  console.log(yAxis)
  console.log(xAxis)

  var trace = {
    x: xAxis,
    y: yAxis,
    mode: "markers",
    marker: {size: markerSize, color: markerColors, colorscale: "Earth"},
    text: textValues
  };

  var data = [trace];
  var layout = {
    title: "Sample Values vs All OTU IDs",
    xaxis: {title: "OTU IDs"},
  };

Plotly.newPlot("bubble", data, layout)
}

//function create Demographics
function renderDemographics (sample_id) {
  var listMeta = globalData.metadata

  var filteredMeta = listMeta.filter(meta => meta.id == sample_id)[0]

  var id = filteredMeta.id
  var age = filteredMeta.age
  var ethnicity = filteredMeta.ethnicity
  var gender = filteredMeta.gender
  var bbtype = filteredMeta.bbtype
  var wfreq = filteredMeta.wfreq
  var location = filteredMeta.location

  var panel = document.getElementById("sample-metadata");
  panel.innerHTML = 
  `ID: ${id}
  <br>
  Ethnicity: ${ethnicity}
  <br>
  Gender: ${gender}
  <br>
  Age: ${age}
  <br>
  Location: ${location}
  <br>
  BBType: ${bbtype}
  <br>
  WFreq: ${wfreq}
  <br>`;

  console.log(id)
  console.log(age)


}

//Handle Change
function handleChange(){
  sample_id = this.value
  console.log(sample_id)
  renderBar(sample_id)
  renderBubble(sample_id)
  renderDemographics(sample_id)
}

//Promise - Get the data
d3.json("./data/samples.json").then(function(data) {
globalData = data
console.log(globalData)

selectors = globalData.names

selectors.forEach(element => {
  dropdown
  .append("option")
  .text(element)
  .property("value",element)
});

dropdown.on("change", handleChange);

//Load when you open the initial page
renderBar(940)
renderBubble(940)
renderDemographics(940)
});
