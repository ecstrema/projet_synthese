/** @type {{time: number, x: number}[]} */
const lineArr = [];
const allData = [];
const MAX_LENGTH = 200;
const duration = 100;
const chart = realTimeLineChart();

/** @type {boolean} */
let paused = false;

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

let updating = false;
function updateData(value) {
    const now = new Date();

    const data = {
        time: now,
        x: value,
    };
    lineArr.push(data);

    if (updating) return;
    updating = true;
    d3.select("#chart")
        .datum(lineArr.slice(lineArr.length - MAX_LENGTH, lineArr.length))
        .call(chart);

    d3.select("#currentWeight").text(value.toFixed(2) + " kg");
    updating = false;
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

function setupUi() {
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
    right.append("div")
        .attr("class", "button")
        .attr("id", "pauseButton")
        .style("width", window.innerWidth * 0.1 + "px")
        .text("Mettre en pause")
        .on("click", () => {
            saveAs(new Blob([JSON.stringify(lineArr)]), "data.txt");
        });
}

if (!navigator.bluetooth) {
    alert("Ce navigateur ne supporte pas le Bluetooth. Google Chrome est connu comme offrant cette fonctionalité.");
}

let latestData = 0;
document.addEventListener("DOMContentLoaded", function() {
    d3.select("#bluetoothButton").on("click", function() {
        const b = BbBluetooth((v) => {
            latestData = v * 0.01;
            allData.push({time: Date.now(), x: v * 0.01});
        });
        b.connect().then(() => {
            setupUi();
            seedData();
            d3.select("#chart").datum(lineArr).call(chart);
            d3.select(window).on('resize', resize);

            window.setInterval(() => updateData(latestData), 100);
        }).catch((e) => {
            setupUi();

            seedData();
            window.setInterval(() => updateData(randInt(2000, 10000) * 0.01), duration);
            d3.select("#chart").datum(lineArr).call(chart);
            d3.select(window).on('resize', resize);
        })

    })
});
