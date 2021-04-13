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
            x: 0,
        });
    }
}

function updateData() {
    var now = new Date();

    var lineData = {
        time: now,
        x: randInt(0, 10000) * 0.01,
    };
    lineArr.push(lineData);
    d3.select("#chart")
        .datum(lineArr.slice(lineArr.length - MAX_LENGTH, lineArr.length))
        .call(chart);
}

function resize() {
    const s = d3.select("#chart svg");
    if (s.empty()) {
        return;
    }
    const c = d3.select("#chart");
    chart.width(+c.style("width").replace(/(px)/g, "") * 0.8);
    chart.height(window.innerHeight - 20);
    c.call(chart);
}

document.addEventListener("DOMContentLoaded", function() {
    d3.select("#bluetoothButton").on("click", function() {
        //connect.toBluetooth
        d3.select("#htmlExceptGraph").style("display", "none");


        seedData();
        window.setInterval(updateData, 100);
        d3.select("#chart").datum(lineArr).call(chart);
        d3.select(window).on('resize', resize);
    })
});
