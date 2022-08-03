//CHECK DATA 
console.log(cityGrowths);
//SORT DATA BY GROWTH
var sortedCities = cityGrowths.sort((a,b) =>
a.Increase_from_2016 - b.Increase_from_2016).reverse();
console.log(sortedCities); 

// SLICE TOP FIVE CITIES
var topFiveCities = sortedCities.slice(0,5);
console.log(topFiveCities); 

//create a separate array of the top five city names, as well as the top five growth figures
//parseInt(city.Increase_from_2016)converts strings into integers.
var topFiveCityNames = topFiveCities.map(city => city.City);
var topFiveCityGrowths = topFiveCities.map(city => parseInt(city.Increase_from_2016));
console.log(topFiveCityNames); 
console.log(topFiveCityGrowths); 


//CREATE BAR PLOT
var trace = {
    x: topFiveCityNames,
    y: topFiveCityGrowths,
    type: "bar"
  };
  var data = [trace];
  var layout = {
    title: "Most Rapidly Growing Cities",
    xaxis: {title: "City" },
    yaxis: {title: "Population Growth, 2016-2017"}
  };
  Plotly.newPlot("bar-plot", data, layout);



