// =====================================================
// TERRASENSE REAL-TIME DASHBOARD
// =====================================================


// =====================================================
// GRAPH VARIABLES
// =====================================================

let sensorChart = null;

let selectedSensor = "soil";

const sensorHistory = {

    soil: [],

    rain: [],

    tilt: [],

    temperature: [],

    load: []

};

const timeHistory = [];

let latestData = {};



// =====================================================
// SENSOR CONFIGURATION
// =====================================================

const sensorConfig = {

    soil: {

        name: "Soil Moisture",

        unit: "",

        color: "#6fa66f",

        getValue: data =>
            Number(data.soilRaw)

    },


    rain: {

        name: "Rain Sensor",

        unit: "",

        color: "#6f9fc5",

        getValue: data =>
            Number(data.rainRaw)

    },


    tilt: {

        name: "Terrain Tilt",

        unit: "°",

        color: "#c7aa70",

        getValue: data =>
            Number(data.maxTilt)

    },


    temperature: {

        name: "Temperature",

        unit: "°C",

        color: "#c8785d",

        getValue: data =>
            Number(data.temperature)

    },


    load: {

        name: "Load Cell",

        unit: "",

        color: "#9b82b5",

        getValue: data =>
            Number(data.hx711Raw)

    }

};



// =====================================================
// CREATE GRAPH
// =====================================================

function createSensorChart() {

    const canvas =
        document.getElementById("sensorChart");


    if (!canvas) {

        console.log(
            "Sensor chart canvas not found"
        );

        return;

    }


    const ctx =
        canvas.getContext("2d");


    sensorChart = new Chart(
        ctx,
        {

            type: "line",

            data: {

                labels: [],

                datasets: [

                    {

                        label: "Sensor",

                        data: [],

                        borderColor:
                            sensorConfig.soil.color,

                        backgroundColor:
                            "rgba(111,166,111,0.10)",

                        borderWidth: 3,

                        tension: 0.35,

                        fill: true,

                        pointRadius: 3,

                        pointHoverRadius: 6

                    }

                ]

            },


            options: {

                responsive: true,

                maintainAspectRatio: false,

                animation: {

                    duration: 500,

                    easing: "easeOutQuart"

                },


                interaction: {

                    intersect: false,

                    mode: "index"

                },


                plugins: {

                    legend: {

                        display: false

                    }

                },


                scales: {

                    x: {

                        ticks: {

                            color: "rgba(255,255,255,0.55)",

                            maxTicksLimit: 8

                        },

                        grid: {

                            color:
                                "rgba(255,255,255,0.06)"

                        }

                    },


                    y: {

                        beginAtZero: false,

                        ticks: {

                            color:
                                "rgba(255,255,255,0.55)"

                        },

                        grid: {

                            color:
                                "rgba(255,255,255,0.06)"

                        }

                    }

                }

            }

        }

    );

}



// =====================================================
// UPDATE GRAPH
// =====================================================

function updateGraph(data) {

    if (!sensorChart) {

        return;

    }


    const config =
        sensorConfig[selectedSensor];


    const value =
        config.getValue(data);


    if (!Number.isFinite(value)) {

        return;

    }


    const now =
        new Date();


    const time =
        now.toLocaleTimeString([], {

            hour: "2-digit",

            minute: "2-digit",

            second: "2-digit"

        });


    // Add timestamp

    timeHistory.push(time);


    // Add sensor value

    sensorHistory[selectedSensor]
        .push(value);


    // Keep only latest 20 readings

    if (timeHistory.length > 20) {

        timeHistory.shift();

    }


    if (
        sensorHistory[selectedSensor].length
        > 20
    ) {

        sensorHistory[selectedSensor]
            .shift();

    }


    renderSelectedGraph();

}



// =====================================================
// RENDER SELECTED GRAPH
// =====================================================

function renderSelectedGraph() {

    if (!sensorChart) {

        return;

    }


    const config =
        sensorConfig[selectedSensor];


    sensorChart.data.labels =
        timeHistory;


    sensorChart.data.datasets[0].data =
        sensorHistory[selectedSensor];


    sensorChart.data.datasets[0].label =
        config.name;


    sensorChart.data.datasets[0].borderColor =
        config.color;


    sensorChart.data.datasets[0]
        .backgroundColor =
        hexToRgba(
            config.color,
            0.10
        );


    sensorChart.update();

}



// =====================================================
// CHANGE SENSOR
// =====================================================

