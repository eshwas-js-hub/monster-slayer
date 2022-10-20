//CONVENTION: HARDCODED(Not Dynamic) GLOBAL CONSTANT VARIABLES ARE WRITTEN AS CAPITAL LETTERS, THAT DO NOT CHANGE THROUGHOUT PROGRAM EXECUTION AND WHICH DO NOT REFERENCE ANY HTML TAGS. 
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_PLAYER_VALUE = 20;
const MODE_ATTACK = 'ATTACK'; //GLOBAL CONSTANTS AS STRNG IDENTIFIERS: Reduces the problem caused if any typo error is introduced manually while typing.
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'; 
const LOG_EVENT_OF_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_OF_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_OF_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_OF_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_OF_GAME_OVER = 'GAME_OVER';
// let chosenMaxLife = 150; // Take the Dynamic user imput later
let enteredNumber;
let chosenMaxLife;

// Array to store Battle Log
let battleLog = []; 
let lastLoggedEntry;

function writeToLog(event, value, monsterHealth, playerHealth){
    let logEntry = {
      event,
      value,
      monsterHealth,
      playerHealth
    };
  
    // if(event === LOG_EVENT_OF_PLAYER_ATTACK){
    //   logEntry.target = 'MONSTER';
    // } else if(event === LOG_EVENT_OF_PLAYER_STRONG_ATTACK){
    //   logEntry = {
    //     event,
    //     value,
    //     target: 'MONSTER',
    //     monsterHealth,
    //     playerHealth
    //   };
    // } else if(event === LOG_EVENT_OF_MONSTER_ATTACK){
    //   logEntry = {
    //     event,
    //     value,
    //     target: 'PLAYER',
    //     monsterHealth,
    //     playerHealth
    //   };
    // } else if(event === LOG_EVENT_OF_PLAYER_HEAL){
    //   logEntry = {
    //     event,
    //     value,
    //     target: 'PLAYER',
    //     monsterHealth,
    //     playerHealth
    //   };
    // } else if (event === LOG_EVENT_OF_GAME_OVER){  }

    switch(event){

      case LOG_EVENT_OF_PLAYER_ATTACK: 
        logEntry.target = 'MONSTER';
        break;
      case LOG_EVENT_OF_PLAYER_STRONG_ATTACK:
        logEntry = {
          event,
          value,
          target: 'MONSTER',
          monsterHealth,
          playerHealth
        };
        break;
      case LOG_EVENT_OF_MONSTER_ATTACK:
        logEntry = {
          event,
          value,
          target: 'PLAYER',
          monsterHealth,
          playerHealth
        };
        break;
      case LOG_EVENT_OF_PLAYER_HEAL:
        logEntry = {
          event,
          value,
          target: 'PLAYER',
          monsterHealth,
          playerHealth
        };
        break;
      case LOG_EVENT_OF_GAME_OVER:
           break;
      default:
        logEntry = {};
    }
    battleLog.push(logEntry);
}


function userInputValidate(){
  enteredNumber = prompt('Enter the Maximum Life ( Your Life and Monster Life ) To Start the Game: 100 For example');
  chosenMaxLife  = +enteredNumber

  if( isNaN(chosenMaxLife) || chosenMaxLife <= 0 ){
   
    throw {
      message: 'Invalid User Input: NaN or Less than Zero'
    }
  

  }

  return chosenMaxLife;
}

let enteredMaxLife;

    try{
      enteredMaxLife = userInputValidate()
    } catch (error){
      console.log(error)
      chosenMaxLife = 150;
      alert('You entered something wrong, and default value of 100 was used.')
    }

//   if( isNaN(enteredMaxLife) ){
//     alert('Enter non string value')
//     userInputValidate()
//   } else if (enteredMaxLife <= 0){
//     alert('Enter a positive Number')
//     userInputValidate()
//   }

let currentMonsterHealth = enteredMaxLife;
let currentPlayerHealth  = enteredMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife) //Adjust to set the progress bar property which include min value propery, value property and the innerText of HTML Code.    

