const wheelCanvas = document.getElementById('wheel');
const ctx = wheelCanvas.getContext('2d');
const dataInput = document.getElementById('dataInput');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const winnerMessage = document.getElementById('winnerMessage');
const winnerName = document.getElementById('winnerName');

let names = [];
let isSpinning = false;
let rotation = 0;
let currentName = '';

dataInput.addEventListener('input', () => {
    names = dataInput.value.split('\n').filter(name => name.trim() !== '');
    drawWheel();
});

startButton.addEventListener('click', spinWheel);
resetButton.addEventListener('click', resetWheel);

function drawWheel() {
    const numNames = names.length;
    const arcSize = (2 * Math.PI) / numNames;
    ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);

    names.forEach((name, i) => {
        const angle = i * arcSize;
        ctx.beginPath();
        ctx.fillStyle = i % 2 === 0 ? '#f7b2b7' : '#c2eabd';
        ctx.moveTo(200, 200);
        ctx.arc(200, 200, 200, angle, angle + arcSize);
        ctx.fill();

        ctx.save();
        ctx.translate(200, 200);
        ctx.rotate(angle + arcSize / 2);
        ctx.fillStyle = '#333';
        ctx.font = '18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(name, 120, 10);
        ctx.restore();
    });
}

function spinWheel() {
    if (isSpinning || names.length === 0) return;

    isSpinning = true;
    winnerMessage.classList.add('hidden');
    const spinTime = 3000;
    const spinRotation = Math.floor(Math.random() * 360) + 360 * 5;
    const winnerIndex = Math.floor((rotation + spinRotation) / (360 / names.length)) % names.length;
    currentName = names[winnerIndex];

    let startTime;
    function animateSpin(time) {
        if (!startTime) startTime = time;
        const elapsed = time - startTime;

        rotation = (spinRotation * elapsed) / spinTime;
        ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
        ctx.save();
        ctx.translate(200, 200);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-200, -200);
        drawWheel();
        ctx.restore();

        if (elapsed < spinTime) {
            requestAnimationFrame(animateSpin);
        } else {
            isSpinning = false;
            rotation %= 360;
            winnerName.textContent = currentName;
            winnerMessage.classList.remove('hidden');
        }
    }
    requestAnimationFrame(animateSpin);
}

function resetWheel() {
    dataInput.value = '';
    names = [];
    rotation = 0;
    drawWheel();
    winnerMessage.classList.add('hidden');
}

drawWheel();
