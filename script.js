const WIN = 100

const player0El = document.querySelector('.player_0')
const player1El = document.querySelector('.player_1')

const score0El = document.getElementById('score_0');
const score1El = document.getElementById('score_1');
const diceEl = document.querySelector('.dice');

const current0El = document.getElementById('current_0');
const current1El = document.getElementById('current_1');
const turnEl = document.getElementById('turn');

const game = {
    holds: {
        king1: 0,
        king2: 0
    },
    currents: {
        king1: 0,
        king2: 0
    },
    elements: {
        king1: {
            hold: score0El,
            current: current0El,
            player: player0El
        },
        king2: {
            hold: score1El,
            current: current1El,
            player: player1El
        }
    }
}

// buttons
const btnRoll = document.querySelector('.btn_roll');
const btnHold = document.querySelector('.btn_hold');
const btnNew = document.querySelector('.btn_new');

let turn = 1

renderPoints()

diceEl.classList.add("hidden");

function renderPoints() {
    game.elements.king1.current.textContent = game.currents.king1
    game.elements.king1.hold.textContent = game.holds.king1
    game.elements.king2.current.textContent = game.currents.king2
    game.elements.king2.hold.textContent = game.holds.king2
    turnEl.textContent = `It's King ${turn}'s turn.`
    game.elements['king'+turn].player.classList.add('player_active')
    game.elements['king'+(turn===1?2:1)].player.classList.remove('player_active')
}

function changeTurn() {
    game.elements['king'+turn].player.classList.remove('player_active')
    turn = turn === 1 ? 2 : 1
    game.elements['king'+turn].player.classList.add('player_active')
}

function takeTurn() {
    diceEl.classList.remove("hidden");  
    
    //1. generate the random number
    const dice = Math.floor(Math.random() * 6) + 1;
    
    //2. display random image
    diceEl.src = `./images/dice-${dice}.png`;
    
    //3. check for rolled 1
    if (dice !==1){
        // display the score
        game.currents['king'+turn] += dice;
    }else{
        // switch the player
        game.currents['king'+turn] = 0
        changeTurn()
    }

    renderPoints()
    checkGameStatus()
}

function btnDisplay(str) {
    btnHold.style.display = str
    btnRoll.style.display = str
}

function checkGameStatus() {
    ([1,2]).forEach(n=>{
        if (game.holds['king'+n] + game.currents['king'+n] >= WIN) {
            // HANDLE WIN
            game.holds['king'+n] += game.currents['king'+n]
            game.currents['king'+n] = 0
            renderPoints()
            turnEl.textContent = `King ${n} is the winner!`
            game.elements['king'+n].player.classList.add('winner')
            game.elements['king'+n].player.classList.remove('player_active')
            btnDisplay('none')
        }
    })
}

btnRoll.addEventListener('click', takeTurn);
btnHold.addEventListener('click', ()=>{
    game.holds['king'+turn] += game.currents['king'+turn]
    game.currents['king'+turn] = 0
    changeTurn()
    renderPoints()
})
btnNew.addEventListener('click', ()=>{
    btnDisplay('inline')
    game.holds = {
        king1: 0,
        king2: 0
    }
    game.currents = {...game.holds}
    turn = 1
    renderPoints()
    game.elements.king1.player.classList.remove('winner')
    game.elements.king2.player.classList.remove('winner')
})
