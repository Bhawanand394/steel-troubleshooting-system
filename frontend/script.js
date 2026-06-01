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

/* ---------------- REAL SteelAI Chatbot ---------------- */

async function sendMessage(){

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

    input.value = "";

    /* Loading Message */

    chatMessages.innerHTML += `

        <div class="bot-message" id="loadingMessage">
            🤖 SteelAI is analyzing your industrial issue...
        </div>
    `;

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

    try{

        const response = await fetch(

            "http://127.0.0.1:5000/chat",

            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    message:message

                })

            }

        );

        const data = await response.json();

        /* Remove Loading */

        document
            .getElementById("loadingMessage")
            .remove();

        /* AI Response */

        chatMessages.innerHTML += `

            <div class="bot-message">
                ${data.reply}
            </div>
        `;

        chatMessages.scrollTop =
            chatMessages.scrollHeight;

    }

    catch(error){

        document
            .getElementById("loadingMessage")
            .remove();

        chatMessages.innerHTML += `

            <div class="bot-message">
                ❌ Unable to connect to SteelAI backend.
                Make sure Flask server is running.
            </div>
        `;
    }
}
/* MOBILE CHAT TOGGLE */

function toggleChatbot(){

    const chatbot =
        document.getElementById(
            "chatbotContainer"
        );

    chatbot.classList.toggle("active");
}