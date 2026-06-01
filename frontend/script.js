let allData = [];

/* ---------------- AI Loading Messages ---------------- */

const loadingMessages = [

    "Initializing AI Diagnosis...",

    "Scanning Machine Faults...",

    "Analyzing Industrial Parameters...",

    "Detecting Failure Patterns...",

    "Generating Troubleshooting Report..."
];

/* ---------------- Loading Animation ---------------- */

function startLoadingAnimation(){

    let index = 0;

    const loadingText =
        document.getElementById("loadingText");

    return setInterval(() => {

        loadingText.innerText =
            loadingMessages[index];

        index++;

        if(index >= loadingMessages.length){

            index = 0;
        }

    }, 500);
}

/* ---------------- Load JSON Data ---------------- */

async function loadData() {

    const response = await fetch("data.json");

    allData = await response.json();

    loadMachines();
}

/* ---------------- Load Machine Names ---------------- */

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

/* ---------------- Show Troubleshooting Data ---------------- */

function loadMachineData() {

    document.getElementById("loadingScreen").style.display =
        "flex";

    const loadingInterval = startLoadingAnimation();

    const machine =
        document.getElementById("machineSelect").value;

    updateMachinePreview(machine);

    setTimeout(() => {

        clearInterval(loadingInterval);

        document.getElementById("loadingScreen").style.display =
            "none";

        document.getElementById("homePage").style.display =
            "none";

        document.getElementById("machinePage").style.display =
            "block";

        document.getElementById("machinePageTitle").innerText =
            machine + " Troubleshooting";

        const filteredData = allData.filter(
            item => item.Machine === machine
        );

        const results =
            document.getElementById("results");

        results.innerHTML = "";

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

    }, 2000);
}

/* ---------------- Smart Search ---------------- */

function smartSearch(){

    const input = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const results =
        document.getElementById("results");

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

/* ---------------- Machine Preview ---------------- */

function updateMachinePreview(machine){

    document.getElementById("previewSection").style.display =
        "flex";

    const image =
        document.getElementById("machineImage");

    const title =
        document.getElementById("machineTitle");

    if(machine === "CGL"){

        image.src = "images/CGL.jpg";
    }

    else if(machine === "Compressor"){

        image.src = "images/compressor.jpg";
    }

    else if(machine === "Gearbox"){

        image.src = "images/gearbox.webp";
    }

    else if(machine.toLowerCase().includes("pump")){

        image.src = "images/Pump.jpg";
    }

    title.innerText = machine;
}

/* ---------------- Back Button ---------------- */

function goBack(){

    document.getElementById("homePage").style.display =
        "block";

    document.getElementById("machinePage").style.display =
        "none";

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}

/* ---------------- Machine Category Selection ---------------- */

function selectMachine(machine){

    document.getElementById("machineSelect").value =
        machine;

    updateMachinePreview(machine);

    document.getElementById("previewSection")
        .scrollIntoView({
            behavior:"smooth"
        });
}

/* ---------------- Start App ---------------- */

loadData();

/* ---------------- SteelAI Chatbot ---------------- */

function sendMessage(){

    const input =
        document.getElementById("chatInput");

    const message =
        input.value.trim();

    if(message === ""){
        return;
    }

    const chatMessages =
        document.getElementById("chatMessages");

    /* User Message */

    chatMessages.innerHTML += `

        <div class="user-message">
            ${message}
        </div>
    `;

    /* AI Response */

    let response =
        getAIResponse(message.toLowerCase());

    setTimeout(() => {

        chatMessages.innerHTML += `

            <div class="bot-message">
                ${response}
            </div>
        `;

        chatMessages.scrollTop =
            chatMessages.scrollHeight;

    }, 700);

    input.value = "";

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}

/* ---------------- AI Logic ---------------- */

function getAIResponse(message){

    if(
        message.includes("pressure")
    ){

        return `
            ⚡ Low pressure may occur due to
            leakage, valve blockage, or
            compressor inefficiency.
            Inspect pressure lines and valves.
        `;
    }

    else if(
        message.includes("overheat")
    ){

        return `
            🔥 Overheating can occur due to
            poor lubrication, overload,
            or cooling failure.
            Inspect lubrication system immediately.
        `;
    }

    else if(
        message.includes("vibration")
    ){

        return `
            📳 Excessive vibration may indicate
            shaft misalignment, imbalance,
            or bearing failure.
            Check alignment and bearings.
        `;
    }

    else if(
        message.includes("leak")
    ){

        return `
            💧 Leakage may occur due to
            damaged seals, loose fittings,
            or pipe cracks.
            Inspect seals and joints carefully.
        `;
    }

    else if(
        message.includes("noise")
    ){

        return `
            🔊 Abnormal noise may indicate
            loose components or bearing wear.
            Inspect rotating components.
        `;
    }

    else if(
        message.includes("gearbox")
    ){

        return `
            ⚙ Gearbox issues usually relate to
            lubrication failure, gear wear,
            or shaft misalignment.
        `;
    }

    else if(
        message.includes("pump")
    ){

        return `
            💧 Pump issues may be caused by
            cavitation, impeller damage,
            or suction blockage.
        `;
    }

    else if(
        message.includes("compressor")
    ){

        return `
            🌀 Compressor problems often occur due
            to pressure imbalance, leakage,
            or overheating.
        `;
    }

    else{

        return `
            🤖 SteelAI is analyzing your query.
            Please provide more industrial
            troubleshooting details.
        `;
    }
}