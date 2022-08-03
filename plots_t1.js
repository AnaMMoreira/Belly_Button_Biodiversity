// mmodulle 12.3.2
//LOCALHOST http://127.0.0.1:8000/

//READ JSON
d3.json("samples.json").then(function(data){
    firstPerson = data.metadata[0];
    Object.entries(firstPerson).forEach(([key, value]) =>
      {console.log(key + ': ' + value);});
});

//LISTENING TO OPTION BUTTON
function init() {
  data = [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16] 
  }];
  Plotly.newPlot("plot", data);
};

//selects a dropdown menu option, the updatePlotly() function is called
d3.selectAll("#dropdownMenu").on("change", updatePlotly);

//The variable dropdownMenu is assigned to the DOM element 
//with the id of dropdownMenu from index.html
function updatePlotly() {
  var dropdownMenu = d3.select("#dropdownMenu");
  var dataset = dropdownMenu.property("value");

  var xData = [1, 2, 3, 4, 5];
  var yData = [];

  if (dataset === 'dataset1') {
    yData = [1, 2, 4, 8, 16];
  };

  if (dataset === 'dataset2') {
    yData = [1, 10, 100, 1000, 10000];
  };

  var trace = {
    x: [xData],
    y: [yData],
  };
  Plotly.restyle("plot", trace);
};

//dropdown menu of ID numbers
function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
})
}  
// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  console.log(newSample);
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // Object.entries(result).forEach(([key, value]) => {
    //   PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);

    var rId = result.id
    PANEL.append("h6").text('ID: ' + result.id);
    PANEL.append("h6").text('ETHNICITY: ' + result.ethnicity);
    PANEL.append("h6").text('GENDER: ' + result.gender);
    PANEL.append("h6").text('AGE: ' + result.age);
    PANEL.append("h6").text('LOCATION: ' + result.location);
    PANEL.append("h6").text('BBTYPE: ' + result.bbtype);
    PANEL.append("h6").text('WFREQ: ' + result.wfreq);
  });
}


// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    // 3. Create a variable that holds the samples array.

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var samplesArray = samples.filter(sampleObj => sampleObj.id == sample);
  
    //  5. Create a variable that holds the first sample in the array.

    var plotResults = samplesArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var data = plotResults;
    var OTU_id =  data.otu_ids;
    var OTU_Lables =  data.otu_labels.slice(0, 10).reverse();
    var Sample_Values =  data.sample_values.slice(0, 10).reverse();
    console.log(OTU_id);
    console.log(OTU_Lables);
    console.log(Sample_Values);
    console.log(data);

    var bubbleLabels = data.otu_labels;
    var bubbleValues = data.sample_values;

    // 7. Create the yticks for the bar chart.

    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    Svalues = Sample_Values.sort(function(a, b) {
      return parseFloat(b) - parseFloat(a);
    });
    Svalues = Svalues.slice(0, 10);
    Svalues = Svalues.reverse();
      console.log(Svalues);
    //var yticks = 
    var yticks = OTU_id.map(sampleObj => "OTU " + sampleObj).slice(0,10).reverse();

    console.log(yticks)

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: Svalues,
      y: yticks,
      type: "bar",
      orientation: "h",
      text: OTU_Lables 
    }];
    
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Individual's Top 10 Bacteria Cultures",
      xaxis: {title: "Sample Size"}
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
    
    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: OTU_id,
      y: bubbleValues,
      text: bubbleLabels,
      mode: "markers",
       marker: {
         size: bubbleValues,
         color: bubbleValues,
         colorscale: "Viridis" 
       }
    }];
    
    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title: "OTU ID"},
      yaxis: {title: "Sample Size"},
      automargin: true,
      hovermode: "closest"
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout)
  
  });

  // 1. Create a variable that filters the metadata array for the object with the desired sample number.
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var gaugeArray = metadata.filter(metaObj => metaObj.id == sample);  

    // 2. Create a variable that holds the first sample in the metadata array.
    var gaugeResult = gaugeArray[0];

    // 3. Create a variable that holds the washing frequency.  
    var wfreqs = gaugeResult.wfreq;
    console.log(wfreqs)

    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      value: wfreqs,
      type: "indicator",
      mode: "gauge+number",
      title: {text: "<b> Belly Button Washing Frequency </b> <br></br> Scrubs Per Week"},
      gauge: {
        axis: {range: [null,10], dtick: "2"},

        bar: {color: "black"},
        steps:[
          {range: [0, 2], color: "red"},
          {range: [2, 4], color: "orange"},
          {range: [4, 6], color: "yellow"},
          {range: [6, 8], color: "lightgreen"},
          {range: [8, 10], color: "green"}
        ],
        dtick: 2
      }
    }]

    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      automargin: true
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout)
  });
}