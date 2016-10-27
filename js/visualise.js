var GetTenRandomNumbers = function () {
  var randomNumArr = []
  while (randomNumArr.length < 10) {
      randomNumArr.push(Math.floor(Math.random()*100));
  }
  return randomNumArr;
}

const WIDTH = 800;
const HEIGHT = 600;
const MARGIN = 30;
const BARWIDTH = 20;
const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

var data = GetTenRandomNumbers();

var  svg,xScale,yScale;

var translate = function(x, y){
	return "translate("+x+","+y+")";
};

var setXScale = function () {
  xScale = d3.scaleLinear()
    .domain([0,10])
    .range([0, INNER_WIDTH]);
}

var setYScale = function () {
  yScale = d3.scaleLinear()
    .domain([0,100])
    .range([INNER_HEIGHT, 0]);
}

var createChart = function () {
    d3.select('svg').remove();
    svg = d3.select('.container').append('svg')
      .attr('width',WIDTH)
      .attr('height',HEIGHT);

    setXScale();
    setYScale();

    var xAxis = d3.axisBottom(xScale).ticks(10);
    var yAxis = d3.axisLeft(yScale).ticks(10);

    svg.append('g')
      .attr('transform', translate(MARGIN, HEIGHT - MARGIN))
      .call(xAxis)
      .classed('xAxis', true);
    svg.append('g')
      .attr('transform', translate(MARGIN,MARGIN))
      .call(yAxis)
      .classed('yAxis', true);

    svg.selectAll('.xAxis .tick')
      .append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', -INNER_HEIGHT)
      .classed('grid',true);

      svg.selectAll('.yAxis .tick')
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', INNER_WIDTH)
        .attr('y2', 0)
        .classed('grid',true);
}

var drawLineChart = function () {


    createChart();

    var g = svg.append('g')
    .attr('transform',translate(MARGIN,MARGIN));

    var line = d3.line()
      .x(function (num,i) {return xScale(i)})
      .y(function (num) {return yScale(num)});

    g.append('path')
      .classed('path',true)
      .attr('d', line(data));

    drawBarChart();

    var newData = GetTenRandomNumbers();
    data.shift();
    data.push(newData.shift());

}

var drawBarChart = function () {
  // createChart();

  var bars = svg.append('g')
    .attr('transform',translate(MARGIN - BARWIDTH/2,MARGIN))
    .classed('bars',true);

    bars.selectAll('.bars').data(data)
      .enter().append('rect')
      .classed('bar', true)
      .attr('width', BARWIDTH)
      .attr('x', function (num,i) {return xScale(i)})
      .attr('y', function (num,i) {return yScale(num)})
      .attr('height', function (num) {return INNER_HEIGHT - yScale(num)});

    var newData = GetTenRandomNumbers();
    data.shift();
    data.push(newData.shift());
}

window.onload = setInterval(drawLineChart,1000);
// window.onload = setInterval(drawBarChart,5000);
