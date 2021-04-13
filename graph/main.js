/** @type {{time: number, x: number}[]} */
const lineArr = [];
const MAX_LENGTH = 100;
const duration = 100;
const chart = realTimeLineChart();

function randInt(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function seedData() {
    const now = new Date();
    for (let i = 0; i < MAX_LENGTH; ++i) {
        lineArr.push({
            time: new Date(now.getTime() - ((MAX_LENGTH - i) * duration)),
            x: 0,
        });
    }
}

function updateData(value) {
    const now = new Date();

    const lineData = {
        time: now,
        x: value,
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

if (!navigator.bluetooth) {
    alert("Ce navigateur ne supporte pas le Bluetooth. Google Chrome est connu comme offrant cette fonctionalité.");
}

document.addEventListener("DOMContentLoaded", function() {
    d3.select("#bluetoothButton").on("click", function() {
        const b = BbBluetooth();
        b.connect().then(() => {
            d3.select("#htmlExceptGraph").style("display", "none");

            seedData();
            b.handleNewData = (value) => {
                const lineData = {
                    time: now,
                    x: value * 0.01,
                };
                lineArr.push(lineData);
            }
            d3.select("#chart").datum(lineArr).call(chart);
            d3.select(window).on('resize', resize);
        }).catch((e) => {

            d3.select("#htmlExceptGraph").style("display", "none");

            seedData();
            window.setInterval(() => updateData(randInt(2000, 10000) * 0.01), duration);
            d3.select("#chart").datum(lineArr).call(chart);
            d3.select(window).on('resize', resize);
        })

    })
});
