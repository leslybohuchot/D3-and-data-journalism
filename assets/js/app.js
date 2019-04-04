
// @TODO: YOUR CODE HERE!
// Store width and height parameters to be used in later in the canvas
var svgWidth = 900;
var svgHeight = 600;

// Set svg margins 
var margin = {
  top: 40,
  right: 40,
  bottom: 80,
  left: 90
};

//width and height set
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


var chart_data = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  //import dataset

d3.csv("assets/data/data.csv").then(success_all, error_all);
function error_all(error_all) {
  throw error_all;
}

//set a function to loop through the data 
function success_all(all_data) {

  // Loop through the data 
  all_data.map(function (data) {
    data.healthcare= +data.healthcare;
    data.age = +data.age;
  });

//create the domain and range of the chart 
  var xLinearScale = d3.scaleLinear()
    .domain([3, d3.max(all_data, d => d.healthcare)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([20, d3.max(all_data, d => d.age)])
    .range([height, 0]);

  var x_axis = d3.axisBottom(xLinearScale)
  
    .ticks(10);
  var y_axis = d3.axisLeft(yLinearScale);




  
  chart_data.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(x_axis);
  
  chart_data.append("g")
    .call(y_axis);


  // circle data for scatter plot 
  var circle_chart = chart_data.selectAll("circle")
    .data(all_data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.healthcare))
    .attr("cy", d => yLinearScale(d.age))
    .attr("r", "13")
    .attr("fill", "#788dc2")
    .attr("opacity", ".75")


  

  var circle_chart= chart_data.selectAll()
    .data(all_data)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.healthcare))
    .attr("y", d => yLinearScale(d.age))
    .style("font-size", "13px")
    .style("text-anchor", "middle")
    .style('fill', 'white')
    .text(d => (d.abbr));

    //axis labels 

  chart_data.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("healthcare");

  chart_data.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("age");
}

