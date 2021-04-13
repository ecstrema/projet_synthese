/** @type {{time: number, x: number}[]} */
const lineArr = [];
const MAX_LENGTH = 200;
const duration = 100;
const chart = realTimeLineChart();

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
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

    d3.select("#currentWeight").text(value.toFixed(2) + " kg");
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

    d3.select("#downloadButton").style("width", window.innerWidth * 0.15 + "px");
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
            const right = d3.select("#chart")
                .append("div")
                    .style("right", "20px")
                    .style("top", (window.innerHeight * 0.5 - 60)+ "px")
                    .style("position", "absolute")
                    .style("z-index", "10");
            right.append("h1")
                .attr("id", "currentWeight")
                .style("text-align", "center")
                .text("0.00")
            right.append("div")
                .attr("class", "button")
                .attr("id", "downloadButton")
                .style("width", window.innerWidth * 0.1 + "px")
                .text("Télécharger")
                .on("click", () => saveAs(new Blob([JSON.stringify(lineArr)]), "data.txt"));

            seedData();
            window.setInterval(() => updateData(randInt(2000, 10000) * 0.01), duration);
            d3.select("#chart").datum(lineArr).call(chart);
            d3.select(window).on('resize', resize);
        })

    })
});
