//deposit money
//how many lines
//collect a bet amount
//spin slot machine
//check if user won
//give the user their wins
//play again

const prompt = require("prompt-sync")();

const deposit = () => {
    while(true){
        const amount = prompt("How much would you like to deposit? $")
        numberDepositAmount = parseFloat(amount);
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log("Invalid amount! Try again.")
        } else {
            return numberDepositAmount;
        }
    }
}

console.log(deposit())