function reset(){
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth  = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function attackThePlayer(){
  let initialPlayerHealth = currentPlayerHealth;
   //HIT THE PLAYER:  console.log(currentMonsterHealth)
   const playerDamaged = dealPlayerDamage(MONSTER_ATTACK_VALUE)
   currentPlayerHealth -= playerDamaged;

   writeToLog(LOG_EVENT_OF_MONSTER_ATTACK, playerDamaged, currentMonsterHealth, currentPlayerHealth)
    
   if (currentPlayerHealth <=0 && hasBonusLife){
     hasBonusLife = false;
     removeBonusLife();
     currentPlayerHealth = initialPlayerHealth;
     setPlayerHealth(initialPlayerHealth)
     alert('The bonus life just saved your life!')
   }

    // //Alternate Solution: Same solution using if and else-if conditional logic to display the alert messages.  
    // //Draw case
    // if(currentMonsterHealth <=0 && currentPlayerHealth <=0) {
    //   alert('you have a draw')
    // }//Win case
    // else if(currentMonsterHealth <= 0 ){  /*No need to specify the currentPlayerHealth > 0 condition as the DRAW case is specified first and executes only if both
    //                                           monster and player health is reduced to zero*/
    //   alert('You Won')  
    // }//Lose case
    // else if(currentPlayerHealth <= 0 ){ 
    //   alert('You lost') 
    // }
 

  //Win case
   if(currentMonsterHealth <= 0 && currentPlayerHealth > 0){  // The condition ( currentPlayerHealth > 0 ) is necessary to be included to execute the draw condition below
     alert('You Won')   // After a player wins the game the alert is displayed and keeps on alerting this same alert until the match is a draw.  
    //  reset()
    writeToLog(LOG_EVENT_OF_GAME_OVER, 'PLAYER_WON', currentMonsterHealth, currentPlayerHealth)
   }//Lose case
   else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0){ 
     alert('You lost') 
    //  reset()
    writeToLog(LOG_EVENT_OF_GAME_OVER, 'MONSTER_WON', currentMonsterHealth, currentPlayerHealth) 
   }//Draw case
   else if(currentMonsterHealth <=0 && currentPlayerHealth <=0) {
    alert('you have a draw')
    // reset()
    writeToLog(LOG_EVENT_OF_GAME_OVER, 'MATCH_DRAW', currentMonsterHealth, currentPlayerHealth)

  }

  if( currentPlayerHealth <=0 || currentMonsterHealth <=0 ){  //Conditional logic to reset the game after the game status is either a win || lose || draw
    reset();
  }
  
}

function attackTheMonster(mode){
  let maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;   //HOLDS DYNAMIC ATTACK VALUE ( THE TWO DYNAMIC ATTACK VALUES INCLUDE: "ATTACK" & "STRONG_ATTACK")
  let logEvent = mode === MODE_ATTACK ? LOG_EVENT_OF_PLAYER_ATTACK : LOG_EVENT_OF_PLAYER_STRONG_ATTACK;
    // if(mode === MODE_ATTACK){
    //   maxDamage = ATTACK_VALUE;  //ATTACK VALUE OF 10 is stored in maxDamage variable.  
    //   logEvent = LOG_EVENT_OF_PLAYER_ATTACK;
    // } else if ( mode === MODE_STRONG_ATTACK){
    //   maxDamage = STRONG_ATTACK_VALUE;  //ATTACK VALUE OF 17 is stored in maxDamage variable.
    //   logEvent = LOG_EVENT_OF_PLAYER_STRONG_ATTACK;
    // }


    //HIT THE MONSTER
    const monsterDamaged =  dealMonsterDamage(maxDamage) //updates the UI
    currentMonsterHealth -= monsterDamaged; //Updates the currentMonsterHealth global variable to be used for further operations and can be used locally only
    writeToLog(logEvent, monsterDamaged, currentMonsterHealth, currentPlayerHealth)
    attackThePlayer() 
}

function attackHandler(){
  // attackTheMonster('ATTCK') : TYPO ERROR WHILE TYPING THE ATTCK STRING, THAT IS PASSED AS A PARAMETER TO FUNCTION CALL
  attackTheMonster(MODE_ATTACK) //SOLVES THE PROBLEM OF TYPO ERROR WHILE USER TYPED THE ATTACK MODE MANUALLY 
}

function strongAttackHandler(){
  attackTheMonster(MODE_STRONG_ATTACK)  //SOLVED BY PROVIDING THE GLOBAL CONSTANT STRING IDENTIFIER AS THE PARAMETER TO FUNCTION CALL
}


