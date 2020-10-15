/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    
    if(gamePlaying) {
        // 1. Random number: 주사위 던지는 동작을 랜덤함수+floor함수로 구현
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result: diceDOM을 받아서 none(디폴트)를 block으로 바꿔주고
        // src에 roll한 주사위의 숫자를 반영해서 image가 보이도록 함
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // 3. 던진 주사위의 결과가 1이 아니면 round score를 갱신
        if (dice !== 1) {
            //갱신
            roundScore += dice;
            //반영
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //다음 플레이어로 턴 전환
            nextPlayer();
        }
    }
});


document.querySelector('.btn-hold').addEventListener('click', function(){
    
    if (gamePlaying) {
        // CURRENT score를 GLOBAL score로
        scores[activePlayer] += roundScore;
        // UI 업데이트
        document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
        // 이겼는 지 확인, 이겼으면 player name 대신에 winner라는 문구가 뜸
        if(scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            //winner클래스 임팩트를 줌
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            //active클래스는 제거
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;
        } else {
            //다음 플레이어로 턴 전환
            nextPlayer();        
        }        
    }
});

function nextPlayer() {
    //다음 플레이어로 턴 전환
    activePlayer === 0 ? activePlayer=1 : activePlayer=0;
    //round score를 0으로
    roundScore = 0;
    //화면에도 초기화 반영
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    //activePlayer 토글
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //턴이 넘어가면 주사위 이미지 사라지기
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    // 초기화 해줌
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';

    // 모든 ROUND score와 GLOBAL score를 초기화
    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    
}