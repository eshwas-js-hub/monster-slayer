//HERE THE CONST GLOBAL VARIABLES ARE NOT HARDCODED (i.e., they are dynamic) AND CONTAIN REFERENCES TO HTML TAGS : CONVENTION : USE LOWER-CASE CHARACTERS TO DECLARE VARIABLE NAMES
const monsterHealthBar = document.getElementById('monster-health'); 
const playerHealthBar = document.getElementById('player-health');
const bonusLifeEl = document.getElementById('bonus-life');
const newBonusEl = document.querySelector('newBonusEl');
const attackBtn = document.getElementById('attack-btn');
const strongAttackBtn = document.getElementById('strong-attack-btn');
const healBtn = document.getElementById('heal-btn');
const logBtn = document.getElementById('log-btn');

function adjustHealthBars(maxLife) {
  monsterHealthBar.max = maxLife;
  monsterHealthBar.value = maxLife;
  monsterHealthBar.innerText = maxLife;
  playerHealthBar.max = maxLife;
  playerHealthBar.value = maxLife;
  playerHealthBar.innerText = maxLife;
}
//Updates the Progress Bar UI on every attack
function dealMonsterDamage(damage) {
  const dealtDamage = Math.random() * damage;
  monsterHealthBar.value = +monsterHealthBar.value - dealtDamage;
  return dealtDamage;
}

function dealPlayerDamage(damage) {
  const dealtDamage = Math.random() * damage;
  playerHealthBar.value = +playerHealthBar.value - dealtDamage;
  return dealtDamage;
}

function increasePlayerHealth(healValue) {
  playerHealthBar.value = +playerHealthBar.value + healValue;
}

function resetGame(value) {
  playerHealthBar.value = value;
  monsterHealthBar.value = value;
}

function removeBonusLife() {
  bonusLifeEl.parentNode.removeChild(bonusLifeEl);
}

function addBonusLife() {
  newBonusEl.append.innerHTML('<span id="bonus-life">1</span>')
} 

function setPlayerHealth(health) {
  playerHealthBar.value = health;
}