function healBtnHandler(){  //After heal is pressed by user, the users (player) health is increased. and at the same time the player is attacked by the monster
                            // This results in healing but not upto all, because soon after healing the player is also attacked with certain value 
                            //That is calculated using [ healValue = chosenMaxLife - currentPlayerHealth; ] and is the dynamic healValue to be updated.

  let healValue; //Create a variable that changes the heal value dynamically.
  if( currentPlayerHealth >= chosenMaxLife - HEAL_PLAYER_VALUE){  //Restrict the player health, from healing if the health of the player has reached its max initial life. 
   // If chosenMaxLife entered by the user is 100, then currentPlayerHealth is also 100 at the beginning, minus the heal value 20, which results in currentPlayerhealth to be greater.
   //Because 100 > (100 - 20) =  100 > 80. An this results in execution of the alert. THis if will break after current player reaches below 80, leading to execute the else block.
    alert('Cannot heal more than max initial life') 
    healValue = chosenMaxLife - currentPlayerHealth; // The dynamic healValue is calculated by substracting the chosenMaxLife entered by user and currentPlayerHealth.
  } else {
    healValue = HEAL_PLAYER_VALUE; //The dynamic heal value is set to global heal value that has a value of 20 if the currentPlayer health reduces below 80, in this -
   // example context when maxChosenLife entered by user is 100.
  }

  increasePlayerHealth(healValue);  //updates the progress bar UI after heal button is pressed
  currentPlayerHealth += healValue; //Update the player health in backend logic such that the player health updates the currentPlayerHealth global variable.  
  //If the immediate above line is not added, soon after the heal button is pressed the player is also attacked back and the player looses. i.e., only the UI IS UPDATED.   
  writeToLog(LOG_EVENT_OF_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth)
  attackThePlayer() //The player is attacked back after every heal by some attack value implied.  
}

function logBtnHandler(){  //Logic: Log the last event that occured in the game and not all the log of the game at once after clicking the SHOW_LOG Button. 
 let i = 0 ; // i is a counter
 for ( const logEntry of battleLog){ // Iterate through all the objects present in the array. For Every outer for the inner loop will execute
   if( !lastLoggedEntry &&     //Usually lastLoggedEntry is undefined or falsy value but using negate operator i.e., !lastLoggedEntry negates and now it yields true.
       lastLoggedEntry !== 0 || // lastLoggedEntry is undefined or falsy and lastLoggedEntry !== 0 yields true. Because undefined or falsy is not equal to 0 and i.e. true.
       lastLoggedEntry < i) // After the first iteration the !lastLoggedEntry and  lastLoggedEntry !== 0 results false but we have an OR condition 
                            // The lastLoggedEntry < i results true because after the 1st iteration the lastLoggedEntry is set to 0 and 0<1 yields true and the below
                            // code is executed which results in execution of the nested or inner for loop again for the second iteration of the 1st for loop.
   {  
      // So, !lastLoggedEntry and lastLoggedEntry !== 0 yields true in the above condition and the below code is executed  
        console.log(`#${i}`)  //Prints #0 in first iteration #1 in second iteration and so on but for the outer loop
        //|||||||||//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////|||||||
        //||||||||| THE BELOW NESTED FOR LOOP GETS EXECUTED ONLY ONCE FOR EVERY ITERATION OF THE OUTER FOR LOOP                           ||||||
        //|||||||||//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////|||||||
            for( const key in logEntry){  // Iterate through all the keynames and values present in an object. Inner for loop executes for every single iteration 
                                          // of outer loop
                                          // And the outer loop is executed only after this inner for loop finishes its execution or when a break keyword is found.
              console.log(`${key} => ${logEntry[key]}`)
            }

        lastLoggedEntry = i;  //Set the log Entry to 0 and the below break exits the execution of this inner loop and exits
        console.log('####################################################')
        break; //This break limits to print a single event-log PLAYER_ATTACK.
        //Commenting the above break will not limit and log the two event-logs: PLAYER_ATTACK & MONSTER_ATTACK 
   }
    i++; //Increments the outer for-loop for every logEntry PRESRNT IN battleLog Array
    // break;
  }
}

attackBtn.addEventListener('click',attackHandler)
strongAttackBtn.addEventListener('click',strongAttackHandler)
healBtn.addEventListener('click',healBtnHandler)
logBtn.addEventListener('click',logBtnHandler)
