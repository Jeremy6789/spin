let participants = [];

function importData() {
    const dataInput = document.getElementById("dataInput").value;
    participants = dataInput.split("\n").map(name => name.trim()).filter(name => name);
    updateParticipantCount();
    renderWheel();
}

function clearData() {
    participants = [];
    document.getElementById("dataInput").value = "";
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
    if (participants.length === 0) return alert("請先匯入資料或輸入參加名單！");
    const winnerIndex = Math.floor(Math.random() * participants.length);
    const rotation = 360 * 5 + (winnerIndex * (360 / participants.length));
    document.getElementById("wheel").style.transition = "transform 5s ease-out";
    document.getElementById("wheel").style.transform = `rotate(${rotation}deg)`;
    setTimeout(() => {
        document.getElementById("winnerName").textContent = participants[winnerIndex];
        alert(`恭喜 ${participants[winnerIndex]} 中獎！`);
    }, 5000);
}
