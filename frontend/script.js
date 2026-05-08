const apiURL = "http://127.0.0.1:5000";

// Load machine names
async function loadMachines() {

    const response = await fetch(`${apiURL}/machines`);

    const machines = await response.json();

    const select = document.getElementById("machineSelect");

    machines.forEach(machine => {

        const option = document.createElement("option");

        option.value = machine;
        option.textContent = machine;

        select.appendChild(option);
    });
}

// Load troubleshooting data
async function loadMachineData() {

    const machine = document.getElementById("machineSelect").value;

    const response = await fetch(`${apiURL}/machine/${machine}`);

    const data = await response.json();

    const results = document.getElementById("results");

    results.innerHTML = "";

    data.forEach(item => {

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
loadMachines();