let stockData;

function preload() {
  stockData = loadTable('Stock-Exchange.csv', 'header');
}

function setup() {
  createCanvas(800, 600);
  background(0);
  textSize(12);
  fill(255);

  drawStockChart();
}

function drawStockChart() {
  let margin = 50;
  let chartWidth = width - margin * 2;
  let chartHeight = height - margin * 2;

  let dates = stockData.getColumn('Date');
  let highValues = stockData.getColumn('High').map(Number);
  let lowValues = stockData.getColumn('Low').map(Number);
  let closeValues = stockData.getColumn('Close').map(Number);

  let minPrice = Math.min(...lowValues);
  let maxPrice = Math.max(...highValues);

  stroke(255);
  line(margin, height - margin, width - margin, height - margin); 
  line(margin, margin, margin, height - margin); 

  fill(255);
  noStroke();
  textAlign(CENTER);
  text("Date", width / 2, height - 10);
  textAlign(RIGHT);
  text("Price", margin - 10, margin);

  let xStep = chartWidth / (dates.length - 1);
  let yScale = chartHeight / (maxPrice - minPrice);

  for (let i = 0; i < dates.length; i++) {
    let x = margin + i * xStep;
    let yHigh = height - margin - (highValues[i] - minPrice) * yScale;
    let yLow = height - margin - (lowValues[i] - minPrice) * yScale;
    let yClose = height - margin - (closeValues[i] - minPrice) * yScale;

    stroke(200);
    line(x, yHigh, x, yLow);

    noStroke();
    fill(255, 0, 0);
    ellipse(x, yClose, 5, 5);
  }

  fill(255);
  textAlign(CENTER);
  text(dates[0], margin, height - margin + 20);
  text(dates[dates.length - 1], width - margin, height - margin + 20);
}

function draw() {
}
