var lineArr = [];
var MAX_LENGTH = 100;
var duration = 500;
var chart = realTimeLineChart();

function randInt(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function seedData() {
    var now = new Date();
    for (var i = 0; i < MAX_LENGTH; ++i) {
        lineArr.push({
            time: new Date(now.getTime() - ((MAX_LENGTH - i) * duration)),
            x: 0
        });
    }
}

function updateData() {
    var now = new Date();

    var lineData = {
        time: now,
        x: randInt(0, 5),
    };
    lineArr.push(lineData);

    //   if (lineArr.length > 30) {
    //     lineArr.shift();
    //   }
    d3.select("#chart").datum(lineArr.slice(lineArr.length - MAX_LENGTH, lineArr.length)).call(chart);
}

function resize() {
    if (d3.select("#chart svg").empty()) {
        return;
    }
    const c = d3.select("#chart");
    chart.width(+c.style("width").replace(/(px)/g, ""));
    //   chart.height(+c.style("height").replace(/(px)/g, ""));
    c.call(chart);
}

document.addEventListener("DOMContentLoaded", function() {
    seedData();
    window.setInterval(updateData, 100);
    d3.select("#chart").datum(lineArr).call(chart);
    d3.select(window).on('resize', resize);
});
