let allData = [];

// Load JSON data
async function loadData() {

    const response = await fetch("data.json");

    allData = await response.json();

    loadMachines();
}

// Load machine names
function loadMachines() {

    const machines = [...new Set(allData.map(item => item.Machine))];

    const select = document.getElementById("machineSelect");

    machines.forEach(machine => {

        const option = document.createElement("option");

        option.value = machine;
        option.textContent = machine;

        select.appendChild(option);
    });
}

// Show troubleshooting data
function loadMachineData() {

    const machine = document.getElementById("machineSelect").value;
    document.getElementById("homePage").style.display = "none";

    document.getElementById("machinePage").style.display = "block";

    document.getElementById("machinePageTitle").innerText =
    machine + " Troubleshooting";

    updateMachinePreview(machine);

    const filteredData = allData.filter(
        item => item.Machine === machine
    );

    const results = document.getElementById("results");

    results.innerHTML = "";

    filteredData.forEach(item => {

        results.innerHTML += `
            <div class="card">

                <h3>${item.Problem}</h3>

                <p><strong>Cause:</strong> ${item.Cause}</p>

                <p><strong>Remedy:</strong> ${item.Remedy}</p>

            </div>
        `;
    });
}

// Start app
loadData();
function smartSearch(){

    const input = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const results = document.getElementById("results");

    results.innerHTML = "";

    if(input === ""){
        return;
    }

    const filteredData = allData.filter(item =>

        (item.Problem &&
        item.Problem.toLowerCase().includes(input))

        ||

        (item.Remedy &&
        item.Remedy.toLowerCase().includes(input))

        ||

        (item.Machine &&
        item.Machine.toLowerCase().includes(input))

    );

    filteredData.forEach(item => {

        results.innerHTML += `

            <div class="card">

                <h3>${item.Problem || "Problem"}</h3>

                <p>
                    <strong>Machine:</strong>
                    ${item.Machine || "N/A"}
                </p>

                <p>
                    <strong>Cause:</strong>
                    ${item.Cause || "N/A"}
                </p>

                <p>
                    <strong>Remedy:</strong>
                    ${item.Remedy || "N/A"}
                </p>

            </div>
        `;
    });
}
function updateMachinePreview(machine){
    document.getElementById("previewSection").style.display = "flex";

    const image = document.getElementById("machineImage");

    const title = document.getElementById("machineTitle");

    if(machine === "CGL"){

        image.src = "images/CGL.jpg";
    }

    else if(machine === "Compressor"){

        image.src = "images/compressor.jpg";
    }

    else if(machine === "Gearbox"){

        image.src = "images/gearbox.webp";
    }

    else if(machine === "centrifugal pump"){

        image.src = "images/Pump.jpg";
    }
    title.innerText = machine;
}
function goBack(){

    document.getElementById("homePage").style.display = "block";

    document.getElementById("machinePage").style.display = "none";
}