function selectSensor(sensor) {

    if (!sensorConfig[sensor]) {

        return;

    }


    selectedSensor =
        sensor;


    const config =
        sensorConfig[sensor];


    // Update buttons

    document
        .querySelectorAll(".graph-btn")
        .forEach(button => {

            button.classList.remove(
                "active"
            );

        });


    const selectedButton =
        document.querySelector(
            `.graph-btn[data-sensor="${sensor}"]`
        );


    if (selectedButton) {

        selectedButton.classList.add(
            "active"
        );

    }


    // Update title

    const name =
        document.getElementById(
            "graphSensorName"
        );


    if (name) {

        name.innerText =
            config.name;

    }


    // Show current value

    updateGraphCurrentValue();


    // Redraw graph

    renderSelectedGraph();

}



// =====================================================
// CURRENT GRAPH VALUE
// =====================================================

function updateGraphCurrentValue() {

    const config =
        sensorConfig[selectedSensor];


    const value =
        config.getValue(latestData);


    const currentValue =
        document.getElementById(
            "graphCurrentValue"
        );


    if (!currentValue) {

        return;

    }


    if (!Number.isFinite(value)) {

        currentValue.innerText =
            "--";

        return;

    }


    if (selectedSensor === "tilt") {

        currentValue.innerText =
            value.toFixed(1)
            + "°";

    }

    else if (
        selectedSensor === "temperature"
    ) {

        currentValue.innerText =
            value.toFixed(1)
            + "°C";

    }

    else {

        currentValue.innerText =
            Math.round(value);

    }

}



// =====================================================
// COLOR HELPER
// =====================================================

function hexToRgba(hex, alpha) {

    const r =
        parseInt(
            hex.substring(1, 3),
            16
        );


    const g =
        parseInt(
            hex.substring(3, 5),
            16
        );


    const b =
        parseInt(
            hex.substring(5, 7),
            16
        );


    return `rgba(${r}, ${g}, ${b}, ${alpha})`;

}



// =====================================================
// GRAPH BUTTONS
// =====================================================

document
    .querySelectorAll(".graph-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                selectSensor(
                    button.dataset.sensor
                );

            }
        );

    });



// =====================================================
// INITIALIZE GRAPH
// =====================================================

createSensorChart();



// =====================================================
// FIREBASE → DASHBOARD
// =====================================================

