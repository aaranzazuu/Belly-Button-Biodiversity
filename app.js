//Plotly
//Use the D3 library to read in samples.json.
d3.json("./data/samples.json").then(function(data) {
  var trace1 = {
    x: data.samples.otu_ids,
    y: data.survival.map(val => Math.sqrt(val)),
    type: "box",
    name: "Cancer Survival",
    boxpoints: "all"
;
  });