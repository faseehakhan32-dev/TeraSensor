// =====================================================
// TERRASENSE REAL-TIME DASHBOARD
// =====================================================

window.addEventListener("terrasenseData", (event) => {

    const data = event.detail;

    console.log("DASHBOARD RECEIVED:", data);


    // =================================================
    // NODE ID
    // =================================================

    const nodeId =
        document.getElementById("nodeId");

    if (nodeId && data.nodeID !== undefined) {

        nodeId.innerText =
            data.nodeID;

    }


    // =================================================
    // SOIL
    // =================================================

    if (data.soilRaw !== undefined) {

        const soilValue =
            document.getElementById("soilValue");

        if (soilValue) {

            soilValue.innerText =
                data.soilRaw;

        }

    }


    if (data.soilWet !== undefined) {

        const soilCondition =
            document.getElementById("soilCondition");

        const soilConditionOverview =
            document.getElementById(
                "soilConditionOverview"
            );


        if (soilCondition) {

            soilCondition.innerText =
                "Soil condition: " +
                data.soilWet;

        }


        if (soilConditionOverview) {

            soilConditionOverview.innerText =
                data.soilWet;

        }

    }



    // =================================================
    // RAIN
    // =================================================

    if (data.rainRaw !== undefined) {

        const rainRaw =
            document.getElementById("rainRaw");


        if (rainRaw) {

            rainRaw.innerText =
                "Raw value: " +
                data.rainRaw;

        }

    }


    if (data.rainDetected !== undefined) {

        const rainValue =
            document.getElementById("rainValue");

        const rainBadge =
            document.getElementById("rainBadge");


        const rainStatus =
            String(data.rainDetected)
            .toUpperCase();


        if (rainValue) {

            rainValue.innerText =
                rainStatus;

        }


        if (rainBadge) {

            rainBadge.innerText =
                rainStatus;

            rainBadge.classList.remove(
                "normal",
                "warning",
                "danger"
            );


            if (
                rainStatus === "NO" ||
                rainStatus === "DRY"
            ) {

                rainBadge.classList.add(
                    "normal"
                );

            }

            else {

                rainBadge.classList.add(
                    "warning"
                );

            }

        }

    }



    // =================================================
    // TERRAIN TILT
    // =================================================

    if (data.maxTilt !== undefined) {

        const tiltValue =
            document.getElementById("tiltValue");


        if (tiltValue) {

            tiltValue.innerText =
                Number(data.maxTilt)
                .toFixed(1) + "°";

        }

    }



    // =================================================
    // SYSTEM STATUS
    // SAFE / WARNING / DANGER
    // =================================================

    if (data.status !== undefined) {

        const status =
            String(data.status)
            .toUpperCase();


        // ---------------------------------------------
        // Terrain badge
        // ---------------------------------------------

        const tiltStatus =
            document.getElementById(
                "tiltStatus"
            );


        if (tiltStatus) {

            tiltStatus.innerText =
                status;

            setStatusClass(
                tiltStatus,
                status
            );

        }



        // ---------------------------------------------
        // Overall badge
        // ---------------------------------------------

        const overallStatusBadge =
            document.getElementById(
                "overallStatusBadge"
            );


        if (overallStatusBadge) {

            overallStatusBadge.innerText =
                status;

            setStatusClass(
                overallStatusBadge,
                status
            );

        }



        // ---------------------------------------------
        // Overall status text
        // ---------------------------------------------

        const overallStatus =
            document.getElementById(
                "overallStatus"
            );


        if (overallStatus) {

            overallStatus.innerText =
                status;

        }



        // ---------------------------------------------
        // Status panel
        // ---------------------------------------------

        const statusPanelText =
            document.getElementById(
                "statusPanelText"
            );


        const statusDescription =
            document.getElementById(
                "statusDescription"
            );


        const statusIcon =
            document.getElementById(
                "statusIcon"
            );


        if (statusPanelText) {

            statusPanelText.innerText =
                status;

        }


        if (status === "SAFE") {

            if (statusIcon) {

                statusIcon.innerText =
                    "✓";

            }

            if (statusDescription) {

                statusDescription.innerText =
                    "Terrain condition is normal.";

            }

        }


        else if (status === "WARNING") {

            if (statusIcon) {

                statusIcon.innerText =
                    "⚠";

            }

            if (statusDescription) {

                statusDescription.innerText =
                    "Terrain condition requires attention.";

            }

        }


        else if (status === "DANGER") {

            if (statusIcon) {

                statusIcon.innerText =
                    "⚠";

            }

            if (statusDescription) {

                statusDescription.innerText =
                    "Dangerous terrain condition detected.";

            }

        }

    }



    // =================================================
    // LOAD CELL / HX711
    // =================================================

    if (data.hx711Raw !== undefined) {

        const loadCellValue =
            document.getElementById(
                "loadCellValue"
            );


        if (loadCellValue) {

            loadCellValue.innerText =
                data.hx711Raw;

        }

    }



    // =================================================
    // TEMPERATURE
    // =================================================

    if (data.temperature !== undefined) {

        const temperatureValue =
            document.getElementById(
                "temperatureValue"
            );


        if (temperatureValue) {

            temperatureValue.innerText =
                Number(data.temperature)
                .toFixed(1) + "°C";

        }

    }



    // =================================================
    // RSSI
    // =================================================

    if (data.rssi !== undefined) {

        const rssiValue =
            document.getElementById(
                "rssiValue"
            );


        if (rssiValue) {

            rssiValue.innerText =
                data.rssi + " dBm";

        }

    }



    // =================================================
    // SNR
    // =================================================

    if (data.snr !== undefined) {

        const snrValue =
            document.getElementById(
                "snrValue"
            );


        if (snrValue) {

            snrValue.innerText =
                Number(data.snr)
                .toFixed(2) + " dB";

        }

    }



    // =================================================
    // CONNECTION
    // =================================================

    if (data.online !== undefined) {

        const connectionStatus =
            document.getElementById(
                "connectionStatus"
            );


        const sidebarNodeStatus =
            document.getElementById(
                "sidebarNodeStatus"
            );


        if (data.online) {

            if (connectionStatus) {

                connectionStatus.innerText =
                    "ONLINE";

            }


            if (sidebarNodeStatus) {

                sidebarNodeStatus.innerText =
                    "Node 01 Online";

            }

        }

        else {

            if (connectionStatus) {

                connectionStatus.innerText =
                    "OFFLINE";

            }


            if (sidebarNodeStatus) {

                sidebarNodeStatus.innerText =
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


    if (lastUpdate) {

        lastUpdate.innerText =
            new Date()
            .toLocaleTimeString();

    }



    // =================================================
    // DATA STATUS
    // =================================================

    const dataStatus =
        document.getElementById(
            "dataStatus"
        );


    if (dataStatus) {

        dataStatus.innerText =
            "RECEIVING";

    }



    // =================================================
    // LIVE MESSAGE
    // =================================================

    const liveMessage =
        document.getElementById(
            "liveMessage"
        );


    if (liveMessage) {

        liveMessage.innerText =
            "Live sensor data received from Node 01.";

    }

});



// =====================================================
// STATUS CLASS HELPER
// =====================================================

function setStatusClass(element, status) {

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

    else if (status === "WARNING") {

        element.classList.add(
            "warning"
        );

    }

    else if (status === "DANGER") {

        element.classList.add(
            "danger"
        );

    }

}