window.addEventListener(
    "terrasenseData",
    (event) => {

        const data =
            event.detail;


        console.log(
            "DASHBOARD RECEIVED:",
            data
        );


        // Save latest Firebase data

        latestData =
            data;



        // =================================================
        // SOIL
        // =================================================

        if (
            data.soilRaw !== undefined
        ) {

            const soilValue =
                document.getElementById(
                    "soilValue"
                );


            if (soilValue) {

                soilValue.innerText =
                    data.soilRaw;

            }

        }


        if (
            data.soilWet !== undefined
        ) {

            const condition =
                document.getElementById(
                    "soilCondition"
                );


            const overview =
                document.getElementById(
                    "soilConditionOverview"
                );


            if (condition) {

                condition.innerText =
                    "Soil condition: "
                    + data.soilWet;

            }


            if (overview) {

                overview.innerText =
                    data.soilWet;

            }

        }



        // =================================================
        // RAIN
        // =================================================

        if (
            data.rainRaw !== undefined
        ) {

            const rainRaw =
                document.getElementById(
                    "rainRaw"
                );


            if (rainRaw) {

                rainRaw.innerText =
                    "Raw value: "
                    + data.rainRaw;

            }

        }


        if (
            data.rainDetected !== undefined
        ) {

            const rainValue =
                document.getElementById(
                    "rainValue"
                );


            const rainBadge =
                document.getElementById(
                    "rainBadge"
                );


            const rainStatus =
                String(
                    data.rainDetected
                ).toUpperCase();


            if (rainValue) {

                rainValue.innerText =
                    rainStatus;

            }


            if (rainBadge) {

                rainBadge.innerText =
                    rainStatus;

            }

        }



        // =================================================
        // TERRAIN TILT
        // =================================================

        if (
            data.maxTilt !== undefined
        ) {

            const tiltValue =
                document.getElementById(
                    "tiltValue"
                );


            if (tiltValue) {

                tiltValue.innerText =
                    Number(
                        data.maxTilt
                    ).toFixed(1)
                    + "°";

            }

        }



        // =================================================
        // STATUS
        // =================================================

        if (
            data.status !== undefined
        ) {

            const status =
                String(
                    data.status
                ).toUpperCase();


            const tiltStatus =
                document.getElementById(
                    "tiltStatus"
                );


            const overallBadge =
                document.getElementById(
                    "overallStatusBadge"
                );


            const overallStatus =
                document.getElementById(
                    "overallStatus"
                );


            const panelText =
                document.getElementById(
                    "statusPanelText"
                );


            const description =
                document.getElementById(
                    "statusDescription"
                );


            if (tiltStatus) {

                tiltStatus.innerText =
                    status;

                setStatusClass(
                    tiltStatus,
                    status
                );

            }


            if (overallBadge) {

                overallBadge.innerText =
                    status;

                setStatusClass(
                    overallBadge,
                    status
                );

            }


            if (overallStatus) {

                overallStatus.innerText =
                    status;

            }


            if (panelText) {

                panelText.innerText =
                    status;

            }


            if (description) {

                if (status === "SAFE") {

                    description.innerText =
                        "Terrain condition is normal.";

                }

                else if (
                    status === "WARNING"
                ) {

                    description.innerText =
                        "Terrain condition requires attention.";

                }

                else if (
                    status === "DANGER"
                ) {

                    description.innerText =
                        "Dangerous terrain condition detected.";

                }

            }

        }



        // =================================================
        // LOAD CELL
        // =================================================

        if (
            data.hx711Raw !== undefined
        ) {

            const loadCell =
                document.getElementById(
                    "loadCellValue"
                );


            if (loadCell) {

                loadCell.innerText =
                    data.hx711Raw;

            }

        }



        // =================================================
        // TEMPERATURE
        // =================================================

        if (
            data.temperature !== undefined
        ) {

            const temperature =
                document.getElementById(
                    "temperatureValue"
                );


            if (temperature) {

                temperature.innerText =
                    Number(
                        data.temperature
                    ).toFixed(1)
                    + "°C";

            }

        }



        // =================================================
        // RSSI
        // =================================================

        if (
            data.rssi !== undefined
        ) {

            const rssi =
                document.getElementById(
                    "rssiValue"
                );


            if (rssi) {

                rssi.innerText =
                    data.rssi
                    + " dBm";

            }

        }



        // =================================================
        // SNR
        // =================================================

        if (
            data.snr !== undefined
        ) {

            const snr =
                document.getElementById(
                    "snrValue"
                );


            if (snr) {

                snr.innerText =
                    Number(
                        data.snr
                    ).toFixed(2)
                    + " dB";

            }

        }



        // =================================================
        // CONNECTION
        // =================================================

        if (
            data.online !== undefined
        ) {

            const connection =
                document.getElementById(
                    "connectionStatus"
                );


            const sidebar =
                document.getElementById(
                    "sidebarNodeStatus"
                );


            if (data.online) {

                if (connection) {

                    connection.innerText =
                        "ONLINE";

                }


                if (sidebar) {

                    sidebar.innerText =
                        "Node 01 Online";

                }

            }

            else {

                if (connection) {

                    connection.innerText =
                        "OFFLINE";

                }


                if (sidebar) {

                    sidebar.innerText =
                        "Node 01 Offline";

                }

            }

        }



        // =================================================
        // LAST UPDATE
        // =================================================

        const lastUpdate =
            document.getElementById(
                "lastUpdate"
            );


        const graphUpdate =
            document.getElementById(
                "graphLastUpdate"
            );


        const currentTime =
            new Date()
            .toLocaleTimeString();


        if (lastUpdate) {

            lastUpdate.innerText =
                currentTime;

        }


        if (graphUpdate) {

            graphUpdate.innerText =
                "Updated "
                + currentTime;

        }



        // =================================================
        // UPDATE GRAPH
        // =================================================

        updateGraph(data);


        updateGraphCurrentValue();

    }
);



// =====================================================
// STATUS CLASS
// =====================================================

function setStatusClass(
    element,
    status
) {

    element.classList.remove(
        "normal",
        "warning",
        "danger"
    );


    if (status === "SAFE") {

        element.classList.add(
            "normal"
        );

    }

    else if (
        status === "WARNING"
    ) {

        element.classList.add(
            "warning"
        );

    }

    else if (
        status === "DANGER"
    ) {

        element.classList.add(
            "danger"
        );

    }

}