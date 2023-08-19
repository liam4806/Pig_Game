"use strict";
//updated code on 23/05/29. To be fair, player 2 should have one more chance. 
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const curscore0 = document.querySelector("#current--0");
const curscore1 = document.querySelector("#current--1");
const rolld = document.querySelector(".btn--roll");
const newg = document.querySelector(".btn--new");
const hold = document.querySelector(".btn--hold");
const pl0 = document.querySelector(".player--0");
const pl1 = document.querySelector(".player--1");
let player = "0";
let end = 0;

function whoiswinner() { //function determines who is the winner.
    document.querySelector("#imgID").classList.add("hidden");
    if (Number(score0.textContent) < Number(score1.textContent)) { //For straining game, The winner depends on the higher final score.
        pl0.classList.remove("player--lastshot");
        pl1.classList.add("player--winner");
        end = 1;
    } else if (
        Number(score0.textContent) > Number(score1.textContent)
    ) {
        pl0.classList.add("player--winner");
        end = 1;
    } else {
        pl0.classList.add("player--winner");
        pl1.classList.add("player--winner");
        end = 1;
    }
}

function reset() {
    end = 0;
    player = "0";
    score0.textContent = 0;
    score1.textContent = 0;
    curscore0.textContent = 0;
    curscore1.textContent = 0;
    document.querySelector("#imgID").classList.add("hidden"); //hide the dice png before the game starts
    pl1.classList.remove("player--active");
    pl0.classList.add("player--active");
    pl0.classList.remove("player--winner");
    pl1.classList.remove("player--winner");
    pl0.classList.remove("player--lastshot");
    flagg = 0;
}
let flagg = 0; //use as sign of last chance for P2
reset();

rolld.addEventListener("click", function() {
    if (end === 0) {
        let secretn = Math.trunc(Math.random() * 6 + 1);
        let x = "dice-" + String(secretn) + ".png";
        document.getElementById("imgID").src = x;
        document.getElementById("imgID").classList.remove("hidden"); //display dice
        if (secretn === 1) {
            if (flagg === 1) {
                whoiswinner();
            }
            document.querySelector("#current--" + player).textContent = 0; //interact with DOM directly without using const variable that were declared
            document.querySelector(".player--" + player).classList.remove("player--active");
            player === "1" ? (player = "0") : (player = "1"); //made player switching more cleaner
            document.querySelector(".player--" + player).classList.add("player--active");
        } else {
            document.querySelector("#current--" + player).textContent = Number(document.querySelector("#current--" + player).textContent) + secretn;
        }
    }
});

hold.addEventListener("click", function() {
    if (end === 0) {
        let sc = document.querySelector("#score--" + player);
        let curs = document.querySelector("#current--" + player);
        sc.textContent = Number(sc.textContent) + Number(curs.textContent);
        curs.textContent = 0;
        if (flagg === 1) {
            whoiswinner(); //if it is the last chance, ends game after accumulating scores
        }
        if (Number(sc.textContent) >= 100) {
            if (player === "1") { //if the last player was P2, just ends the game.
                whoiswinner();
            } else { //if the last player was P1, it should give P2 the last chance.
                flagg = 1;
                player = '1';
                pl0.classList.remove("player--active");
                pl1.classList.add("player--active");
                pl0.classList.add("player--lastshot"); //add new class for indicating the last chance
            }
        } else {
            document.querySelector(".player--" + player).classList.remove("player--active");
            player === "1" ? (player = "0") : (player = "1");
            document.querySelector(".player--" + player).classList.add("player--active");
        }
    }
});
newg.addEventListener("click", reset);