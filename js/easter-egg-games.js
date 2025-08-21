// 게임 모달 관리
function openGame(gameType) {
    const modal = document.getElementById('gameModal');
    const content = document.getElementById('gameContent');
    
    switch(gameType) {
        case 'speedTest':
            content.innerHTML = createSpeedTestGame();
            break;
        case 'reactionTest':
            content.innerHTML = createReactionTestGame();
            break;
        case 'numberGuess':
            content.innerHTML = createNumberGuessGame();
            break;
    }
    
    modal.style.display = 'block';
}

function closeGame() {
    document.getElementById('gameModal').style.display = 'none';
}

// 모달 외부 클릭 시 닫기
window.onclick = function(event) {
    const modal = document.getElementById('gameModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// 1. 터치 속도 테스트
function createSpeedTestGame() {
    return `
        <h3>⚡ 터치 속도 테스트</h3>
        <p>10초 동안 가능한 한 많이 클릭하세요!</p>
        <div class="game-area">
            <div class="click-target" id="speedTarget" onclick="handleSpeedClick()"></div>
            <div class="mt-3">
                <h4 id="speedCount">0</h4>
                <p id="speedTimer">10초 남음</p>
            </div>
        </div>
        <button class="btn btn-primary" onclick="startSpeedTest()">게임 시작</button>
    `;
}

let speedCount = 0;
let speedTimer = null;
let speedTimeLeft = 10;

function startSpeedTest() {
    speedCount = 0;
    speedTimeLeft = 10;
    document.getElementById('speedCount').textContent = speedCount;
    document.getElementById('speedTarget').style.pointerEvents = 'auto';
    
    speedTimer = setInterval(() => {
        speedTimeLeft--;
        document.getElementById('speedTimer').textContent = speedTimeLeft + '초 남음';
        
        if (speedTimeLeft <= 0) {
            clearInterval(speedTimer);
            document.getElementById('speedTarget').style.pointerEvents = 'none';
            document.getElementById('speedTimer').textContent = '게임 종료!';
            alert(`게임 종료! 총 ${speedCount}번 클릭했습니다!`);
        }
    }, 1000);
}

function handleSpeedClick() {
    if (speedTimeLeft > 0) {
        speedCount++;
        document.getElementById('speedCount').textContent = speedCount;
    }
}

// 2. 반응 속도 테스트
function createReactionTestGame() {
    return `
        <h3>🎯 반응 속도 테스트</h3>
        <p>색이 빨간색으로 변하는 순간 빠르게 클릭하세요!</p>
        <div class="game-area">
            <div class="reaction-box" id="reactionBox" onclick="handleReactionClick()"></div>
            <div class="mt-3">
                <p id="reactionResult">대기 중...</p>
            </div>
        </div>
        <button class="btn btn-primary" onclick="startReactionTest()">게임 시작</button>
    `;
}

let reactionStartTime = 0;
let reactionTimer = null;

function startReactionTest() {
    const box = document.getElementById('reactionBox');
    const result = document.getElementById('reactionResult');
    
    box.className = 'reaction-box waiting';
    result.textContent = '노란색이 될 때까지 기다리세요...';
    
    const delay = Math.random() * 3000 + 1000; // 1-4초 랜덤
    
    reactionTimer = setTimeout(() => {
        box.className = 'reaction-box clicked';
        result.textContent = '지금 클릭하세요!';
        reactionStartTime = Date.now();
    }, delay);
}

function handleReactionClick() {
    if (reactionStartTime > 0) {
        const reactionTime = Date.now() - reactionStartTime;
        document.getElementById('reactionResult').textContent = `반응 시간: ${reactionTime}ms`;
        document.getElementById('reactionBox').className = 'reaction-box';
        reactionStartTime = 0;
        clearTimeout(reactionTimer);
    }
}

// 3. 숫자 맞추기
function createNumberGuessGame() {
    const targetNumber = Math.floor(Math.random() * 100) + 1;
    
    return `
        <h3>🔢 숫자 맞추기</h3>
        <p>1부터 100 사이의 숫자를 맞춰보세요!</p>
        <div class="game-area">
            <input type="number" class="form-control mb-3" id="numberGuess" placeholder="1-100 사이의 숫자를 입력하세요" min="1" max="100">
            <button class="btn btn-primary" onclick="checkNumber(${targetNumber})">확인</button>
            <div class="mt-3">
                <p id="numberResult">숫자를 입력하고 확인 버튼을 클릭하세요!</p>
                <p id="numberAttempts">시도 횟수: 0</p>
            </div>
        </div>
    `;
}

let attempts = 0;

function checkNumber(target) {
    const guess = parseInt(document.getElementById('numberGuess').value);
    attempts++;
    document.getElementById('numberAttempts').textContent = `시도 횟수: ${attempts}`;
    
    const result = document.getElementById('numberResult');
    
    if (guess === target) {
        result.textContent = `축하합니다! ${attempts}번 만에 맞췄습니다! 🎉`;
        result.style.color = '#28a745';
    } else if (guess < target) {
        result.textContent = '더 큰 숫자입니다!';
        result.style.color = '#ffc107';
    } else {
        result.textContent = '더 작은 숫자입니다!';
        result.style.color = '#ffc107';
    }
} 