let participants = [];

function addParticipant(name) {
    participants.push(name);
    updateParticipantCount();
    renderWheel();
}

function importCSV() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const lines = event.target.result.split("\n");
            lines.forEach(line => {
                const name = line.trim();
                if (name) addParticipant(name);
            });
        };
        reader.readAsText(file);
    }
}

function addInputData() {
    const dataInput = document.getElementById("dataInput").value.split("\n");
    dataInput.forEach(name => {
        name = name.trim();
        if (name) addParticipant(name);
    });
    document.getElementById("dataInput").value = ""; // 清空輸入框
}

function clearData() {
    participants = [];
    updateParticipantCount();
    renderWheel();
}

function updateParticipantCount() {
    document.getElementById("participantCount").textContent = participants.length;
}

function renderWheel() {
    const wheel = document.getElementById("wheel");
    wheel.innerHTML = "";
    if (participants.length === 0) return;
    
    const segmentAngle = 360 / participants.length;
    participants.forEach((name, index) => {
        const segment = document.createElement("div");
        segment.className = "wheel-segment";
        segment.style.transform = `rotate(${index * segmentAngle}deg) skewY(-${90 - segmentAngle}deg)`;
        segment.style.backgroundColor = `hsl(${(index * 360) / participants.length}, 70%, 50%)`;
        segment.innerText = name;
        wheel.appendChild(segment);
    });
}

function spin() {
    if (participants.length === 0) return alert("請先輸入或匯入參加名單！");
    
    const winnerIndex = Math.floor(Math.random() * participants.length);
    const rotation = 360 * 5 + (winnerIndex * (360 / participants.length));
    document.getElementById("wheel").style.transition = "transform 5s ease-out";
    document.getElementById("wheel").style.transform = `rotate(${rotation}deg)`;
    
    setTimeout(() => {
        const winnerName = participants[winnerIndex];
        document.getElementById("winnerName").textContent = winnerName;
        alert(`恭喜 ${winnerName} 中獎！`);
    }, 5000);
}
